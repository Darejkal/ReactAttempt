import React, { useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NewHomeStackParamList, HomeStackNavProps } from './NewHomeParamList';
//import { Timetable1 } from './Timetable1';
import HomeView from "./HomeView"
import I18n from 'i18n-js';
import Post from './Post';
import { View ,Text} from 'react-native';
import StyledTextInput from '../Accessibility/StyledTextInput';
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
        <Post navigation={navigation}/>
    )
}
// function NewsPostingPage({ navigation, route }: HomeStackNavProps<"Home">) {
//     const [valText, setValText] = useState("");
//     const [editability, setEditability] = useState(true);
//     return (
//         <View>  
//             <StyledTextInput
//             style={{padding:10,height:100,textAlignVertical: 'top'}}
//             backgroundColor={"transparent"}
//             multiline={true}
//             minheight={20}
//             placeholder={I18n.t("TypeSomething")}
//             editable={editability}
//             value={valText}
//             onChangeText={value=>{setValText(value)}}
//             />
//         </View>
//     )
// }
export const HomeStack: React.FC<HomeStackProps> = ({ }) => {

    return (
        <Stack.Navigator>
            <Stack.Screen options={{headerTitle:I18n.t("Home")}} name="Home" component={Home}/>
            <Stack.Screen options={{headerTitle:I18n.t("FocusedPost")}} name="FocusedPost" component={FocusedPost} />
        </Stack.Navigator>
    );
}