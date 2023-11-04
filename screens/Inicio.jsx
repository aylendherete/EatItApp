/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';


export const Inicio=(props)=> {
  const [email,setEmail]=React.useState("");
  const [contrasenia, setContrasenia]= React.useState("");
  console.log(JSON.stringify(props))

  async function handleLogin(email, contrasenia){

    try{
      const loginCheck= await fetch('http://localhost:3000/paciente/login?email='+email+'&contrasenia='+contrasenia)
      
    if (loginCheck.ok){
      let data= await loginCheck.json()
      if(data.esAdmin==false){
        console.log("es paciente")
      }
    }
    else{
      Alert.alert("No se encontro el usuario")
      console.log(loginCheck.status)
    }
  }
  catch(e){
    console.log(e);
  }
  }

  return(
    <View style={styles.fondoVerde}>
      <View style={styles.fondoVerde}></View>
      <View style={styles.fondoBlanco}>
        <Text style={styles.textoBienvenido}>¡Bienvenido!</Text>
        <View style={styles.textoInputInicioSesion}>
          <TextInput placeholder="  e-mail" placeholderTextColor={"black"} onChangeText={setEmail}></TextInput>
        </View>
        <View style={styles.textoInputInicioSesion}>
          <TextInput placeholder="  contraseña" placeholderTextColor={"black"} onChangeText={setContrasenia} secureTextEntry={true}></TextInput>
        </View>
        <TouchableOpacity onPress={()=>props.navigation.navigate('TipoRegistro')}><Text style={styles.textoRegistro}>¿No tienes una cuenta? Registrate</Text></TouchableOpacity>
        <View style={styles.botonIniciarSesion}><TouchableOpacity onPress={()=>handleLogin(email, contrasenia, props.loginFn)}><Text style={styles.textoBotonIniciarSesion}>Iniciar Sesion</Text></TouchableOpacity></View>
      </View>
      
    </View>
  );
}

const styles=StyleSheet.create({
  fondoVerde:{
    backgroundColor:'#99D98C',
    flex:1
  },
  fondoBlanco:{
    backgroundColor:'white',
    flex:3,borderTopLeftRadius:120,
    borderTopRightRadius:120
  },
  textoBienvenido:{
    textAlign:"center",
    fontSize:35,
    color:"black",
    fontWeight:'bold',
    marginTop:80
  },
  textoInputInicioSesion:{
    textAlign:"center",
    backgroundColor:"#DBDBDB",
    borderRadius:20,
    margin:20,
    color:"black"
  },
  textoRegistro:{
    color:"black",
    textAlign:"center",
    fontSize:15
  },
  botonIniciarSesion:{
    justifyContent:"center",
    margin:20,
    marginBottom:120
  },
  textoBotonIniciarSesion:{
    textAlign:"center", 
    fontSize:30,
    fontFamily:"Serif-Sans",
    color:"black",
    fontWeight:'bold',
    backgroundColor:"#99D98C",
    borderRadius:20,
    margin:15
  }
})
