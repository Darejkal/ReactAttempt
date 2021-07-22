import React, { useContext, ReactNode, useState, useRef } from 'react'
import { SettingStackParamList, SettingStackNavProps } from './NewHomeParamList';
import { createStackNavigator, StackHeaderProps, HeaderBackButton } from '@react-navigation/stack';
import { Center } from '../../Center';
import MapView, { Marker } from 'react-native-maps';
import { Text, Button, View, Dimensions, Image, StyleSheet, GestureResponderEvent, Platform, Alert } from 'react-native';
import { NewAuthContext } from '../NewAuthProvider';
import WheelPage from './WheelPage'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { newNotification } from '../Notification/Notification';
import { MaterialCommunityIcons, Entypo, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { SettingTouchView, SettingSwitchView } from '../../Accessibility';
import { preferencesGetState, preferenceChangeColorfulState, saveSettings, preferenceChangeForcedLanguageState, preferenceSetLanguageState } from '../../Preferences';
import { useFocusEffect } from '@react-navigation/native';
import { createTwoButtonAlert } from '../../Alerts';
import I18n from 'i18n-js';
const scrWidth = Dimensions.get('window').width
const scrHeight = Dimensions.get('window').height
type SettingStackProps = {}
const Stacks = createStackNavigator<SettingStackParamList>();
export const SettingStack: React.FC<SettingStackProps> = ({ }) => {
    return (
        <Stacks.Navigator
            screenOptions={({ route }) => ({
                title: I18n.t(route.name),
            })}>
            <Stacks.Screen name="Menu" component={Menu} />
            <Stacks.Screen name="Wheel" component={Wheel} />
            <Stacks.Screen name="Map" component={Map} />
            <Stacks.Screen name="Settings" component={Settings} />
        </Stacks.Navigator>
    )
};
function Menu({ navigation, route }: SettingStackNavProps<"Menu">) {
    const { logout, data } = useContext(NewAuthContext);
    return (
        <ScrollView
            style={{ flex: 1, padding: 10 }}>
            <View
                style={{
                    height: scrHeight - 119,
                    paddingBottom: 10
                }}>
                <Center>
                    <Image
                        style={{
                            width: 100,
                            height: 100,
                        }}
                        source={require("../../../images/logo.png")}
                    />
                    <Text style={{ fontWeight: "bold", fontSize: 20 }}>{I18n.t("loginInform")}:</Text>
                    <Text>{I18n.t("class")}:{data!.classID}</Text>
                    <Text>{I18n.t("school")}: tpc</Text>
                </Center>
                <SettingTouchView
                    onPress={() => navigation.navigate("Wheel")}
                    title={I18n.t("Wheel")}
                    icon={<MaterialCommunityIcons name={I18n.currentLocale().indexOf("vi")>=0?"ferris-wheel":"ticket-percent"} size={20} color="black" />} />
                <SettingTouchView
                    onPress={() => {
                        console.log("Notification executed")
                        newNotification(`${I18n.t("notification")} 📬`, `${I18n.t("notificationTestSub")}🍕`, `${I18n.t("notificationTestBody")}🥗`, 3000)
                        console.log("Notification ended")
                    }}
                    title={I18n.t("notificationTitle")}
                    icon={<Entypo name="notification" size={20} color="black" />} />
                <SettingTouchView
                    onPress={() => navigation.navigate("Map")}
                    title={I18n.t("Map")}
                    icon={<MaterialCommunityIcons name="map-marker-outline" size={20} color="black" />} />
                <SettingTouchView
                    title={I18n.t("Settings")}
                    onPress={() => navigation.navigate("Settings")}
                    icon={<MaterialCommunityIcons name="settings-outline" size={20} color="black" />} />
            </View>
            <View style={{ paddingBottom: 20 }}>
                <SettingTouchView
                    onPress={() => logout()}
                    title={I18n.t("logout")}
                    style={{ backgroundColor: "#ecf0f1", borderColor: "#c0392b" }}
                    textStyle={{ color: "#e74c3c" }}
                    icon={<MaterialCommunityIcons name="logout-variant" size={20} color="#e74c3c" />} />
            </View>
        </ScrollView>
    )
}
function Wheel({ navigation }: SettingStackNavProps<"Wheel">) {
    return (
        <WheelPage navigation={navigation} />
    )
}
function Map({ }: SettingStackNavProps<"Map">) {
    return (
        <MapView
            style={{
                width: scrWidth,
                height: scrHeight
            }}
            initialRegion={{
                latitude: 20.842986,
                longitude: 106.711855,
                latitudeDelta: 0.002,
                longitudeDelta: 0.002
            }}
        >
            <Marker
                coordinate={{
                    latitude: 20.842986,
                    longitude: 106.711855
                }}
                title={I18n.t("schoolLocationTitle")}
                description={I18n.t("schoolLocationDescription")}
            />
        </MapView>
    )
}
function Settings({ navigation, route }: SettingStackNavProps<"Settings">) {
    const [_isColorful, setColorful] = useState(preferencesGetState().colorful)
    const [_isLanguageForced, setLanguageForced] = useState(preferencesGetState().forcedLanguage)
    const [_isEN, setEN] = useState(preferencesGetState().language === "en")
    useFocusEffect(
        () => {
            return () => {
                saveSettings()
            }
        }
    )

    return (
        <View>
            <SettingSwitchView
                title={I18n.t("colorfulMode")}
                icon={<MaterialCommunityIcons name="format-color-fill" size={25} color="grey" />}
                value={_isColorful}
                textStyle={{ fontSize: 17 }}
                onValueChange={(value) => {
                    preferenceChangeColorfulState(value)
                    setColorful(value)
                }} />
            <SettingSwitchView
                title={I18n.t("forceLanguageMode")}
                icon={<Entypo name="language" size={25} color="grey" />}
                value={_isLanguageForced}
                textStyle={{ fontSize: 17 }}
                onValueChange={(value) => {
                    preferenceChangeForcedLanguageState(value)
                    setLanguageForced(value)
                }} />
            {_isLanguageForced ?
                <>
                    <SettingSwitchView
                        title={"\t\t\t\t-> " + I18n.t("vi")}
                        icon={<MaterialCommunityIcons name={_isEN ? "flag-variant-outline" : "flag-variant"} size={25} color="grey" />}
                        value={!_isEN}
                        textStyle={{ fontSize: 17 }}
                        style={{
                            borderBottomWidth: 0,
                        }}
                        onValueChange={(value) => {
                            preferenceSetLanguageState(!value)
                            setEN(!value)
                        }} />
                    <SettingSwitchView
                        title={"\t\t\t\t-> " + I18n.t("en")}
                        icon={<MaterialCommunityIcons name={_isEN ? "flag-variant" : "flag-variant-outline"} size={25} color="grey" />}
                        value={_isEN}
                        textStyle={{ fontSize: 17 }}
                        style={{
                        }}
                        onValueChange={(value) => {
                            preferenceSetLanguageState(value)
                            setEN(value)
                        }} />
                </>
                : undefined
            }
        </View>
    )
}
export default SettingStack;