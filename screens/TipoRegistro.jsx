/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

export const TipoRegistro=(props)=>{
    return(
    
        <View style={styles.fondoVerde}>
          <View style={styles.fondoVerde}></View>
          <View style={styles.fondoVerdeClaro}>
            <View style={styles.botonTipo}><TouchableOpacity onPress={()=>props.navigation.navigate('RegistroNutricionista')}><Text style={styles.textoTipo}>Soy nutricionista</Text></TouchableOpacity></View>
            <View style={styles.botonTipo}><TouchableOpacity onPress={()=>props.navigation.navigate('ElegirNutricionista')}><Text style={styles.textoTipo}>Soy paciente</Text></TouchableOpacity></View>  
          </View>
            
        </View>
        );
}


const styles=StyleSheet.create({
  fondoVerde:{
    backgroundColor:"#99D98C", 
    flex:1
  },
 
  fondoVerdeClaro:{
    backgroundColor:"#D9ED92",
    flex:3,borderTopLeftRadius:120,
    borderTopRightRadius:120,
    justifyContent:"center"
    
  },
  botonTipo:{
    justifyContent:"center",
    margin:5,
  },
  textoTipo:{
    textAlign:"center", 
    fontSize:25,
    fontFamily:"Serif-Sans", 
    color:"white", 
    fontWeight:'bold', 
    backgroundColor:"#99D98C", 
    borderRadius:20, 
    margin:5,
    padding:15
  }
})
