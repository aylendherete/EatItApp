import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView
} from 'react-native';

export const MiPerfil=(props)=>{
    return(
        <View style={styles.fondoVerde}>
        <View>
          <Text style={styles.bannerNutricionista}>Paciente</Text>
        </View>
        <View style={{flex:4, justifyContent:"center"}}>
            <Text style={styles.textoNombreApellidoPerfil}>Nombre Apellido</Text>
            <Text style={styles.textoDescripcionPerfil}>Correo electronico: aaaa@gmail.com</Text>
            <Text style={styles.textoDescripcionPerfil}>Matricula Nacional: 111111</Text>
            <Text style={styles.textoDescripcionPerfil}>Telefono: 222222</Text>
            <TouchableOpacity  onPress={()=>props.navigation.navigate('Inicio')}><Text style={styles.botonCerrarSesion}>Cerrar Sesion</Text></TouchableOpacity>
        </View>
      </View>
    
      
    );
}

const styles=StyleSheet.create({
    fondoVerde:{
      backgroundColor:"#D9ED92",
      flex:1
    },
    bannerNutricionista:{
      backgroundColor:"#76C893",
      textAlign:'center', 
      fontSize:35, 
      color:"white",
      fontFamily:"Serif-Sans", 
      fontWeight:"600", 
      padding:30,
      color:"white"
    },
    textoNombreApellidoPerfil:{
        color:"#99D98C", 
        fontSize:35, 
        textAlign:"center"
    },
    textoDescripcionPerfil:{
        backgroundColor:"white", 
        color:"black", 
        fontWeight:"500", 
        fontSize:18, 
        padding:5, 
        margin:15, 
        borderRadius:20,
        textAlign:"center"
    },
    botonCerrarSesion:{
        color:"white",
        fontWeight:"bold",
        backgroundColor:"#52B69A",
        fontSize:25,
        textAlign:"center",
        margin:15,
        padding:25,
        borderRadius:25
    }
  })
  