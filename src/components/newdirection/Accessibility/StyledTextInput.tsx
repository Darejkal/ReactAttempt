import React, { useEffect, useRef, useState } from 'react'
import { TextInput, TextInputProps } from 'react-native';
type StyledTextInputProps= TextInputProps & {
    backgroundColor?:string,
    minheight?:number,
    focusBackgroundColor?:string,
}
export const StyledTextInput: React.FC<any> = (props:StyledTextInputProps) => {
    const [bColor,setBColor] =useState("#95a5a6");
    const [hght,setHght] =useState(30);
    const _backgroundFallbackColor=useRef("#95a5a6");
    const _focusBackgroundColor=useRef("white");
    const _minheight =useRef(30);
    let {  style,backgroundColor,minheight,focusBackgroundColor,...other } = props;
    useEffect(()=>{
        if(backgroundColor) {
            setBColor(backgroundColor); 
            _backgroundFallbackColor.current=backgroundColor; 
        }
        if(minheight)
        {
            _minheight.current=minheight;
        }
        if(focusBackgroundColor){
            _focusBackgroundColor.current = focusBackgroundColor;
        }
        setBColor(bColor);
    },[props])
    return (
        <TextInput
        multiline={true}
        {...other}
        style={[style,{backgroundColor:bColor,height:Math.max(hght,_minheight.current)}]}
        onFocus={()=>{setBColor(_focusBackgroundColor.current)}}
        onBlur={()=>{setBColor(_backgroundFallbackColor.current)
        }}
        onContentSizeChange={(e) =>  setHght(e.nativeEvent.contentSize.height)}
        />
    )
};

export default StyledTextInput;