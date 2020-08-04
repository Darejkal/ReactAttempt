import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NewHomeStackParamList, HomeStackNavProps } from './NewHomeParamList';
//import { Timetable1 } from './Timetable1';
import HomeView from "./HomeView"
interface HomeStackProps {

}
const Stack = createStackNavigator<NewHomeStackParamList>();
function Home({ navigation, route }: HomeStackNavProps<"Home">) {
    return (

        <HomeView/>
    )
}
export const HomeStack: React.FC<HomeStackProps> = ({ }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{}} name="Home" component={Home} />
        </Stack.Navigator>
    );
}