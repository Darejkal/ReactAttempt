import React, { useContext, ReactNode } from 'react'
import { SettingStackParamList, SettingStackNavProps } from './NewHomeParamList';
import { createStackNavigator } from '@react-navigation/stack';
import { Center } from '../../Center';
import { Text, Button, View, Dimensions, Image, StyleSheet, GestureResponderEvent } from 'react-native';
import { NewAuthContext } from '../NewAuthProvider';
import WheelPage from './WheelPage'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { newNotification } from '../Notification/Notification';
import { MaterialCommunityIcons,Entypo } from "@expo/vector-icons";
import { SettingTouchView } from '../../Accessibility';
type SettingStackProps = {}
const Stacks = createStackNavigator<SettingStackParamList>();
export const SettingStack: React.FC<SettingStackProps> = ({ }) => {
    return (
        <Stacks.Navigator>
            <Stacks.Screen name="Menu" component={Menu} options={{}} />
            <Stacks.Screen name="Wheel" component={Wheel} />
        </Stacks.Navigator>
    )
};
function Menu({ navigation, route }: SettingStackNavProps<"Menu">) {
    const { logout, data } = useContext(NewAuthContext);
    return (
        <View
            style={{ flex: 1, padding: 10 }}>
            <Center>
                <Image
                    style={{
                        width: 100,
                        height: 100,
                    }}
                    source={require("../../../images/logo.png")}
                />
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>Logged in as:</Text>
                <Text>Class:{data!.classID}</Text>
                <Text>School: tpc</Text>
            </Center>
            <SettingTouchView 
                onPress={()=>navigation.navigate("Wheel")} 
                title="Wheel Of Fortune"
                icon={<MaterialCommunityIcons name="ferris-wheel" size={20} color="black" />}/>
            <SettingTouchView 
                onPress={()=>logout()} 
                title="Logout"
                icon={<MaterialCommunityIcons name="logout-variant" size={20} color="black" />}/>
            <SettingTouchView 
                onPress={()=>{
                    console.log("Notification executed")
                    newNotification("Notification 📬", "this is a subtitle", "this is the body", 3000)
                    console.log("Notification ended")
                }} 
                title="Notification Test"
                icon={<Entypo name="notification" size={20} color="black" />}/>
        </View>
    )
}
function Wheel({ navigation, route }: SettingStackNavProps<"Wheel">) {
    return (
        <WheelPage navigation={navigation} />
    )
}


export default SettingStack;