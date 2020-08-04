import React, { useState } from 'react'
import { TextInput } from 'react-native';
export const StyledTextInput: React.FC<any> = (props) => {
    const [backgroundColor,setBackgroundColor] =useState("#95a5a6");
    let {  style,...other } = props;
    return (
        <TextInput
        {...other}
        style={{backgroundColor:backgroundColor,...style}}
        onFocus={()=>{setBackgroundColor("white")}}
        onBlur={()=>{setBackgroundColor("#95a5a6")}}
        />
    )
};

export default StyledTextInput;