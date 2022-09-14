import { View, Text, TouchableOpacity, TextInput, Image, Keyboard, Modal,StyleSheet, Pressable } from 'react-native'
import React, { useContext, useState , useEffect, useRef } from "react";
import { useNavigation } from '@react-navigation/native';
import commanStyles from '../constants/Styles';
import TextBox from '../components/TextBox'
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import toastConfig from '../components/CustomToast';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Context } from '../context/Context';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {InstagramLogin} from 'react-native-instagram-login';
// import CookieManager from '@react-native-community/cookies';
import InstagramLogin from 'react-native-instagram-login';

export default function Login() {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');

    const [oUsername, setOUsername] = useState('');
    const [oPassword, setOPassword] = useState('');

    const [eVal,setEVal]=useState(false)
    const [pVal,setPVal]=useState(false)
    const [modalVisible, setModalVisible] = useState(false);

    const context = useContext(Context);
    
  const [showp,setShowp]=useState(true)
  const [showp2,setShowp2]=useState(true)

  
  const [ou,setOU]=useState(false)
  const [op,setOP]=useState(false)

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('user', jsonValue)
    } catch (e) {
      // saving error
    }
  }

  const login =()=>{
    Keyboard.dismiss()
    if (email!='' && password!=''){
        auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
            // console.log('User account created & signed in!');
            Toast.show({
                type: 'default',
                text1: 'Login Successfull',
                props: { err:false }
              });  
              getUser(0)
        })
        .catch(error => {
            if (error.code === 'auth/invalid-email') {
            // console.log('That email address is invalid!');
            Toast.show({
                type: 'default',
                text1: 'That email address is invalid',
                props: { err:true }
              });  
            }
            if (error.code === 'auth/wrong-password') {
            // console.log('That email address is invalid!');
            Toast.show({
                type: 'default',
                text1: 'The password is invalid',
                props: { err:true }
              });  
            }
            if (error.code === 'auth/user-not-found') {
            // console.log('That email address is invalid!');
            Toast.show({
                type: 'default',
                text1: 'User Not Found',
                props: { err:true }
              });  
            }
            console.log(error)
        });
    }
    else{
        Toast.show({
        type: 'default',
        text1: 'All Fields Required',
        props: { err:true }
      });    
    }


  }
//   const instagramLogin  = useRef(null);
  const setIgToken = (data) => {
    console.log('data', data)
    // this.setState({ token: data.access_token })
  }
  const logout=()=> {
    CookieManager.clearAll(true)
      .then((res) => {
        console.log('CookieManager.clearAll =>', res);
        // this.setState({ token: '' })
      });
  }

  const orange=() =>{
    Keyboard.dismiss()
    var formdata = new FormData();

    formdata.append("client_id", 'admin_orangehrm_mobile_app')
    formdata.append("client_secret", '12345678')
    formdata.append("grant_type", 'client_credentials')

    if(oUsername==''){
        setOU(true)
        Toast.show({
            type: 'default',
            text1: 'Username Required',
            props: { err:true }
        })
    }    
    if(oPassword==''){
        setOP(true)
        Toast.show({
            type: 'default',
            text1: 'Password Required',
            props: { err:true }
        })
    }
    if(oUsername!='' || oPassword!=''){
    fetch('https://manojgayashan-osondemand.orangehrm.com/symfony/web/index.php/oauth/issueToken', {
        method: 'POST',
        body: formdata,
        headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => response.json())
        .then((json) => {
            console.log(json.access_token);
            postLoginOrange(json.access_token);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    else{
        setOP(true)
        setOU(true)
        Toast.show({
            type: 'default',
            text1: 'All Fields Required',
            props: { err:true }
        })
    }
  }

  const postLoginOrange =(token)=>{
    
    var formdata = new FormData();

    formdata.append("username", oUsername)
    formdata.append("password", oPassword)

    fetch('https://manojgayashan-osondemand.orangehrm.com/symfony/web/index.php/api/v1/login', {
        method: 'POST',
        body: formdata,
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization':'Bearer '+token
          },
        })
        .then((response) => response.json())
        .then((json) => {
            console.log(json.user['employeeName']);
            json.login?
            [
            Toast.show({
                type: 'default',
                text1: 'Successfully Login',
                props: { err:false }
            }),
            anonymousSign(),
            saveOrangeUser(json)                
            ]

            :
            Toast.show({
                type: 'default',
                text1: json.error['text'],
                props: { err:true }
            })
        })
        .catch((error) => {
          console.log(error);

        });
  }

  const anonymousSign=()=>{
    auth()
    .signInAnonymously()
    .then(() => {
        console.log('User signed in anonymously');
    })
    .catch(error => {
        if (error.code === 'auth/operation-not-allowed') {
        console.log('Enable anonymous in your firebase console.');
        }

        console.error(error);
    });
  }

  const saveOrangeUser=(res)=>{
    firestore()
    .collection('Users')
    .where('username', '==', oUsername)
    .get()
    .then(querySnapshot  => {  
        if(querySnapshot.size<1){
            console.log('0')
            adduser(res)
        }
        else{
            console.log('1')
            getUser(1)
        }
        // querySnapshot.forEach(documentSnapshot => {
        //     console.log('User data: ', documentSnapshot.data());
        //     context.setUser(documentSnapshot.data())
        //     storeData(documentSnapshot.data())
        // })
    });
  }
  const adduser=(res)=>{
    firestore()
        .collection('Users')
        .add({
            name: res.user['employeeName'],
            username: res.user['userName'],
            type:'orangeHRM'
        })
        .then(() => {
            console.log('User added!');
            getUser(1)
        });
  }

  const getUser=(type)=>{
    type==0?
    firestore()
    .collection('Users')
    .where('email', '==', email)
    .get()
    .then(querySnapshot  => {
      console.log('Total users: ', querySnapshot.size);

      querySnapshot.forEach(documentSnapshot => {
          context.setUser(documentSnapshot.data())
          storeData(documentSnapshot.data())
          navigation.navigate('Home')
          console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
      });
    })
    :
    firestore()
    .collection('Users')
    .where('username', '==', oUsername)
    .get()
    .then(querySnapshot  => {
      console.log('Total users: ', querySnapshot.size);

      querySnapshot.forEach(documentSnapshot => {
          context.setUser(documentSnapshot.data())
          storeData(documentSnapshot.data())
          navigation.navigate('Home')
          console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
          setModalVisible(false)
      });
    })

  }


  return (
    <View style={commanStyles.container}>
      <Text style={commanStyles.header}>Login</Text>
      <View style={commanStyles.card}>
      <TextBox title={'Email'} 
          content={
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:10}}>
            
            <Feather name={'mail'} size={20} color={'black'} />
            <TextInput         
            onChangeText={(text)=>setEmail(text)}
            value={email}
            style={{width:"90%",paddingLeft:5,color:'black'}}
            onFocus={()=>setEVal(false)}
            onChange={()=>setEVal(false)}
            placeholder={'Enter Email'}
            />
            {/* {
              eVal?
              <Text>test</Text>
              :
              null
            } */}
            
            </View>
          }
          /> 

        <TextBox title={'Password'} 
          content={
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:10}}>
                        <Feather name={'lock'} size={20} color={'black'} />
            <TextInput         
            onChangeText={(text)=>setpassword(text)}
            value={password}
            style={{width:"80%",paddingLeft:5,color:'black'}}
            onFocus={()=>setPVal(false)}
            onChange={()=>setPVal(false)}
            secureTextEntry={showp}
            placeholder={'Enter Password'}
            />
            {
              showp?
              <TouchableOpacity onPress={()=>{setShowp(false)}}>
                <Ionicons name={'eye-off'} size={20} color={'gray'} />              
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={()=>{setShowp(true)}}>
                <Ionicons name={'eye'} size={20} color={'gray'} />              
              </TouchableOpacity>
            }
            {/* {
              pVal?
              <Text>test</Text>
              :
              null
            } */}
            
            </View>
          }
          /> 
        <TouchableOpacity style={commanStyles.buttonPrimary} onPress={()=>{login()}}>
            <View>
                <Text style={commanStyles.buttonText}>Login</Text>
            </View>
        </TouchableOpacity>  

       <Text style={[commanStyles.graytext,{textAlign:'center',paddingVertical:10}]}>Or</Text> 
  

        <InstagramLogin
        ref={ref => (instagramLogin = ref)}
                    // ref={instagramLogin }
                    appId='5581786595209655'
                    appSecret='85cd36f4f7f53f474c7db7ccf441251f'
                    redirectUrl='https://github.com/'
                    scopes={['user_profile', 'user_media']}
                    onLoginSuccess={()=>setIgToken()}
                    onLoginFailure={(data) => console.log(data)}
                    
                    />
        <TouchableOpacity style={commanStyles.buttonSocial} onPress={()=>{setModalVisible(true)}}>
            <View style={commanStyles.row}>
                <Text style={commanStyles.blacktext}> Login with </Text>
                <Image source={require('../assets/images/ohrm.png')} style={{height:19,width:75}}/>
            </View>
        </TouchableOpacity>

        <TouchableOpacity style={commanStyles.buttonSocial} onPress={()=>instagramLogin.show()}>
            <View style={commanStyles.row}>
                <Feather name={'instagram'} size={17} color={'black'} />
                <Text style={commanStyles.blacktext}> Login with Instagram</Text>
            </View>
        </TouchableOpacity> 
      </View>

        <Animatable.View animation={'fadeInUpBig'} delay={1000} style={commanStyles.footer}>
            <Animatable.Text animation={'fadeIn'} style={commanStyles.whiteText}><AntDesign name={'copyright'} size={10} color={'white'} /> Copyright</Animatable.Text>
        </Animatable.View>
        <Toast
        position='top'
        topOffset={20}
        config={toastConfig}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <Pressable style={commanStyles.centeredView} >

            <View style={commanStyles.modalView}>
        <Pressable
              style={{alignSelf:'flex-end'}}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Ionicons name={'close'} size={20} color={'gray'} />
            </Pressable>
            <Image source={require('../assets/images/ohrm.png')} style={{height:38,width:150,marginBottom:20}}/>
               
               <TextInput         
                    onChangeText={(text)=>setOUsername(text)}
                    value={oUsername}
                    style={[commanStyles.orangeInput,{borderColor:ou?'red':'transparent'}]}
                    placeholder={'Username'}
                    onFocus={()=>setOU(false)}
                />
                <View style={commanStyles.row}>
                <TextInput         
                    onChangeText={(text)=>setOPassword(text)}
                    value={oPassword}
                    style={[commanStyles.orangeInput,{borderColor:op?'red':'transparent'}]}
                    placeholder={'Password'}
                    secureTextEntry={showp2}
                    onFocus={()=>setOP(false)}
                />
                <View style={{position:'absolute',right:15}}>
                {
                showp2?
                <TouchableOpacity onPress={()=>{setShowp2(false)}}>
                    <Ionicons name={'eye-off'} size={20} color={'gray'} />              
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={()=>{setShowp2(true)}}>
                    <Ionicons name={'eye'} size={20} color={'gray'} />              
                </TouchableOpacity>
                }
                </View>
                </View>
                <View style={commanStyles.alignEnd}>
                    <TouchableOpacity style={commanStyles.buttonSocial} onPress={()=>{orange()}}>
                        <View style={commanStyles.row}>
                            <Feather name={'log-in'} size={17} color={'black'} />
                            <Text style={commanStyles.blacktext}> Login</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>
            
        </Pressable>
      </Modal>
    </View>
  )
}

