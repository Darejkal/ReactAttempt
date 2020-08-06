import React from 'react'
import { TouchableOpacity, Dimensions, View, Text, GestureResponderEvent, StyleProp, ViewStyle, TextStyle } from "react-native"
const screenWidth = Dimensions.get('window').width
export const SettingTouchView: React.FC<SettingTouchViewProps> = ({ onPress,title,icon,style,textStyle }) => {
    return (
        <TouchableOpacity
            style={style?style:{
                    width: screenWidth - 20,
                    height: 50,
                    backgroundColor: "#bdc3c7",
                    marginTop: 5,
                    paddingRight: 35,
                    paddingLeft: 35,
                    borderColor: "#95a5a6",
                    borderRadius: 5,
                    borderWidth: 0.25
            }}
            onPress={onPress}>
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
            }}>
                <Text style={[textStyle,{marginRight: "auto"}]} >{title}</Text>
                {icon}
            </View>
        </TouchableOpacity>
    )
}
type SettingTouchViewProps ={
    onPress:(event: GestureResponderEvent) => void,
    title:string,
    icon:React.ReactNode
    style?:StyleProp<ViewStyle>
    textStyle?:StyleProp<TextStyle>
}