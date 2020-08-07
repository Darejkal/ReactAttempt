import { Alert } from "react-native";
import I18n from "i18n-js";

export const createTwoButtonAlert = (title: string, msg: string,onOK?:()=>void) =>
    Alert.alert(
        msg,
        title,
        [
            { text: `${I18n.t("ok")}`, 
            onPress: onOK }
        ],
        { cancelable: false }
    );