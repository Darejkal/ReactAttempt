import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TIMETABLE_KEY, NEW_DATA_KEY, NEWSFEED_KEY, USER_HANDLER_URL, USER_KEY } from '../KEYS';
import { TimetableData } from './HomeScreen/Timetable2';
import I18n from 'i18n-js';
import { CODE } from './Accessibility/ErrorHandlingParams';
import { createTwoButtonAlert } from '../Alerts';
type NewAuthProviderProps = { }
export type NewUserData =null|{
    classID: string,
    schoolID:string,
    username:string,
    userID:string
}
export type PreUserData ={
    classID: string,
    schoolID:string,
    userID:string,
    password:string
}
export const NewAuthContext = React.createContext<
    {
        data:TimetableData|null,
        userData:NewUserData,
        setData:(data:TimetableData|null) => void;
        setUserData:(data:NewUserData) => void;
        login: (data:PreUserData) => Promise<string>;
        logout: () => void;
    }>({
        data: null,
        userData:null,
        setData: (data:TimetableData|null) => { },
        setUserData:(data:NewUserData) => {},
        login: (data:PreUserData) => {return new Promise<string>(()=>{}) },
        logout: () => { },
    });

async function getTimetableData(classID:string):Promise<TimetableData|null>{
        try{
        const response = await fetch(
            "https://y2lnrwnc98.execute-api.ap-southeast-1.amazonaws.com/TestStage1/access/info/"+classID+"/timetable"
          );
       //   console.log("HEY, async!!!!");
        if (response.ok) {
        //   console.log("respone ok")
          console.log(JSON.stringify(response))
          const body = await response.json();
          console.log(body)
        //   console.log("Throwing error...")
        //   throw new Error('error');
          if(body==={})throw new Error(response.statusText);
          console.log("JSON: body  "+body)
          return body.Item
          } else {
              console.log("error??")
              throw new Error(response.statusText);
          }
      
        } catch (e){
          //   console.error(e);
            console.log("error console logged!")
            return null
        } 
}

async function getUserValidationAndUsername(userData:PreUserData):Promise<string|null> {
    console.log("POST CALLED--------------------------------------");
    return fetch(USER_HANDLER_URL,
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': "application/json"
            },
            body: JSON.stringify(
                {
                    method: "login",
                    obj: userData
                }
            )
        }).then(
           async (response)=>{
            if (response.ok) {
                let preanswer = await response.json()
                let answer;
                if (typeof preanswer.body === "string")
                    answer = await JSON.parse(preanswer.body);
                else {
                    answer = await preanswer.body;
                }
                console.log("------------- " + JSON.stringify(answer));
                switch (answer?.internalStatus) {
                    case CODE.SUCCESS:
                        console.log("--------------- success")
                        return answer.obj?.username;
                    case CODE.NOT_EXISTED:
                        throw I18n.t("UserDoesNotExit");
                    case CODE.FAILED:
                        throw I18n.t("UnknowError");
                    default:
                        throw I18n.t("PostingDataToServerError");
                }
    } 
    else throw I18n.t("PostingDataToServerError");
    }
    ).catch((e) => {
            createTwoButtonAlert(e, I18n.t("error"));
            return null;
    });
}
export const NewAuthProvider: React.FC<NewAuthProviderProps> = ({children}) => {
    const [data,setData]=useState<TimetableData|null>(null);
    const [userData,setUserData]=useState<NewUserData>(null);
    return (
        <NewAuthContext.Provider
        value={{
            data,
            userData,
            setData,
            setUserData,
            login: async (props)=>{
                return getUserValidationAndUsername(props).then(async (data)=>{
                    if(!data) 
                        return new Promise((resolve,reject)=>{reject(I18n.t("authLoginError"))})
                    let userObj ={
                        classID: props.classID,
                        schoolID:props.schoolID,
                        userID:props.userID,
                        username:data
                    }
                    setUserData(userObj)
                    AsyncStorage.setItem(USER_KEY,JSON.stringify(userObj))
                    const temp = await getTimetableData(props!.classID)
                    console.log("pip:"+temp)
                    return new Promise((resolve,reject)=>{
                        if(temp){
                            console.log("NOOO")
                            setData(temp)
                            AsyncStorage.setItem(TIMETABLE_KEY,JSON.stringify(temp))
                            resolve("Success")
                        }
                        else reject(I18n.t("authLoginError"))
                    })
                }
                )

            },
            logout:async()=>{
                setData(null);
                setUserData(null);
                AsyncStorage.removeItem(TIMETABLE_KEY);
                AsyncStorage.removeItem(NEWSFEED_KEY)
                AsyncStorage.removeItem(NEW_DATA_KEY)
            }
        }}
        >
            {children}
        </NewAuthContext.Provider>
    )
};

export default NewAuthProvider;