import React, { useState, useContext, useRef } from 'react'
import { View, TouchableOpacity, Text, StatusBar, TextInput, Alert } from 'react-native';
import { NewAuthContext } from './NewAuthProvider';
import { createTwoButtonAlert } from '../Alerts';
import { SettingTouchView } from '../Accessibility';
import { MaterialCommunityIcons,Entypo } from "@expo/vector-icons";
interface NewLoginFormProps {
    showLoading: (load: boolean) => void
}

export const NewLoginForm: React.FC<NewLoginFormProps> = ({ showLoading }) => {
    const [schoolText, setSchoolText] = useState("TPC");
    const [classIDText, setClassIDText] = useState("");
    const passwordInput = useRef(null);
    const { login, data } = useContext(NewAuthContext);
    return (
        <View style={{margin:20}}>
            <StatusBar barStyle="light-content" />
            <TextInput
                keyboardType="default"
                // @ts-ignore
                onSubmitEditing={() => passwordInput.current?.focus()}
                //WARNINGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
                editable={false}
                //WARNINGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
                returnKeyType="go"
                placeholder="School"
                value={schoolText}
                onChangeText={text => setSchoolText(text)}
                placeholderTextColor="#bdc3c7"
                selectionColor='#2c3e50'
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
                ref={passwordInput}
                returnKeyType="done"
                placeholder="ClassID"
                value={classIDText}
                onChangeText={text => setClassIDText(text)}
                placeholderTextColor="#bdc3c7"
                selectionColor='#2c3e50'
                style={{
                    height: 40,
                    borderBottomWidth: 1,
                    paddingLeft: 6,
                    color: "#3498db",
                    marginTop: 10,
                    marginBottom: 10,
                }}
            />
            <SettingTouchView
                title="Login"
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
                    fontWeight:"bold"
                }}
                icon={<Entypo name="login" size={20} color="black" />}
                onPress={async () => {
                    //Validate Data:
                    if (!schoolText) createTwoButtonAlert("School cannot be empty", "Incorrect input")
                    else if (!classIDText) createTwoButtonAlert("ClassID cannot be empty", "Incorrect input")
                    else {
                        showLoading(true);
                        const temp: NewUserData = {
                            school: schoolText.toLowerCase(),
                            classID: classIDText
                        }
                        console.log(temp.classID + " : " + temp.school)
                        login(temp)
                            .then(() => {
                                console.log("True at form?")
                                showLoading(false);
                            })
                            .catch(
                                (error: string) => {
                                    console.log("Error at form?")
                                    showLoading(false);
                                    createTwoButtonAlert(error, "Error");
                                }
                            )
                    }
                }}/>
        </View>
    );
}
type NewUserData =null|{
    classID: string,
    school:string,
}

