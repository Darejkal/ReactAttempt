import React, { useState, useContext, useRef } from 'react'
import { View, TouchableOpacity, Text, StatusBar, TextInput, Alert } from 'react-native';
import { NewAuthContext } from './NewAuthProvider';
import { createTwoButtonAlert } from '../Alerts';

interface NewLoginFormProps {
    showLoading: (load: boolean) => void
}

export const NewLoginForm: React.FC<NewLoginFormProps> = ({ showLoading }) => {
    const [schoolText, setSchoolText] = useState("TPC");
    const [classIDText, setClassIDText] = useState("");
    const passwordInput = useRef(null);
    const { login, data } = useContext(NewAuthContext);
    return (
        <View style={{}}>
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
            <TouchableOpacity style={{
                backgroundColor: "#515151",
                paddingVertical: 20,
            }}
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
                }}>
                <Text style={{
                    color: "#B1B1B1",
                    textAlign: "center",
                    fontWeight: "bold",
                }}>
                    {"Login"}
                </Text>
            </TouchableOpacity>
        </View>
    );
}
type NewUserData =null|{
    classID: string,
    school:string,
}

