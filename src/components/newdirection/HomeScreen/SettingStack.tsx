import React, { useContext } from 'react'
import { SettingStackParamList, SettingStackNavProps } from './NewHomeParamList';
import { createStackNavigator } from '@react-navigation/stack';
import { Center } from '../../Center';
import { Text, Button, View, Dimensions,Image,StyleSheet } from 'react-native';
import { NewAuthContext } from '../NewAuthProvider';
import WheelPage from './WheelPage'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';

const screenWidth = Dimensions.get('window').width
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
    const { logout,data } = useContext(NewAuthContext);
    return (
        <View
            style={{flex:1,padding:10}}>
            <Center>
                <Image
                    style={{
                        width: 100,
                        height: 100,
                    }}
                    source={require("../../../images/logo.png")}
                />
                <Text style={{fontWeight:"bold",fontSize:20}}>Logged in as:</Text>
                <Text>Class:{data!.classID}</Text>
                <Text>School: tpc</Text>
            </Center>
        <TouchableOpacity
            style={styles.TouchableOpacity}
            onPress={() => navigation.navigate("Wheel")}
        >
            <Center >
            <Text style={{}}>Wheel of fortune</Text>
            </Center>
        </TouchableOpacity>
        <TouchableOpacity
                style={styles.TouchableOpacity}
                onPress={() => logout()}>
                <Center>
                    <Text>Logout</Text>
                </Center>
        </TouchableOpacity>
        </View>
    )
}
function Wheel ({navigation,route}:SettingStackNavProps<"Wheel">){
    return (
        <WheelPage navigation={navigation}/>
    )
}
const styles = StyleSheet.create({
    TouchableOpacity:{
        borderTopWidth:0.25,
                    borderBottomWidth:0.25,
                    borderColor:"#95a5a6",
                    width:screenWidth-20,
                    height:50,
                    backgroundColor:"#bdc3c7",
                    marginTop:5
    }
})

export default SettingStack;