import React, { useContext } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import{Text, Button} from 'react-native';
import { Center } from '../../Center';
import { NewAuthContext } from '../NewAuthProvider';
import {AntDesign} from "@expo/vector-icons";
import { NewAppParamList } from './NewHomeParamList';
import { HomeStack } from './HomeStack';
import SettingStack from './SettingStack';

interface AppTabsProps {

}
const Tabs = createBottomTabNavigator<NewAppParamList>();
function Setting({navigation}){
    return (
      <SettingStack/>
    );
}
export const NewAppTabs: React.FC<AppTabsProps> = ({}) => {
        return (<Tabs.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
      
                  if (route.name === 'Home') {
                    iconName = 'home'
                  } else if (route.name === 'Setting') {
                    iconName = 'user'
                  }
                  return <AntDesign name={iconName} size={size} color={color}/>;
                  // You can return any component that you like here!
                },
              })}
              tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
              }}
        >
            <Tabs.Screen name="Home" component={HomeStack}/>
            <Tabs.Screen name="Setting" component={Setting}/>
        </Tabs.Navigator>);
}