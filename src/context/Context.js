import React, { createContext, useState , useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Context = createContext();

export const Provider = ({ children }) => {

    const [user, setUser] = useState(null);

    const getuser= async () => {
      try {
        
        const jsonValue = await AsyncStorage.getItem('user')
        return jsonValue != null ? setUser(JSON.parse(jsonValue)) : null;
      } catch(e) {
        // error reading value
      }
    }

    useEffect(() => {

      getuser()

    }, []);
  return (
    <Context.Provider
      value={{
        user,
        setUser,
      }}
    >
     {children}
    </Context.Provider>
  );
};