import React, { createContext, useState , useEffect } from "react";
import { View, Text,StyleSheet, Dimensions , StatusBar } from 'react-native'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const commanStyles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white'
    },
      list: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingVertical:15
      },
      row:{
        flexDirection:'row',
        alignItems:'center'
      },
      buttonPrimary:{
        backgroundColor:"#1B0A30",
        paddingHorizontal:25,
        paddingVertical:7,
        borderRadius:5,
        alignSelf:'center'
      },
      buttonSocial:{
        backgroundColor:"#fff",
        paddingHorizontal:25,
        paddingVertical:7,
        borderRadius:5,
        alignSelf:'center',
        elevation:3,
        marginTop:7
      },
      buttonText:{
        color:'#ffffff',
        textAlign:'center',
        fontSize:15
      },
      hr:{
        width:windowWidth-40,
        height:1,
        backgroundColor:'gray',
        marginVertical:10
      },
      textInput:{
        width:windowWidth,
        padding:20,
      },
      TextBoxView: {
        borderWidth:1,
        borderRadius:10,
      },
      textBoxTitle:{
        position:'absolute',
        top:-5,
        left:15,
        zIndex:5,
        paddingHorizontal:5,
        fontSize:13
      },
      header:{
        fontSize:30,
        fontWeight:'bold',
        color:'black'
      },
      blacktext:{
        fontSize:16,
        color:'black',
        textAlignVertical:'center'
      },
      graytext:{
        fontSize:16,
        color:'gray',
      },
      card:{
        width:windowWidth-40,
        padding:15,
        margin:5,
        elevation:5,
        backgroundColor:'white',
        borderRadius:15,
        zIndex:2
      },
      spaceBetweenRow:{
        flexDirection:'row',
        height:20,
        borderRadius:5,
        paddingHorizontal:5,
        justifyContent:'space-between',
        alignItems:'center'
      },
      coins:{
        fontSize:15
      },
      dates:{
        color:'gray',
        fontSize:11
      },
      target:{
       fontSize:11
      },
      coinView:{
        width:windowWidth-40,
        marginTop:5,
        flexDirection:'row',
        alignItems:'center'
      },
      coinIcon:{
        resizeMode:'cover',
        width:'100%',
        height:'100%'
      },
      coinIconView:{
        width:(windowWidth-40)/10,
        height:(windowWidth-40)/10
      },
      risk:{
        borderWidth:0.5,
        paddingHorizontal:5,
        borderColor:'#D18A00',
        borderRadius:3,
        paddingVertical:1
      },
      risktext:{
        fontSize:10,
        color:'#D18A00'
      },
      hold:{
        backgroundColor:'#08A835',
        paddingHorizontal:5,
        borderRadius:3,
        paddingVertical:1
      },
      stops:{
        backgroundColor:'#FF0000',
        paddingHorizontal:5,
        borderRadius:3,
        paddingVertical:1
      },
      whiteText:{
        fontSize:10,
        color:'#ffffff',
        fontWeight:'700',
        textAlignVertical:'center'
      },
      plancard:{
        width:(windowWidth-50)/2,
        margin:2.5,
        padding:10,
        borderRadius:7
      },
      tralcard:{
        width:(windowWidth-40),
        margin:2.5,
        padding:10,
        borderRadius:7
      },
      footer:{
        backgroundColor:'#F68422',
        position:'absolute',
        bottom:-(windowWidth-40),
        height:windowWidth*2,
        width:windowWidth*2,
        borderRadius:windowWidth,
        alignItems:'center',
        justifyContent:'center',
        zIndex:1
    },
    profileWrapper:{
        height:windowWidth/2.7,
        width:windowWidth/2.7,
        borderRadius:100,
        borderWidth:15,
        alignItems:'center',
        justifyContent:'center',
        borderColor:'rgba(0,0,0,0.2)'
    },
    profileImage:{
        height:windowWidth/3,
        width:windowWidth/3,
        borderRadius:windowWidth
    },
    alphabg:{
        backgroundColor:'rgba(0,0,0,0.4)',
        height:windowWidth/2.7,
        width:windowWidth/2.7,
        borderRadius:windowWidth,
        position:'absolute',
        top:0,
        left:0,
        zIndex:5,
        alignItems:'center',
        justifyContent:'center'
    },
    orangeInput:{
        width:windowWidth-80,
        paddingLeft:15,
        color:'black',
        backgroundColor:'rgba(0,0,0,0.1)',
        borderRadius:15,
        marginBottom:5,
        borderWidth:1
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:'rgba(0,0,0,0.1)',
        zIndex:6
      },
      modalView: {
        margin: 25,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        zIndex:27
      },
    alignEnd:{
        alignItems:'flex-end',
        width:windowWidth-60,
    }
})

export default commanStyles;