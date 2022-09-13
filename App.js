import { View, Text ,StatusBar} from 'react-native'
import React from 'react'
import MyStack from './src/routes/Stack'
import { Provider } from './src/context/Context'

export default function App() {
  return (
    <Provider>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'}/>
      <MyStack/>
    </Provider>

  )
}