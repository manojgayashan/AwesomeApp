import { View, Text, TouchableOpacity, Image , ActivityIndicator } from 'react-native'
import React, { useContext, useState , useEffect } from "react";
import commanStyles from '../constants/Styles'
import * as Animatable from 'react-native-animatable';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import { Context } from '../context/Context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import DocumentPicker, {
    DirectoryPickerResponse,
    DocumentPickerResponse,
    isInProgress,
    types,
  } from 'react-native-document-picker'
  import toastConfig from '../components/CustomToast';
import  Toast  from 'react-native-toast-message';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export default function Home() {

    const context = useContext(Context);

    const [click, setClick] = useState(false);
    const [pic, setPic] = useState(null);

    const navigation = useNavigation();

    const removeItemValue = async () => {
        try {
          await AsyncStorage.removeItem("user");
          // return true;
        }
        catch (exception) {
          // return false;
        } 
    }

    const SignOut = () => {

      
        auth()
          .signOut()
          .then(() => {
            console.log('User signed out!');
            navigation.navigate('Login');
          });
          removeItemValue();
          setPic(null)
    }

    const pickImage = async ()=>{

          try {
            const res = await DocumentPicker.pick({
              type: [DocumentPicker.types.images],
            });
            console.log(res[0])
            var filetype = res[0]['type'].split('/')[1]
            var fileUri = res[0]['uri']
            var filename =fileUri

            console.log(filename)
            setPic(filename)
            uploadImage(filetype,fileUri)
          } catch ( err ) {
            // if ( DocumentPicker.isCancel(err) ) {
            //   // User cancelled the picker, exit any dialogs or menus and move on
            // } else {
            //   throw err;
            // }
            console.log(err)
          }
    }

    const uploadImage = async (filetype,fileUri) =>{
        var suffix = Date.now();
        // if(pic!=null){

        var filename =suffix+'.'+filetype
    
        const reference = storage().ref(filename);
          // console.log(preffix+suffix+'.'+filetype)
            // path to existing file on filesystem
            // const pathToFile = response.assets[0]['uri'];
            // uploads file
            await reference.putFile(fileUri);
            const url = await reference.getDownloadURL();
            // console.log('>>>>>>>>>>'+url)
            updateUser(url)
            Toast.show({
              type: 'default',
              text1: "Profile Picture Updated!",
              props: { err:false ,colors:context.colors}
            });
        // }
      }
      const updateUser = (image)=>{
        firestore()
            .collection('Users')
            .where('username', '==', context.user.username)
            .get()
            .then(querySnapshot  => {  

                querySnapshot.forEach(documentSnapshot => {
                    firestore()
                    .collection('Users')
                    .doc(documentSnapshot.id)
                    .update({
                      profilePic: image
                    })
                    .then(() => {
                      Toast.show({
                          type: 'default',
                          text1: "Profile Picture Updated!",
                          props: { err:false }
                        });
                      getUser()
                    });

                })
            });


      }

      const getUser =()=>{
        firestore()
            .collection('Users')
            .where('username', '==', context.user.username)
            .get()
            .then(querySnapshot  => {  

                querySnapshot.forEach(documentSnapshot => {
                    console.log('User data: ', documentSnapshot.data());
                    context.setUser(documentSnapshot.data())
                    storeData(documentSnapshot.data())
                })
            });
      }

      const storeData = async (value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('user', jsonValue)
        } catch (e) {
          // saving error
        }
      }

      
  return (
    <View style={commanStyles.container}>
      {
        context.user!=null?
      <View style={commanStyles.card}>
        <TouchableOpacity onPress={()=>setClick(true)}>
                {
                    click==true?
                    <View style={commanStyles.alphabg}
                    onLayout={()=>
                        setTimeout(() => {
                            setClick(false)
                        }, 3000)
                    }
                    >
                        
                        <TouchableOpacity onPress={()=>pickImage()}>
                        <MaterialCommunityIcons name={'folder-image'} size={40} color={'white'} />
                        </TouchableOpacity>
                    </View>
                    :
                    null
                }
            <View style={commanStyles.profileWrapper}>
                {
                    pic==null?
                    context.user.profilePic==null?
                    <Image source={require('../assets/images/profile.jpg')} style={commanStyles.profileImage}/>
                    :
                    <Image source={{uri:context.user.profilePic}} style={commanStyles.profileImage}/>
                    :
                    <Image source={{uri:pic}} style={commanStyles.profileImage}/>

                }
            </View>
            
        </TouchableOpacity>
            <Text style={[commanStyles.blacktext,{paddingVertical:5}]}><Feather name={'user'} size={17} color={'black'} /> {context.user.name}</Text>
            {
                context.user.email==null?
                null:
                 <Text style={[commanStyles.blacktext,{paddingVertical:5}]}><Feather name={'mail'} size={17} color={'black'} /> {context.user.email}</Text>
            }
           
            <TouchableOpacity style={commanStyles.buttonSocial} onPress={()=>{SignOut()}}>
            <View style={commanStyles.row}>
                <Feather name={'log-out'} size={17} color={'black'} />
                <Text style={commanStyles.blacktext}> Logout</Text>
            </View>
        </TouchableOpacity>
      </View>
      :
      <View style={commanStyles.card}>
      <ActivityIndicator size="large" color="#F68422" />
        </View>
        
    }
      <Animatable.View animation={'fadeInUpBig'} delay={1000} style={commanStyles.footer}>
            <Animatable.Text animation={'fadeIn'} style={commanStyles.whiteText}><AntDesign name={'copyright'} size={10} color={'white'} /> Copyright</Animatable.Text>
        </Animatable.View>
        <Toast
        position='top'
        topOffset={20}
        config={toastConfig}
      />
    </View>
  )
}