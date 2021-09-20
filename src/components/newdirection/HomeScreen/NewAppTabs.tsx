import React, { useContext, useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Text, Button, View } from 'react-native';
import { Center } from '../../Center';
import { NewAuthContext } from '../NewAuthProvider';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { AntDesign } from "@expo/vector-icons";
import { NewAppParamList, NewAppNavProps } from './NewHomeParamList';
import { HomeStack } from './HomeStack';
import SettingStack from './SettingStack';
import I18n from 'i18n-js';
import QRStack from './QRStack';
// import { SafeAreaProvider } from 'react-native-safe-area-context';

interface AppTabsProps {

}
const Tabs = createMaterialTopTabNavigator<NewAppParamList>();
// function Setting({navigation}){
//     return (
//       <SettingStack/>
//     );
// }
// upperCaseLabel: false
export const NewAppTabs: React.FC<AppTabsProps> = ({ }) => {
  return (
    <Tabs.Navigator
    tabBarPosition="bottom"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home'
          } else if (route.name === 'Menu') {
            iconName = 'user'
          } else if(route.name === 'QR') iconName="qrcode"
          return <AntDesign name={iconName} style={{ textAlign: 'center' }} size={20} color={color}/>;
        },
        title:I18n.t(route.name),
      })}
      swipeEnabled={false}
      tabBarOptions={{
        tabStyle:{flexDirection:"row"},
        showIcon:true,
        showLabel:true,
        iconStyle:{},
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
        labelStyle:{textTransform:"capitalize"},
        indicatorStyle:{
          backgroundColor:"transparent"
        },
        style:{
          position:"absolute",
          left:10,
          right:10,
          bottom:10,
          borderRadius:5,
          padding:4,
        }
      }}
    >
      <Tabs.Screen name="Home" component={Home}/>
      <Tabs.Screen name="Menu" component={Menu}/>
      <Tabs.Screen name="QR" component={QR}/>
    </Tabs.Navigator>);
}
function Home ({navigation,route}:NewAppNavProps<"Home">){
  return <HomeStack/>
}
function Menu ({navigation,route}:NewAppNavProps<"Menu">){
  return <SettingStack/>
}
function QR ({navigation,route}:NewAppNavProps<"QR">){
  return <QRStack navigation={navigation}/>
}