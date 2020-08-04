import { Alert } from "react-native";

export const createTwoButtonAlert = (title: string, msg: string) =>
    Alert.alert(
        msg,
        title,
        [
            { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
    );