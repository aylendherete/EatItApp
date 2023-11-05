import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView
} from 'react-native';

export const MisPacientes=(props)=>{
    return(
      <View style={styles.fondoVerde}>
        <View>
          <Text style={styles.bannerNutricionista}>Nutricionista</Text>
        </View>
        <View style={{flex:4}}>
            <Text style={styles.textoMisPacientes}>Mis Pacientes</Text>
          <ScrollView>
            <View><TouchableOpacity onPress={()=>props.navigation.navigate('PerfilPaciente')} style={styles.botonNotificacion}><Text style={styles.textoBotonNotificacion}>Nombre Apellido {'\n'}Objetivo: Ganar Peso</Text></TouchableOpacity></View>
            <View><TouchableOpacity onPress={()=>props.navigation.navigate('PerfilPaciente')} style={styles.botonNotificacion}><Text style={styles.textoBotonNotificacion}>Nombre Apellido {'\n'}Objetivo: Ganar Peso</Text></TouchableOpacity></View>
            <View><TouchableOpacity onPress={()=>props.navigation.navigate('PerfilPaciente')} style={styles.botonNotificacion}><Text style={styles.textoBotonNotificacion}>Nombre Apellido {'\n'}Objetivo: Ganar Peso</Text></TouchableOpacity></View>
            <View><TouchableOpacity onPress={()=>props.navigation.navigate('PerfilPaciente')} style={styles.botonNotificacion}><Text style={styles.textoBotonNotificacion}>Nombre Apellido {'\n'}Objetivo: Ganar Peso</Text></TouchableOpacity></View>
            <View><TouchableOpacity onPress={()=>props.navigation.navigate('PerfilPaciente')} style={styles.botonNotificacion}><Text style={styles.textoBotonNotificacion}>Nombre Apellido {'\n'}Objetivo: Ganar Peso</Text></TouchableOpacity></View>
            <View><TouchableOpacity onPress={()=>props.navigation.navigate('PerfilPaciente')} style={styles.botonNotificacion}><Text style={styles.textoBotonNotificacion}>Nombre Apellido {'\n'}Objetivo: Ganar Peso</Text></TouchableOpacity></View>
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
    bannerNutricionista:{
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
        margin:15,
        fontFamily:"Serif-Sans", 
        fontWeight:"700",
        color:"white"
    },
    textoMisPacientes:{
        color:"#99D98C", 
        fontWeight:"400",
        margin:25, 
        textAlign:"left",
        fontSize:40 
    }
  })
  