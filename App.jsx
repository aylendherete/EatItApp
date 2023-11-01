/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React ,{useState}from 'react';
import {View} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { Inicio, RegistroNutricionista, RegistroPaciente, TipoRegistro } from './screens';

const Stack= createStackNavigator();

const App =()=> {
  const [loggedInUser, setLoggedUser]= React.useState(null)
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Inicio'>
        <Stack.Screen name='Inicio' component={Inicio} options={{ headerShown: false }}/>
        <Stack.Screen name='TipoRegistro' component={TipoRegistro} options={{ headerShown: false }}/>
        <Stack.Screen name='RegistroNutricionista' component={RegistroNutricionista} options={{ headerShown: false }}/>
        <Stack.Screen name='RegistroPaciente' component={RegistroPaciente} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default App;
