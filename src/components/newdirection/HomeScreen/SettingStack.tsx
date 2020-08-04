import React, { useContext } from 'react'
import {  } from '@react-navigation/bottom-tabs';
import { SettingStackParamList, SettingStackNavProps } from './NewHomeParamList';
import { createStackNavigator } from '@react-navigation/stack';
import { Center } from '../../Center';
import { Text, Button } from 'react-native';
import { NewAuthContext } from '../NewAuthProvider';
import WheelPage from './WheelPage'
type SettingStackProps = { }
const Stacks = createStackNavigator<SettingStackParamList>();
export const SettingStack: React.FC<SettingStackProps> = ({ }) => {
    return (
        <Stacks.Navigator>
            <Stacks.Screen name="Menu" component={Menu} options={{}}/>
            <Stacks.Screen name="Wheel" component={Wheel}/>
        </Stacks.Navigator>
    )
};
function Menu ({navigation,route}:SettingStackNavProps<"Menu">){
    const { logout } = useContext(NewAuthContext);
    return (
        <Center>
        <Text>Setting</Text>
        <Button
                title="Logout"
                onPress={() => logout()}
            />
        <Button
            title="Wheel of Fortune"
            onPress={() => navigation.navigate("Wheel")}
        />
        </Center>
    )
}
function Wheel ({navigation,route}:SettingStackNavProps<"Wheel">){
    return (
        <WheelPage navigation={navigation}/>
    )
}

export default SettingStack;