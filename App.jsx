/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React ,{useState}from 'react';
import {View,Alert} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { Inicio, RegistroNutricionista, RegistroPaciente, TipoRegistro , ElegirNutricionista, Paciente, Nutricionista, CartelSolicitud} from './screens';

import { requestMultiple, requestNotifications,PERMISSIONS } from 'react-native-permissions';

import messaging from '@react-native-firebase/messaging'

messaging().getToken().then((t)=>{
  console.log("TOKEN: ", t)
})

messaging().setBackgroundMessageHandler(async remoteMessage=>{
  console.log("Mensaje en el background: ", remoteMessage)
})

requestMultiple([PERMISSIONS.ANDROID.POST_NOTIFICATIONS]).then((statuses)=>{
  console.log('Notifis permissions',statuses[PERMISSIONS.ANDROID.POST_NOTIFICATIONS])
})


const Stack= createStackNavigator();

import {UserProvider} from '../EatItApp/context/userContext'

const App =()=> {
  React.useEffect(()=>{
    const subscription= messaging().onMessage(async remoteMessage=>{
      Alert.alert(remoteMessage.notification.title, remoteMessage.notification.body)
    })
    return subscription
  })
  return(
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Inicio'>
          <Stack.Screen name='Inicio' component={Inicio} options={{ headerShown: false }}/>
          <Stack.Screen name='TipoRegistro' component={TipoRegistro} options={{ headerShown: false }}/>
          <Stack.Screen name='RegistroNutricionista' component={RegistroNutricionista} options={{ headerShown: false }}/>
          <Stack.Screen name='RegistroPaciente' component={RegistroPaciente} options={{ headerShown: false }}/>
          <Stack.Screen name='ElegirNutricionista' component={ElegirNutricionista} options={{ headerShown: false }}/>
          <Stack.Screen name='Paciente' component={Paciente} options={{ headerShown: false }}/>
          <Stack.Screen name='Nutricionista' component={Nutricionista} options={{ headerShown: false }}/>
          <Stack.Screen name="CartelSolicitud" component={CartelSolicitud} options={{headerShown:false}}/>
          
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  )
}
export default App;
