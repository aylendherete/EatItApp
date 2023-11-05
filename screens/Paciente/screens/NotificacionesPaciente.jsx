import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView
} from 'react-native';

export const NotificacionesPaciente=(props)=>{
    return(
      <View style={styles.fondoVerde}>
        <View>
          <Text style={styles.bannerPaciente}>Paciente</Text>
        </View>
        <View style={{flex:4}}>
          <ScrollView>
            <View><TouchableOpacity onPress={()=>props.navigation.navigate('RegistroComentado')} style={styles.botonNotificacion}><Text style={styles.textoBotonNotificacion}>Tu nutricionista hizo un comentario en uno de tus registros del dia 09/02/2023</Text></TouchableOpacity></View>
            <View><TouchableOpacity onPress={()=>props.navigation.navigate('RegistroComentado')} style={styles.botonNotificacion}><Text style={styles.textoBotonNotificacion}>Tu nutricionista hizo un comentario en uno de tus registros del dia 09/02/2023</Text></TouchableOpacity></View>
            <View><TouchableOpacity onPress={()=>props.navigation.navigate('RegistroComentado')} style={styles.botonNotificacion}><Text style={styles.textoBotonNotificacion}>Tu nutricionista hizo un comentario en uno de tus registros del dia 09/02/2023</Text></TouchableOpacity></View>
            <View><TouchableOpacity onPress={()=>props.navigation.navigate('RegistroComentado')} style={styles.botonNotificacion}><Text style={styles.textoBotonNotificacion}>Tu nutricionista hizo un comentario en uno de tus registros del dia 09/02/2023</Text></TouchableOpacity></View>
            <View><TouchableOpacity onPress={()=>props.navigation.navigate('RegistroComentado')} style={styles.botonNotificacion}><Text style={styles.textoBotonNotificacion}>Tu nutricionista hizo un comentario en uno de tus registros del dia 09/02/2023</Text></TouchableOpacity></View>
            <View><TouchableOpacity onPress={()=>props.navigation.navigate('RegistroComentado')} style={styles.botonNotificacion}><Text style={styles.textoBotonNotificacion}>Tu nutricionista hizo un comentario en uno de tus registros del dia 09/02/2023</Text></TouchableOpacity></View>
            <View><TouchableOpacity onPress={()=>props.navigation.navigate('RegistroComentado')} style={styles.botonNotificacion}><Text style={styles.textoBotonNotificacion}>Tu nutricionista hizo un comentario en uno de tus registros del dia 09/02/2023</Text></TouchableOpacity></View>
            <View><TouchableOpacity onPress={()=>props.navigation.navigate('RegistroComentado')} style={styles.botonNotificacion}><Text style={styles.textoBotonNotificacion}>Tu nutricionista hizo un comentario en uno de tus registros del dia 09/02/2023</Text></TouchableOpacity></View>
            <View><TouchableOpacity onPress={()=>props.navigation.navigate('RegistroComentado')} style={styles.botonNotificacion}><Text style={styles.textoBotonNotificacion}>Tu nutricionista hizo un comentario en uno de tus registros del dia 09/02/2023</Text></TouchableOpacity></View>
            <View><TouchableOpacity onPress={()=>props.navigation.navigate('RegistroComentado')} style={styles.botonNotificacion}><Text style={styles.textoBotonNotificacion}>Tu nutricionista hizo un comentario en uno de tus registros del dia 09/02/2023</Text></TouchableOpacity></View>
            <View><TouchableOpacity onPress={()=>props.navigation.navigate('RegistroComentado')} style={styles.botonNotificacion}><Text style={styles.textoBotonNotificacion}>Tu nutricionista hizo un comentario en uno de tus registros del dia 09/02/2023</Text></TouchableOpacity></View>
            <View><TouchableOpacity onPress={()=>props.navigation.navigate('RegistroComentado')} style={styles.botonNotificacion}><Text style={styles.textoBotonNotificacion}>Tu nutricionista hizo un comentario en uno de tus registros del dia 09/02/2023</Text></TouchableOpacity></View>
            <View><TouchableOpacity onPress={()=>props.navigation.navigate('RegistroComentado')} style={styles.botonNotificacion}><Text style={styles.textoBotonNotificacion}>Tu nutricionista hizo un comentario en uno de tus registros del dia 09/02/2023</Text></TouchableOpacity></View>
            <View><TouchableOpacity onPress={()=>props.navigation.navigate('RegistroComentado')} style={styles.botonNotificacion}><Text style={styles.textoBotonNotificacion}>Tu nutricionista hizo un comentario en uno de tus registros del dia 09/02/2023</Text></TouchableOpacity></View>
            <View><TouchableOpacity onPress={()=>props.navigation.navigate('RegistroComentado')} style={styles.botonNotificacion}><Text style={styles.textoBotonNotificacion}>Tu nutricionista hizo un comentario en uno de tus registros del dia 09/02/2023</Text></TouchableOpacity></View>
            <View><TouchableOpacity onPress={()=>props.navigation.navigate('RegistroComentado')} style={styles.botonNotificacion}><Text style={styles.textoBotonNotificacion}>Tu nutricionista hizo un comentario en uno de tus registros del dia 09/02/2023</Text></TouchableOpacity></View>
          </ScrollView>
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
    botonNotificacion:{
        backgroundColor:"#52B69A", 
        margin:10, 
        borderRadius:10, 
        padding:10
    },
    textoBotonNotificacion:{
        fontSize:15,
        margin:10,
        color:"white",
        fontFamily:"Serif-Sans", 
        fontWeight:"700"
    }
  })
  