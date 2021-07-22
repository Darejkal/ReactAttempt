import { RouteProp } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"

export type NewHomeStackParamList = {
    Home:undefined;
    FocusedPost:PostProps;
}
type PostProps ={
    heading:string,
    detail:string,
    children?:React.ReactNode
}
export type HomeStackNavProps<T extends keyof NewHomeStackParamList>={
    navigation: StackNavigationProp<NewHomeStackParamList, T>;
    route: RouteProp<NewHomeStackParamList, T>;
}
export type NewAppParamList={
    Home:undefined;
    Menu:undefined;
}
export type NewAppNavProps<T extends keyof NewAppParamList>={
    navigation: StackNavigationProp<NewAppParamList, T>;
    route: RouteProp<NewAppParamList, T>;
}
export type SettingStackParamList={
    Menu:undefined;
    Wheel:undefined;
    Map:undefined;
    Settings:undefined;
}
export type SettingStackNavProps<T extends keyof SettingStackParamList>={
    navigation: StackNavigationProp<SettingStackParamList, T>;
    route: RouteProp<SettingStackParamList, T>;
}