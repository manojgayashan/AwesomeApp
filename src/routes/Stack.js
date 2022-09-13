import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext, useState , useEffect } from "react";
import Home from '../views/Home';
import Login from '../views/Login';
import { NavigationContainer } from '@react-navigation/native';
import { Context } from '../context/Context';

import auth from '@react-native-firebase/auth';

const Stack = createStackNavigator();

function MyStack() {
    
    const context = useContext(Context);
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
  
    function onAuthStateChanged(user) {
      setUser(user);
      if (initializing) setInitializing(false);
    }
  
    useEffect(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber; // unsubscribe on unmount
    }, []);
    if (initializing) return null;
  

  return (
    <NavigationContainer>
        {
            !user?
            <Stack.Navigator
            screenOptions={{
                headerShown:false
            }}
            initialRouteName={'Login'}
            >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={Home} />
            </Stack.Navigator>
            :
            <Stack.Navigator
            initialRouteName={'Home'}
            screenOptions={{
                headerShown:false
            }}
            >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={Home} />
            </Stack.Navigator>
        }


    </NavigationContainer>
  );
}

export default MyStack