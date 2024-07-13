import React,{useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,Image,
  ScrollView
} from 'react-native';

import UserContext from '../../../context/userContext';

export const MiPerfil=(props)=>{
  const { user } = useContext(UserContext);

    return(
        <View style={styles.fondoVerde}>
        <View>
          <Text style={styles.bannerNutricionista}>Nutricionista</Text>
        </View>
        <View style={{flex:4, justifyContent:"center"}}>
            <Image style={{width:120, height:120, alignSelf:"center"}}source={{uri: "data:image/png;base64,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"}}></Image>

            <Text style={styles.textoNombreApellidoPerfil}>{user.nombre} {user.apellido}</Text>
            <Text style={styles.textoDescripcionPerfil}>Correo electronico: {user.email}</Text>
            <Text style={styles.textoDescripcionPerfil}>Matricula Nacional:{user.matriculaNacional} </Text>
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
  