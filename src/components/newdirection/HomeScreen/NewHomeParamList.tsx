import { RouteProp } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"

export type NewHomeStackParamList = {
    Home:undefined;
    Setting:undefined;
}
export type HomeStackNavProps<T extends keyof NewHomeStackParamList>={
    navigation: StackNavigationProp<NewHomeStackParamList, T>;
    route: RouteProp<NewHomeStackParamList, T>;
}
export type NewAppParamList={
    Home:undefined;
    Setting:undefined;
}
export type SettingStackParamList={
    Menu:undefined;
    Wheel:undefined;
}
export type SettingStackNavProps<T extends keyof SettingStackParamList>={
    navigation: StackNavigationProp<SettingStackParamList, T>;
    route: RouteProp<SettingStackParamList, T>;
}