import React, { useState, useRef, useEffect } from 'react'
import { Text, Button, View,TextInput,ScrollView, Alert } from 'react-native';
import { createTwoButtonAlert } from '../../Alerts';
import { Center } from '../../Center';
import { StackNavigationProp } from '@react-navigation/stack';
import { SettingStackParamList } from './NewHomeParamList';
import StyledTextInput from '../Accessibility/StyledTextInput';
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
        <Text style={{ padding: 10, fontSize: 15 }}>Initial set up</Text>
        </View>
        <View style={{flex:1}}>
            <StyledTextInput
            style={{height:50,padding:10}}
            placeholder="Enter number of variable"
            editable={editability}
            keyboardType="phone-pad"
            value={valText}
            onChangeText={value=>{setValText(value)}}
            />
            <Button
                title="OK"
                onPress={()=>{
                    setEditability(false)
                    const parsed = Number(valText.replace(/\s/g,''))
                    if(!parsed) 
                    {createTwoButtonAlert("Input must be number","Error")
                    setEditability(true)}
                    else {
                        if(parsed>=100){
                            createTwoButtonAlert("Stop abusing it, you filthy pig","Too many, don't ya think?")
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
    let msg = "Rolling result"
    // const [title,setTitle]= useState(arr[0])
    Alert.alert(
        msg,
        result,
        [
            { text: "OK", onPress: () => console.log("OK Pressed") }
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
            <Text style={{ padding: 10, fontSize: 15 }}>{`Add variable no #${index+1}`}</Text>
        </View>
        <StyledTextInput
         style={{height:50,padding:10}}
         placeholder="Enter value"
         value={this.state.arr[index]}
         onChangeText={(value:string)=>{
            this.updateArr(value,index)
            // console.log(arr)
            }}/>   
    </View>))}
    <Button
    title="Roll"
    onPress={()=>{
        let isEmpty = false;
        for(let i=0; i<this.props.num;i++){
            if(this.state.arr[i]===""){
                createTwoButtonAlert("Please enter all variable","Input cannot be empty")
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