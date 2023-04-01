import React from 'react'
import { TouchableOpacity, Dimensions, View, Text, GestureResponderEvent, StyleProp, ViewStyle, TextStyle, Switch } from "react-native"
const screenWidth = Dimensions.get('window').width
export const SettingTouchView: React.FC<SettingTouchViewProps> = ({ onPress, title, icon, style, textStyle }) => {
    return (
        <TouchableOpacity
            style={[{
                height: 50,
                backgroundColor: "#bdc3c7",
                marginTop: 5,
                paddingRight: 35,
                paddingLeft: 35,
                borderColor: "#95a5a6",
                borderRadius: 5,
                borderWidth: 0.25
            }, style]}
            onPress={onPress}>
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
            }}>
                <Text style={[icon?{ marginRight: "auto" }:undefined, textStyle]} >{title}</Text>
                {icon}
            </View>
        </TouchableOpacity>
    )
}
type SettingTouchViewProps = {
    onPress: (event: GestureResponderEvent) => void,
    title: string,
    icon?: React.ReactNode
    style?: StyleProp<ViewStyle>
    textStyle?: StyleProp<TextStyle>
}
export const SettingSwitchView: React.FC<SettingOptionViewProps> = ({ title, icon, style, textStyle,switchStyle,onValueChange,value }) => {
    return (
        <View
            style={[{
                height: 50,
                backgroundColor: "transparent",
                paddingRight: 35,
                paddingLeft: 35,
                marginTop: 5,
                borderColor: "#95a5a6",
                borderBottomWidth: 0.25,
                flexDirection: "row",
                alignItems: "center",
            }, style]}>
            <Text style={[{marginRight:10}, textStyle]} >{title}</Text>
                {icon}
            <Switch
                style={[{ marginLeft:"auto" },switchStyle]}
                trackColor={{ false: "#7f8c8d", true: "#6edc5f" }}
                thumbColor={"#fff"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={onValueChange}
                value={value}
            />
        </View>
    )
}
type SettingOptionViewProps = {
    title: string
    icon: React.ReactNode
    style?: StyleProp<ViewStyle>
    switchStyle?: StyleProp<ViewStyle>
    textStyle?: StyleProp<TextStyle>
    onValueChange?: ((value: boolean) => void) | undefined
    value?: boolean | undefined
}
export const CustomizedSwitch: React.FC<CustomizedSwitchProps> = ({ ...rest }) => {
    return (
        <Switch
            style={{ position: 'relative', right: 5 }}
            trackColor={{ false: "#7f8c8d", true: "#6edc5f" }}
            thumbColor={"#fff"}
            ios_backgroundColor="#3e3e3e"
            {...rest}
        />
    )
}
type CustomizedSwitchProps = {

}