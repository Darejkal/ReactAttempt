import React, { useState, useContext, useRef } from 'react'
import { View, TouchableOpacity, Text, StatusBar, TextInput, Alert } from 'react-native';
import { NewAuthContext, NewUserData, PreUserData } from './NewAuthProvider';
import { createTwoButtonAlert } from '../Alerts';
import { SettingTouchView } from '../Accessibility';
import { MaterialCommunityIcons,Entypo } from "@expo/vector-icons";
import I18n from 'i18n-js';
interface NewLoginFormProps {
    showLoading: (load: boolean) => void
}

export const NewLoginForm: React.FC<NewLoginFormProps> = ({ showLoading }) => {
    const [schoolText, setSchoolText] = useState("");
    const [classIDText, setClassIDText] = useState("");
    const [userIDText, setUserIDText] = useState("");
    const [passwordInputText, setPasswordInputText] = useState("");
    const classInput:any = useRef(null);
    const userIDInput:any = useRef(null);
    const passwordInput:any = useRef(null);
    const { login, data } = useContext(NewAuthContext);
    return (
        <View style={{margin:20}}>
            <StatusBar barStyle="light-content" />
            <TextInput
                keyboardType="default"
                // @ts-ignore
                onSubmitEditing={() => classInput.current?.focus()}
                //WARNINGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
                // editable={false}
                //WARNINGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
                returnKeyType="go"
                placeholder={I18n.t("school")}
                value={schoolText}
                onChangeText={text => setSchoolText(text)}
                placeholderTextColor="#bdc3c7"
                style={{
                    height: 40,
                    borderBottomWidth: 1,
                    paddingLeft: 6,
                    color: "#3498db",
                    marginTop: 10,
                    marginBottom: 10,
                }}
            />
            <TextInput
                ref={classInput}
                onSubmitEditing={() => userIDInput.current?.focus()}
                returnKeyType="done"
                placeholder="ClassID [YY][YY][CLASS_ABBREVIATION]"
                value={classIDText}
                onChangeText={text => setClassIDText(text)}
                placeholderTextColor="#bdc3c7"
                style={{
                    height: 40,
                    borderBottomWidth: 1,
                    paddingLeft: 6,
                    color: "black",
                    marginTop: 10,
                    marginBottom: 10,
                }}
            />
            <TextInput
                ref={userIDInput}
                onSubmitEditing={() => passwordInput.current?.focus()}
                returnKeyType="done"
                placeholder="UserID"
                value={userIDText}
                onChangeText={setUserIDText}
                placeholderTextColor="#bdc3c7"
                style={{
                    height: 40,
                    borderBottomWidth: 1,
                    paddingLeft: 6,
                    color: "black",
                    marginTop: 10,
                    marginBottom: 10,
                }}
            />
            <TextInput
                ref={passwordInput}
                returnKeyType="done"
                placeholder="Password"
                secureTextEntry={true}
                value={passwordInputText}
                onChangeText={text => setPasswordInputText(text)}
                placeholderTextColor="#bdc3c7"
                style={{
                    height: 40,
                    borderBottomWidth: 1,
                    paddingLeft: 6,
                    color: "black",
                    marginTop: 10,
                    marginBottom: 10,
                }}
            />
            <SettingTouchView
                title={I18n.t("login")}
                style={{
                    height: 50,
                    backgroundColor: "#bdc3c7",
                    marginTop: 5,
                    paddingRight: 35,
                    paddingLeft: 35,
                    borderColor: "#95a5a6",
                    borderRadius: 5,
                    borderWidth: 0.25,
                }}
                textStyle={{
                    marginRight:10
                }}
                icon={<Entypo name="login" size={20} color="black" />}
                onPress={async () => {
                    //Validate Data:
                    if (!schoolText) createTwoButtonAlert(I18n.t("lFSchoolEmpty"), I18n.t("lFIncorrectInput"))
                    else if (!classIDText) createTwoButtonAlert(I18n.t("lFClassEmpty"), I18n.t("lFIncorrectInput"))
                    else {
                        showLoading(true);
                        const temp: PreUserData = {
                            schoolID: schoolText.toLowerCase(),
                            classID: classIDText.toUpperCase(),
                            userID: userIDText.toLowerCase(),
                            password:passwordInputText
                        }
                        console.log(temp.classID + " : " + temp.schoolID)
                        login(temp)
                            .then(() => {
                                console.log("True at form?")
                                showLoading(false);
                            })
                            .catch(
                                (error: string) => {
                                    console.log("Error at form?")
                                    showLoading(false);
                                    createTwoButtonAlert(error, I18n.t(error));
                                }
                            )
                    }
                }}/>
        </View>
    );
}


