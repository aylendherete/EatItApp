
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import {Icon} from 'react-native-elements';
import { AnalisisRegistroPaciente,AnalisisRegistroPacienteActividad,AnalisisRegistroPacienteAgua, CalendarioNutricionista, EditarAntecedentes, EditarObjetivo, EditarPeso, MiPerfil, MisPacientes, NotificacionesPaciente, PerfilPaciente } from './screens';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { HistorialComentarios, HistorialRegistros} from './screens';

const TTab = createMaterialTopTabNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabHistorial({route}){
  const { paciente } = route.params;
  return(
    <TTab.Navigator
      tabBarOptions={{
        style: { display: 'none' }, // Oculta la barra superior del Top Tab Navigator
      }}
      screenOptions={{
        style: { display: 'none' }
      }
      }
      
    >
      <TTab.Screen name="HistorialRegistros">
        {() => <HistorialRegistros paciente={paciente} />}
      </TTab.Screen>


      <TTab.Screen name="HistorialComentario">
        {() => <HistorialComentarios paciente={paciente} />}
      </TTab.Screen>
    </TTab.Navigator>
  );
}

function StackNavigatorPacientes(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="MisPacientes" component={MisPacientes} options={{headerShown:false}}></Stack.Screen>
      <Stack.Screen name="PerfilPaciente" component={PerfilPaciente} options={{headerShown:false}}></Stack.Screen>
      <Stack.Screen name="EditarPeso" component={EditarPeso} options={{headerShown:false}}></Stack.Screen>
      <Stack.Screen name="EditarObjetivo" component={EditarObjetivo} options={{headerShown:false}}></Stack.Screen>
      <Stack.Screen name="EditarAntecedentes" component={EditarAntecedentes} options={{headerShown:false}}></Stack.Screen>
      <Stack.Screen name="TabHistorial" component={TabHistorial} options={{headerShown:false}}></Stack.Screen>
    </Stack.Navigator>
  )
}

function StackNavigatorNotificaciones(){
  return(
    <Stack.Navigator>
        <Stack.Screen name="NotificacionesNutricionista" component={NotificacionesPaciente} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name="AnalisisRegistroPaciente" component={AnalisisRegistroPaciente} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name="AnalisisRegistroPacienteAgua" component={AnalisisRegistroPacienteAgua} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name="AnalisisRegistroPacienteActividad" component={AnalisisRegistroPacienteActividad} options={{headerShown:false}}></Stack.Screen>
    </Stack.Navigator>
  );
}

export const Nutricionista=()=> {
  return (
  
      <Tab.Navigator>
        <Tab.Screen name='NotificacionesNutricionistaStack' component={StackNavigatorNotificaciones} options={{
          headerShown:false, 
          tabBarShowLabel:false,
          tabBarIcon:()=>(
            <Image  style={{height:30, width:30}} source={{uri:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAADl0lEQVR4nO2cO2gUURSGP8H4APGFYqIW0WgTfCEK2ig2goiWBkIatRCRGHw11mIjiDGFEWxsFQsbUTsxqLEyGEW0EQMWxmfiI744MjiBEHNnZ83uzpwz54PTzc7+/zmz9557l7ngOI7jOI7jOI7jOCWYAXQAvcDnOB4Ah4HppT7sTI6lQB8ggXgUX+NU6cnvS0j+2CL4L6EKdKRI/mi0V0NA0ektowD3sxZrkeEyChBd61SQhcDXMgoQXbvAKzA55gAHgXvA7zKSPxq/gDvAXmCmFyM9i4AzcX8vFYp3wElglhcizFTgCPCpgokfH6+BPV6Ef2mKV7NSo7gCzPZC/GVHlZ/6UDwHVlJw9sWTZZqERavg08AuYMW41W7U8awB2oBuYCDlPQeBDRSU/Sm6m5E4oc1l3nsKsB24kaII74G1FHDY+VkiMVeBxgp811agP8XkvIQCTbhJY/4Q0FLh74yGq3MlivAQmIZx6mKjoSQMAKuqPOwlzTnRHGOa4yWS31QDDa0Jc09UnPUYpT5hQ20o7mJqxYmEB+FuPImb42yC6bYM9FxL0LMTY8wFvgTMXs9wh3UwoKkHY7QHjH6PF1VZcSjhV2BqbRDa57mcg67sVUBbJ0ZYnNB1bMxaXMKEHBXGBK0Jm2F5f0BWY4DOgLnz5IeegMYDGOB2wFwL+eFUQOMlDPAiYG4d+WF3QGP0n7J6PgTMzSc/NAc0vsQAPwLm6sgP8wIaP2KA0EInT9QFNEb/WahHQwE06TRrTJToNGtMlOg0a0yU6DRrTJToNGtMlOg0a0yU6DRrTJToNGtMlOg0a0yU6DRrTJToNGtMlOg0a0yU6DRrTJToNGtMlOg0a0yU6DRrTJToNGtMlOg0a0yU6DRrTJToNGtMlOg0a0yU6DRrTJToNGtMlOg0a0yU6DRrTJToLPvlh4lMRW/K543QK7TR67XmXsx+TP7oD2g9ikIagGPxaScTmeoif3QFtH6LixB5yjVSsMgdWSdEvADZJ0X8F5B9YsSHoGJE7sg6IVL0AtSyNRwZ0xpqbHnV0B9IapTwtIu+6B5ODbYH6gPX+lH2k2AokNQG5ftOanhWgSHoaQa6zXAxYRI+lnISvpC1Cc1sq0C7uCVrE1aPu5EUcTNr8RZoBN78R/LfAsuzFm+FzQlHTE4UUcE2ZS3aGstSDke3KnTqupNwHH133F4Ox/Ek7nZ8wnUcx3Ecx3Ecx3FI5A/7nilkCn++owAAAABJRU5ErkJggg=="}}/>
          )
          }}/>
        <Tab.Screen name="MisPacientesStack" component={StackNavigatorPacientes} options={{
          headerShown:false, 
          tabBarShowLabel:false,
          tabBarIcon:()=>(
            <Image  style={{height:30, width:30}} source={{uri:"data:image/png;base64,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"}}/>

          )}}/>
        <Tab.Screen name="CalendarioNutricionista" component={CalendarioNutricionista}  options={{
          headerShown:false, 
          tabBarShowLabel:false,
          tabBarIcon:()=>(
            <Image style={{height:30, width:30}} source={{uri:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAABeklEQVR4nO2WMY4DMQzE/P9Pz7VpUgS3iugMCagTgqFlOXuOiIiIiIiIiIjIDHlTW9Dy1AkHlqdOOLA8jwm01Rrb4oGUAzgOYP0Wxg3YP4j4BO0fRhYK9x/wVP80t+e/XiCX579eIJfn5wVq88UFavPFBWrzffpzLpeWAzgOYP0Wxg3YP4j4BO0fRhbK/4DjABg3YphrNuBXCc0XF6jNFxeozRcXqM0XF6jNdzpQPvx9Wv84DuA4gFfcAJ+g7+ITdHyCXvEJ2r4Rw9R9BdHA+eICtfniArX54gK1+eICtfnSPvsC6x+HJhxY/zg04cD6x6EJB9Y/Dk04sP5xaMKB9Y+DC9TmiwvU5osL1OaLC9TmiwvU5osL1OZL++zL8AE5gOMAvnpD4wY8u5K0/k/xCToO4F83gtZftwG3E5ovLlCbLy5Qmy8uUJsvLlCbLy5Qm++7QG21xrZ4IOUAjgNYv4VxA/YPIj5B+4eRhRIREREREREREREROWD+AO5Mi+XCZVkbAAAAAElFTkSuQmCC"}}/>
          )}}/>
        <Tab.Screen name="MiPerfil" component={MiPerfil} options={{
          headerShown:false, 
          tabBarShowLabel:false,
          tabBarIcon:()=>(
            <Image  style={{height:30, width:30}} source={{uri:"data:image/png;base64,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"}}/>

          )}}/>
      </Tab.Navigator>
    
  );
}
