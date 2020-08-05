import React, { useState } from 'react'
import AsyncStorage from '@react-native-community/async-storage';
import { TIMETABLE_KEY, UNITED_NEWS_KEY, NEW_DATA_KEY } from '../KEYS';
import { TimetableData } from './HomeScreen/Timetable2';
type NewAuthProviderProps = { }
type NewUserData =null|{
    classID: string,
    school:string,
}
export const NewAuthContext = React.createContext<
    {
        data:TimetableData|null
        setData:(data:TimetableData|null) => void;
        login: (data:NewUserData) => Promise<string>;
        logout: () => void;
    }>({
        data: null,
        setData: (data:TimetableData|null) => { },
        login: (data:NewUserData) => {return new Promise<string>(()=>{}) },
        logout: () => { },
    });

async function getTimetableData(classID:string):Promise<TimetableData|null>{
        try{
        const response = await fetch(
            "https://schoolproject213.herokuapp.com/data/findTimetable/"+classID
          );
       //   console.log("HEY, async!!!!");
        if (response.ok) {
          console.log("respone ok")
          // console.log(response)
          const body = await response.json();
          console.log("JSON: body  "+body)
          return body
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
      

export const NewAuthProvider: React.FC<NewAuthProviderProps> = ({children}) => {
    const [data,setData]=useState<TimetableData|null>(null);
    return (
        <NewAuthContext.Provider
        value={{
            data,
            setData,
            login: async (props)=>{
                const temp = await getTimetableData(props!.classID)
                console.log("pip:"+temp)
                return new Promise((resolve,reject)=>{
                    if(temp){
                        console.log("NOOO")
                        setData(temp)
                        AsyncStorage.setItem(TIMETABLE_KEY,JSON.stringify(temp))
                        resolve("Success")
                    }
                    else reject("There is no matched school or class")
                })
            },
            logout:async()=>{
                setData(null);
                AsyncStorage.removeItem(TIMETABLE_KEY);
                AsyncStorage.removeItem(UNITED_NEWS_KEY)
                AsyncStorage.removeItem(NEW_DATA_KEY)
            }
        }}
        >
            {children}
        </NewAuthContext.Provider>
    )
};

export default NewAuthProvider;