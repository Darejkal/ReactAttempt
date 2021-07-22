import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NewHomeStackParamList, HomeStackNavProps } from './NewHomeParamList';
//import { Timetable1 } from './Timetable1';
import HomeView from "./HomeView"
import I18n from 'i18n-js';
import Post from './Post';
interface HomeStackProps {

}
const Stack = createStackNavigator<NewHomeStackParamList>();
function Home({ navigation, route }: HomeStackNavProps<"Home">) {
    return (

        <HomeView navigation={navigation}/>
    )
}
function FocusedPost({ navigation, route }: HomeStackNavProps<"Home">) {
    return (

        <Post/>
    )
}
export const HomeStack: React.FC<HomeStackProps> = ({ }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{headerTitle:I18n.t("Home")}} name="Home" component={Home}/>
            <Stack.Screen options={{headerTitle:I18n.t("FocusedPost")}} name="FocusedPost" component={FocusedPost} />
        </Stack.Navigator>
    );
}