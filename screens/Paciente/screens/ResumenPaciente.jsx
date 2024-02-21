import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';


import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { DatosPaciente } from './DatosPaciente';
import { TurnosPaciente } from './TurnosPaciente';


const Tab = createMaterialTopTabNavigator();

export const ResumenPaciente=(props)=>{
    return(
        <View style={styles.fondoVerde}>
            <View>
            <Text style={styles.bannerPaciente}>Paciente</Text>
            </View>
            <View style={{flex:4}}>
            
                <View style={styles.container}>
                    <Tab.Navigator>
                        <Tab.Screen name="ResumenPaciente" component={ResumenPaciente}/>
                        <Tab.Screen name="DatosPaciente" component={DatosPaciente}/>
                        <Tab.Screen name="TurnosPaciente" component={TurnosPaciente}/>
                    </Tab.Navigator>
                
                </View>

            </View>
        
        </View>
    );

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
