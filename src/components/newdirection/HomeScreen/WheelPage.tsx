import React, { useState, useRef, useEffect } from 'react'
import { Text, Button, View,TextInput,ScrollView, Alert } from 'react-native';
import { createTwoButtonAlert } from '../../Alerts';
import { Center } from '../../Center';
import { StackNavigationProp } from '@react-navigation/stack';
import { SettingStackParamList } from './NewHomeParamList';
import StyledTextInput from '../Accessibility/StyledTextInput';
import I18n from 'i18n-js';
type WheelPageProps = { 
    navigation:StackNavigationProp<SettingStackParamList, "Wheel">;
}
export const WheelPage: React.FC<WheelPageProps> = ({ }) => {
    const [valText,setValText] = useState("");
    const [num,setNum] = useState(0);
    const [editability,setEditability] = useState(true);
    const [visibility,setVisibility] = useState(false);
    let wheelRef= useRef();
    return (
        <View style={{ flex: 1, paddingTop: 10, paddingBottom: 10 }}>
        <ScrollView
        style={{ flex: 1, padding: 10 }}
        >
        <View style={{ backgroundColor: "#bdc3c7" }}>
    <Text style={{ padding: 10, fontSize: 15 }}>{I18n.t("wheelInitial")}</Text>
        </View>
        <View style={{flex:1}}>
            <StyledTextInput
            style={{height:50,padding:10}}
            placeholder={I18n.t("wheelEnterNumVar")}
            editable={editability}
            keyboardType="phone-pad"
            value={valText}
            onChangeText={value=>{setValText(value)}}
            />
            <Button
                title={I18n.t("ok")}
                onPress={()=>{
                    setEditability(false)
                    const parsed = Number(valText.replace(/\s/g,''))
                    if(!parsed) 
                    {createTwoButtonAlert(I18n.t("wheelWrongNumInput"),I18n.t("error"))
                    setEditability(true)}
                    else {
                        if(parsed>=100){
                            createTwoButtonAlert(I18n.t("wheelTooMuchInput"),I18n.t("wheelTooMuchInputHeading"))
                        } else{
                        setNum(parsed);
                        setVisibility(true);
                        setEditability(true)
                        }
                    }
                }}
            />
        </View>
            {visibility&&
            <>
            <AddVarComponent num={num}/>
            </>
            }
        </ScrollView>
        </View>
    )
};
const rollWheel =(arr:string[])=>{
    const result = arr[Math.round(Math.random()*(arr.length-1))]
    // const [title,setTitle]= useState(arr[0])
    Alert.alert(
        I18n.t("wheelResultHeading"),
        result,
        [
            { text: `${I18n.t("ok")}` }
        ],
        { cancelable: false }
    );
    // setTitle(arr[1])
    // setTimeout(title=arr[1],3000)
}
type AddVarComponentProps = {
    num:number;
}
type AddVarComponentStates = {
    arr:string[]
}
class AddVarComponent extends React.Component<AddVarComponentProps,AddVarComponentStates>{
    constructor(props){
        super(props)
        let temp = new Array<string>()
        for(let i=0; i<this.props.num;i++){
            temp.push('')
        }
        this.state={
            arr:temp
        }
    }
    componentDidUpdate(prevProps){
        if(this.props.num!=prevProps.num){
            let temp = new Array<string>()
            for(let i=0; i<this.props.num;i++){
                temp.push('')
            }
            this.setState({arr:temp})
        }
    }
   
    updateArr(value:string, index:number){
        let newArr=[...this.state.arr];
        newArr[index]=value;
        this.setState({arr:newArr});
    }
    render() {
    return(
    <View>
    {this.state.arr.map((valAtIndex,index)=>
        (<View style={{ paddingTop: 10 }} key={index}>
        <View style={{ backgroundColor: "#bdc3c7" }}>
            <Text style={{ padding: 10, fontSize: 15 }}>{`${I18n.t("wheelAddVar")} #${index+1}`}</Text>
        </View>
        <StyledTextInput
         style={{height:50,padding:10}}
         placeholder={I18n.t("wheelEnterVar")}
         value={this.state.arr[index]}
         onChangeText={(value:string)=>{
            this.updateArr(value,index)
            // console.log(arr)
            }}/>   
    </View>))}
    <Button
    title={I18n.t("wheelRoll")}
    onPress={()=>{
        let isEmpty = false;
        for(let i=0; i<this.props.num;i++){
            if(this.state.arr[i]===""){
                createTwoButtonAlert(I18n.t("wheelVariableEmpty"),I18n.t("wheelVariableEmptyHeading"))
                isEmpty=true
            }
        }
        if(!isEmpty)
            rollWheel(this.state.arr);
    }}
    />
    </View>
    )
}

}
export default WheelPage;