import { StackNavigationProp } from '@react-navigation/stack';
import { BarCodeScanningResult, Camera } from 'expo-camera';
import I18n from 'i18n-js';
import React, { useEffect, useState,useContext } from 'react'
import { Pressable, View, Text, Dimensions, ScaledSize } from 'react-native';
import { NewAppParamList } from './NewHomeParamList';
import { AntDesign } from '@expo/vector-icons';
type QRStackProps = {
    navigation:StackNavigationProp<NewAppParamList, "QR">
}
const dimension = Dimensions.get("window")
export const QRStack: React.FC<QRStackProps> = ({navigation }) => {
    const [permission, setPermission] = useState(false);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [barCode, setBarcode] = useState<BarCodeScanningResult|null>(null);
    function onTabChange() {
        setBarcode(null);
    }
    useEffect(
        () => {
            Camera.getPermissionsAsync().then(
                (value) => {
                    setPermission(value.granted);
                    if (!value.granted) {
                        if (value.canAskAgain)
                            Camera.requestCameraPermissionsAsync()
                    }
                }
            )
            navigation.addListener("focus",onTabChange)
            return ()=>{
                navigation.removeListener("focus",onTabChange);
            }
        },[]
    )
    if(barCode)
        return (
        <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
        <AntDesign name="check" size={dimension?Math.max(dimension.height,dimension.width)*0.3:40} color="#2de376" style={{}} />
        <Text style={{
            marginTop:100,
            fontSize: 18,
            color: '#2de376',
        }}>{I18n.t("Attendedfor")+" : "} <Text style={{color:"black"}}>{barCode!.data}</Text></Text>
        </View>
        )
    else 
        return (
        <View style={{ flex: 1 }}>
            <Camera style={{ flex:1,marginBottom:40 }} 
            onBarCodeScanned={(e)=>{
                //setBarcode(e);
            }}
            type={type}>
                <View style={{
                    flex: 1,
                    backgroundColor: 'transparent',
                    flexDirection: 'row',
                    margin: 20,
                }
                }>
                    <Pressable
                        style={{
                            flex: 0.1,
                            alignSelf: 'flex-end',
                            marginBottom:100,
                            alignItems: 'center',
                        }}
                        onPress={() => {
                            setType(
                                type === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back
                            );
                        }}>
                        <Text style={{
                            fontSize: 18,
                            color: 'white'
                        }}> Flip </Text>
                    </Pressable>
                </View>
            </Camera>
        </View>
    )
};

export default QRStack;