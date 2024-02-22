/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert, Image,
  
} from 'react-native';


export const Inicio=(props)=> {
  const [email,setEmail]=React.useState("");
  const [contrasenia, setContrasenia]= React.useState("");
  console.log(JSON.stringify(props))

  async function handleLogin(email, contrasenia){

    try{
      const loginCheckPaciente= await fetch('http://localhost:3000/paciente/login?email='+email+'&contrasenia='+contrasenia)
      const loginCheckNutricionista= await fetch('http://localhost:3000/nutricionista/login?email='+email+'&contrasenia='+contrasenia)

      if (loginCheckPaciente.ok ){
        let data= await loginCheckPaciente.json();
        console.log("entra paciente");
        if(data.enviarSolicitudNutricionista==false){
          return props.navigation.navigate("ElegirNutricionista");
        }
        else{
          return props.navigation.navigate("Paciente");
        }
        
      }else if(loginCheckNutricionista.ok){
        let data=await loginCheckNutricionista.json();
        console.log("entra nutricionista");
        return props.navigation.navigate("Nutricionista");

      }
      else{
        Alert.alert("No se encontro el usuario")
        console.log(loginCheckNutricionista.status)
      }
  }
  catch(e){
    console.log(e);
  }
  }

  return(
    <View style={styles.fondoVerde}>
      
      <View style={styles.fondoVerde}>
        <View style={{flex: 1,justifyContent: 'center',alignItems: 'center',}}>
          <Image
              source={require('./imgs/logo.png')} // Ruta de la imagen en la carpeta assets
              style={{alignSelf: 'center', width: 150, height: 150, marginTop:70}}
            />
        </View>
      </View>
      <View style={styles.fondoBlanco}>
        
        <Text style={styles.textoBienvenido}>¡Bienvenido!</Text>
        <View style={styles.textoInputInicioSesion}>
          <TextInput placeholder="  e-mail" placeholderTextColor={"black"} onChangeText={setEmail} color={"black"}></TextInput>
        </View>
        <View style={styles.textoInputInicioSesion}>
          <TextInput placeholder="  contraseña" placeholderTextColor={"black"} onChangeText={setContrasenia}  color={"black"} secureTextEntry={true}></TextInput>
        </View>
        <TouchableOpacity onPress={()=>props.navigation.navigate('TipoRegistro')}><Text style={styles.textoRegistro}>¿No tienes una cuenta? Registrate</Text></TouchableOpacity>
        <View style={styles.botonIniciarSesion}><TouchableOpacity onPress={()=>handleLogin(email, contrasenia)}><Text style={styles.textoBotonIniciarSesion}>Iniciar Sesion</Text></TouchableOpacity></View>
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
    margin:15,
    padding:20
  }
})
