/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React ,{useContext}from 'react';
import {
  StyleSheet,
  Text,
  View, Image, TouchableOpacity
} from 'react-native';

import UserContext from '../context/userContext';


export const CartelSolicitud=(props)=>{
    const {user,setUser}= useContext(UserContext)

    const logOut=()=>{
        setUser(null)

        console.log(user)
        return props.navigation.navigate("Inicio");
    }
    console.log(user)
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
          <View style={styles.fondoVerdeClaro}>
            <View style={{backgroundColor:"#52B69A",opacity:0.9, borderRadius:10, justifyContent:"center", padding:10, alignItems:"center", margin:30}}>
                <Text style={{fontSize:35, fontWeight:"800", color:"white", justifyContent:"center", textAlign:"center",padding:10}}>¡Ya le enviamos al nutricionista la solicitud!</Text>
                <Text style={{fontSize:16, fontWeight:"300", color:"white", justifyContent:"center", textAlign:"center",padding:10}}>En el caso de que rechace la solicitud deberas volver a elegir otro nutricionista</Text>
                <TouchableOpacity style={{backgroundColor:"#32A09B", padding:10, borderRadius:10}} onPress={logOut}><Text style={{justifyContent:"center", fontSize:25,color:"white", fontWeight:"800"}}>Cerrar Sesión</Text></TouchableOpacity>
            </View>

          </View>
            
        </View>
    );
}


const styles=StyleSheet.create({
  fondoVerde:{
    backgroundColor:"#99D98C", 
    flex:1,
    justifyContent:"center"
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
