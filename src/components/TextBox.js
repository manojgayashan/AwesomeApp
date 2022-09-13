import React, { useContext, useState , useEffect } from "react";
import { View, Text,StyleSheet, TouchableOpacity , StatusBar } from 'react-native'

// import { TradeContext } from "../context/Context"
import * as Animatable from 'react-native-animatable';
import commanStyles from "../constants/Styles";

const TextBox = ({
        title,
        content,
})=>{
    
return(
    <Animatable.View animation={'fadeInLeft'} style={{paddingVertical:7}}>
        <Text style={[commanStyles.textBoxTitle,{backgroundColor:'white'}]}>{title}</Text>
        <View style={[commanStyles.TextBoxView,{borderColor:'black'}]}>
        {content}
        </View>    
    </Animatable.View>

)
}

export default TextBox;