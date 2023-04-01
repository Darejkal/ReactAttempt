import React from 'react'
import { KeyboardAvoidingView, View, Image, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {NewLoginForm} from './NewLoginForm'
interface NewLoginProps {
    showLoading:(load:boolean)=>void;
}

export const NewLogin: React.FC<NewLoginProps> = ({showLoading }) => {
    return (
        <ScrollView>
            <View style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop:100
            }}>
                <Image
                    style={{
                        width: 100,
                        height: 100,
                    }}
                    source={require("../../images/logo.png")}
                />
                <Text style={{
                    color: "#626262",
                    marginTop: 10,
                    width: 130,
                    textAlign: "center",
                    opacity: 0.9,
                }}>An app made for Duck</Text>
            </View>
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1, flexDirection: 'column',justifyContent: 'center',}} enabled >
            <View style={{ justifyContent: "center", }}>
                <NewLoginForm showLoading={(load:boolean)=>showLoading(load)} />
            </View>
        </KeyboardAvoidingView>
        </ScrollView>
    );
}