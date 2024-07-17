import React, { useState, useRef } from 'react';
import 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { CalendarioPaciente, MiPerfil, NotificacionesPaciente, RegistroComentado, RegistroComida, RegistroTipoActividad, RegistroTipoAgua, RegistroTipoComida, TurnosPaciente, DatosPaciente, RegistroComentadoActividad, RegistroComentadoAgua, HistorialComentarios } from './screens';
import { Image,StyleSheet,View,Text } from 'react-native';
import { Screen } from 'react-native-screens';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createBottomTabNavigator();
const Stack= createStackNavigator();

function StackNavigation(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="RegistroComida" component={RegistroComida} options={{headerShown:false}}/>
            <Stack.Screen name="RegistroTipoComida" component={RegistroTipoComida} options={{headerShown:false}}/>
            <Stack.Screen name="RegistroTipoAgua" component={RegistroTipoAgua} options={{headerShown:false}}/>
            <Stack.Screen name="RegistroTipoActividad" component={RegistroTipoActividad} options={{headerShown:false}}/>
        </Stack.Navigator>
    )
}

function StackNavigationNotificaciones(){
  
  return(
    <Stack.Navigator>
      <Stack.Screen name="NotificacionesPaciente" component={NotificacionesPaciente} options={{headerShown:false}}/>
      <Stack.Screen name="RegistroComentado" component={RegistroComentado} options={{headerShown:false}}/>
      <Stack.Screen name="RegistroComentadoActividad" component={RegistroComentadoActividad} options={{headerShown:false}}/>
      <Stack.Screen name="RegistroComentadoAgua" component={RegistroComentadoAgua} options={{headerShown:false}}/>
    </Stack.Navigator>
  )
}

const TopTab = createMaterialTopTabNavigator();

export const ResumenPacientee=(props)=>{
    return(
        <View style={styles.fondoVerde}>
            <View>
            <Text style={styles.bannerPaciente}>Paciente</Text>
            </View>
            <View style={{flex:4}}>
            
                <View style={styles.container}>
                    <TopTab.Navigator tabBar={() => null}>
                        <TopTab.Screen name="ClendarioPaciente" component={CalendarioPaciente} options={{headerShown:false, tabBarShowLabel:false}}/>
                        <TopTab.Screen name="DatosPaciente" component={DatosPaciente} options={{headerShown:false, tabBarShowLabel:false}}/>
                        <TopTab.Screen name="HistorialComentarios" component={HistorialComentarios} options={{headerShown:false, tabBarShowLabel:false}}/>
                        <TopTab.Screen name="TurnosPaciente" component={TurnosPaciente} options={{headerShown:false, tabBarShowLabel:false}}/>

                    </TopTab.Navigator>
                
                </View>

            </View>
        
        </View>
    );

}



export const Paciente=()=>{
  
  return(
 
    <Tab.Navigator>
        <Tab.Screen name="NotificacionesPacienteStack" component={StackNavigationNotificaciones} options={{
          headerShown:false, 
          tabBarShowLabel:false,
          tabBarIcon:()=>(
            <Image  style={{height:30, width:30}} source={{uri:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAADl0lEQVR4nO2cO2gUURSGP8H4APGFYqIW0WgTfCEK2ig2goiWBkIatRCRGHw11mIjiDGFEWxsFQsbUTsxqLEyGEW0EQMWxmfiI744MjiBEHNnZ83uzpwz54PTzc7+/zmz9557l7ngOI7jOI7jOI7jOCWYAXQAvcDnOB4Ah4HppT7sTI6lQB8ggXgUX+NU6cnvS0j+2CL4L6EKdKRI/mi0V0NA0ektowD3sxZrkeEyChBd61SQhcDXMgoQXbvAKzA55gAHgXvA7zKSPxq/gDvAXmCmFyM9i4AzcX8vFYp3wElglhcizFTgCPCpgokfH6+BPV6Ef2mKV7NSo7gCzPZC/GVHlZ/6UDwHVlJw9sWTZZqERavg08AuYMW41W7U8awB2oBuYCDlPQeBDRSU/Sm6m5E4oc1l3nsKsB24kaII74G1FHDY+VkiMVeBxgp811agP8XkvIQCTbhJY/4Q0FLh74yGq3MlivAQmIZx6mKjoSQMAKuqPOwlzTnRHGOa4yWS31QDDa0Jc09UnPUYpT5hQ20o7mJqxYmEB+FuPImb42yC6bYM9FxL0LMTY8wFvgTMXs9wh3UwoKkHY7QHjH6PF1VZcSjhV2BqbRDa57mcg67sVUBbJ0ZYnNB1bMxaXMKEHBXGBK0Jm2F5f0BWY4DOgLnz5IeegMYDGOB2wFwL+eFUQOMlDPAiYG4d+WF3QGP0n7J6PgTMzSc/NAc0vsQAPwLm6sgP8wIaP2KA0EInT9QFNEb/WahHQwE06TRrTJToNGtMlOg0a0yU6DRrTJToNGtMlOg0a0yU6DRrTJToNGtMlOg0a0yU6DRrTJToNGtMlOg0a0yU6DRrTJToNGtMlOg0a0yU6DRrTJToNGtMlOg0a0yU6DRrTJToNGtMlOg0a0yU6DRrTJToNGtMlOg0a0yU6DRrTJToLPvlh4lMRW/K543QK7TR67XmXsx+TP7oD2g9ikIagGPxaScTmeoif3QFtH6LixB5yjVSsMgdWSdEvADZJ0X8F5B9YsSHoGJE7sg6IVL0AtSyNRwZ0xpqbHnV0B9IapTwtIu+6B5ODbYH6gPX+lH2k2AokNQG5ftOanhWgSHoaQa6zXAxYRI+lnISvpC1Cc1sq0C7uCVrE1aPu5EUcTNr8RZoBN78R/LfAsuzFm+FzQlHTE4UUcE2ZS3aGstSDke3KnTqupNwHH133F4Ox/Ek7nZ8wnUcx3Ecx3Ecx3FI5A/7nilkCn++owAAAABJRU5ErkJggg=="}}/>
          )
          }}/>
        <Tab.Screen name='RegistroComidaStack' component={StackNavigation} options={{ 
          headerShown: false, 
          tabBarShowLabel:false, 
          tabBarIcon: () => (
            <Image style={{height:30, width:30}} source={{ uri:"data:image/png;base64,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"}}/>
          )
          }}/>        
        <Tab.Screen name="ResuPaciente" component={ResumenPacientee} options={{
          headerShown:false, 
          tabBarShowLabel:false,
          tabBarIcon:()=>(
            <Image style={{height:30, width:30}} source={{uri:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAABeklEQVR4nO2WMY4DMQzE/P9Pz7VpUgS3iugMCagTgqFlOXuOiIiIiIiIiIjIDHlTW9Dy1AkHlqdOOLA8jwm01Rrb4oGUAzgOYP0Wxg3YP4j4BO0fRhYK9x/wVP80t+e/XiCX579eIJfn5wVq88UFavPFBWrzffpzLpeWAzgOYP0Wxg3YP4j4BO0fRhbK/4DjABg3YphrNuBXCc0XF6jNFxeozRcXqM0XF6jNdzpQPvx9Wv84DuA4gFfcAJ+g7+ITdHyCXvEJ2r4Rw9R9BdHA+eICtfniArX54gK1+eICtfnSPvsC6x+HJhxY/zg04cD6x6EJB9Y/Dk04sP5xaMKB9Y+DC9TmiwvU5osL1OaLC9TmiwvU5osL1OZL++zL8AE5gOMAvnpD4wY8u5K0/k/xCToO4F83gtZftwG3E5ovLlCbLy5Qmy8uUJsvLlCbLy5Qm++7QG21xrZ4IOUAjgNYv4VxA/YPIj5B+4eRhRIREREREREREREROWD+AO5Mi+XCZVkbAAAAAElFTkSuQmCC"}}/>
          )
          }}/>
        <Tab.Screen name="MiPerfil" component={MiPerfil} options={{
          headerShown:false, 
          tabBarShowLabel:false,
          tabBarIcon:()=>(
            <Image  style={{height:30, width:30}} source={{uri:"data:image/png;base64,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"}}/>
          )
          }}/>
    </Tab.Navigator>

  )  
  
}

const styles=StyleSheet.create({
  fondoVerde:{
  backgroundColor:"#D9ED92",
  flex:1
  },
  bannerPaciente:{
    backgroundColor:"#76C893",
    textAlign:'center', 
    fontSize:35, 
    color:"white",
    fontFamily:"Serif-Sans", 
    fontWeight:"600", 
    padding:30
  },
 
  container: {
    flex: 1,
    padding: 16,
    justifyContent:"center"
  },
  registroDiario:{
    fontSize:15, 
    color:"black",
    textAlign:"center",
    borderRadius:10,
    backgroundColor:"white",
    padding:15,
    margin:5,
    
}
})
