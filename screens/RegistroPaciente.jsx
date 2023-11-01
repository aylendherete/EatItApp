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
  TouchableOpacity,
  TextInput,
  ScrollView
} from 'react-native';




export const RegistroPaciente=(props)=> {

  return(
    
  <View style={styles.fondoVerde}>
    <View style={styles.fondoVerde}>
      <Text style={styles.textoTipoRegistro}>Soy paciente</Text>
    </View>
    <View style={styles.fondoVerdeClaro}>
        <ScrollView>
        <View style={styles.inputRegistro}>
          <TextInput placeholder="  Nombre" placeholderTextColor={"white"}></TextInput>
        </View>
        
        <View style={styles.inputRegistro}>
          <TextInput placeholder="  Apellido" placeholderTextColor={"white"}></TextInput>
        </View>
        <View style={styles.inputRegistro}>
          <TextInput placeholder="  E-mail" placeholderTextColor={"white"}></TextInput>
        </View>
        <View style={styles.inputRegistro}>
          <TextInput keyboardType="number-pad" placeholder="  M.N del nutricionista" placeholderTextColor={"white"}></TextInput>
        </View>
        <View style={styles.inputRegistro}>
          <TextInput keyboardType="number-pad" placeholder="  Telefono" placeholderTextColor={"white"}></TextInput>
        </View>
        <View style={styles.inputRegistro}>
          <TextInput secureTextEntry placeholder="  Contraseña" placeholderTextColor={"white"}></TextInput>
        </View>
        <View style={styles.inputRegistro}>
          <TextInput  secureTextEntry placeholder="  Confirmar contraseña" placeholderTextColor={"white"}></TextInput>
        </View>
        <View style={styles.inputRegistro}>
          <TextInput  keyboardType="number-pad" placeholder="  Peso" placeholderTextColor={"white"}></TextInput>
        </View>
        <View style={styles.inputRegistro}>
          <TextInput placeholder="  Escribir objetivo" placeholderTextColor={"white"}></TextInput>
        </View>
        <View style={styles.inputRegistro}>
          <TextInput  secureTextEntry placeholder="  Antecedentes" placeholderTextColor={"white"}></TextInput>
        </View>
        <View style={styles.botonRegistrarme}>
          <TouchableOpacity onPress={()=>props.navigation.navigate('Inicio')}>
            <Text style={styles.textoBotonRegistrarme}>Registrarme</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
       
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
  botonRegistrarme:{
    justifyContent:"center",
    margin:20,
    marginBottom:120
  },
  textoBotonRegistrarme:{
    textAlign:"center", 
    fontSize:30,
    fontFamily:"Serif-Sans",
    color:"white",
    fontWeight:'bold',
    backgroundColor:"#52B69A",
    borderRadius:20,
    padding:15
  },
  inputRegistro:{
    backgroundColor:"#B5E48C",
    borderRadius:20,
    flex:0.3,
    margin:10
  },
  textoTipoRegistro:{
    textAlign:"center",
    fontSize:30,
    fontFamily:"Serif-Sans",
    color:"white",
    fontWeight:'bold',
    marginTop:100
  }
})