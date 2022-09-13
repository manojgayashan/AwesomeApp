import { View, Text,StyleSheet, TouchableOpacity , StatusBar, Modal, TextInput } from 'react-native'
import React, { useContext, useRef, useState  } from "react";

import AntDesign from 'react-native-vector-icons/AntDesign';

const toastConfig = { 

  default: ({ text1, props }) => (
    <View style={{ height: 40, width: '90%', backgroundColor: '#292929' ,flexDirection:'row',justifyContent:'flex-start',paddingHorizontal:10,alignItems:'center',borderRadius:5,zIndex:5}}>
      {
        props.err==true?
        <AntDesign name={'infocirlce'} size={18} color={'red'} />
        :
        <AntDesign name={'checkcircle'} size={18} color={'#589E4A'} />
        }
      <Text style={{color:'white'}}>  {text1}</Text>
    </View>
  )
};

export default toastConfig