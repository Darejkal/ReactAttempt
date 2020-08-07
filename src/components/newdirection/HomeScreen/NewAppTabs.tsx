import React, { useContext, useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Text, Button } from 'react-native';
import { Center } from '../../Center';
import { NewAuthContext } from '../NewAuthProvider';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { AntDesign } from "@expo/vector-icons";
import { NewAppParamList, NewAppNavProps } from './NewHomeParamList';
import { HomeStack } from './HomeStack';
import SettingStack from './SettingStack';
import I18n from 'i18n-js';

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
          }
          return <AntDesign name={iconName} size={20} color={color}/>;
        },
        title:I18n.t(route.name),
      })}
      tabBarOptions={{
        tabStyle:{flexDirection:"row"},
        showIcon:true,
        iconStyle:{},
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
        labelStyle:{textTransform:"capitalize"},
      }}
    >
      <Tabs.Screen name="Home" component={Home}/>
      <Tabs.Screen name="Menu" component={Menu}/>
    </Tabs.Navigator>);
}
function Home ({navigation,route}:NewAppNavProps<"Home">){
  return <HomeStack/>
}
function Menu ({navigation,route}:NewAppNavProps<"Menu">){
  return <SettingStack/>
}