import React,{useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import UserContext from '../../../context/userContext';

export const MiPerfil=(props)=>{
  const { user } = useContext(UserContext);
    return(
        <View style={styles.fondoVerde}>
        <View>
          <Text style={styles.bannerNutricionista}>Paciente</Text>
        </View>
        <View style={{flex:4, justifyContent:"center"}}>
            <Text style={styles.textoNombreApellidoPerfil}>{user.nombre} {user.apellido}</Text>
            <Text style={styles.textoDescripcionPerfil}>Correo electronico: {user.email}</Text>
            <Text style={styles.textoDescripcionPerfil}>Matricula Nacional: {user.matriculaNacionalNutricionista}</Text>
            <Text style={styles.textoDescripcionPerfil}>Telefono: {user.telefono}</Text>
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
  