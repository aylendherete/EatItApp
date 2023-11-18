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
          <Text style={styles.bannerNutricionista}>Nutricionista</Text>
        </View>
        <View style={{flex:4}}>
          <ScrollView>
            <View style={styles.botonNotificacion}>
              <Text style={styles.textoBotonNotificacion}>
                ¡Paciente 1 quiere iniciar un plan con vos!
              </Text>
              <View style={{flexDirection:"row", margin:10}}> 
                <TouchableOpacity style={{backgroundColor:"#3B8D77",borderRadius:10, color:"white", fontWeight:"bold", marginRight:10}}><Text style={styles.textoBotonNotificacion}>Aceptar</Text></TouchableOpacity>
                <TouchableOpacity  style={{backgroundColor:"#3B8D77",borderRadius:10, color:"white", fontWeight:"bold"}}><Text style={styles.textoBotonNotificacion}>Rechazar</Text></TouchableOpacity>
              </View>
              
            </View>
            <View><TouchableOpacity onPress={()=>props.navigation.navigate('AnalisisRegistroPaciente')} style={styles.botonNotificacion}><Text style={styles.textoBotonNotificacion}>¡El Paciente1 ha  hecho un registro nuevo!</Text></TouchableOpacity></View>
            <View><TouchableOpacity onPress={()=>props.navigation.navigate('AnalisisRegistroPaciente')} style={styles.botonNotificacion}><Text style={styles.textoBotonNotificacion}>¡El Paciente1 ha  hecho un registro nuevo!</Text></TouchableOpacity></View>
            <View style={styles.botonNotificacion}>
              <Text style={styles.textoBotonNotificacion}>
                ¡Paciente 1 quiere iniciar un plan con vos!
              </Text>
              <View style={{flexDirection:"row", margin:10}}> 
                <TouchableOpacity style={{backgroundColor:"#3B8D77",borderRadius:10, color:"white", fontWeight:"bold", marginRight:10}}><Text style={styles.textoBotonNotificacion}>Aceptar</Text></TouchableOpacity>
                <TouchableOpacity  style={{backgroundColor:"#3B8D77",borderRadius:10, color:"white", fontWeight:"bold"}}><Text style={styles.textoBotonNotificacion}>Rechazar</Text></TouchableOpacity>
              </View>
              
            </View>
            <View><TouchableOpacity onPress={()=>props.navigation.navigate('AnalisisRegistroPaciente')} style={styles.botonNotificacion}><Text style={styles.textoBotonNotificacion}>¡El Paciente1 ha  hecho un registro nuevo!</Text></TouchableOpacity></View>
            <View><TouchableOpacity onPress={()=>props.navigation.navigate('AnalisisRegistroPaciente')} style={styles.botonNotificacion}><Text style={styles.textoBotonNotificacion}>¡El Paciente1 ha  hecho un registro nuevo!</Text></TouchableOpacity></View>
            <View><TouchableOpacity onPress={()=>props.navigation.navigate('AnalisisRegistroPaciente')} style={styles.botonNotificacion}><Text style={styles.textoBotonNotificacion}>¡El Paciente1 ha  hecho un registro nuevo!</Text></TouchableOpacity></View>
            <View><TouchableOpacity onPress={()=>props.navigation.navigate('AnalisisRegistroPaciente')} style={styles.botonNotificacion}><Text style={styles.textoBotonNotificacion}>¡El Paciente1 ha  hecho un registro nuevo!</Text></TouchableOpacity></View>
            <View><TouchableOpacity onPress={()=>props.navigation.navigate('AnalisisRegistroPaciente')} style={styles.botonNotificacion}><Text style={styles.textoBotonNotificacion}>¡El Paciente1 ha  hecho un registro nuevo!</Text></TouchableOpacity></View>
            <View><TouchableOpacity onPress={()=>props.navigation.navigate('AnalisisRegistroPaciente')} style={styles.botonNotificacion}><Text style={styles.textoBotonNotificacion}>¡El Paciente1 ha  hecho un registro nuevo!</Text></TouchableOpacity></View>
            <View><TouchableOpacity onPress={()=>props.navigation.navigate('AnalisisRegistroPaciente')} style={styles.botonNotificacion}><Text style={styles.textoBotonNotificacion}>¡El Paciente1 ha  hecho un registro nuevo!</Text></TouchableOpacity></View>
            <View><TouchableOpacity onPress={()=>props.navigation.navigate('AnalisisRegistroPaciente')} style={styles.botonNotificacion}><Text style={styles.textoBotonNotificacion}>¡El Paciente1 ha  hecho un registro nuevo!</Text></TouchableOpacity></View>
            <View><TouchableOpacity onPress={()=>props.navigation.navigate('AnalisisRegistroPaciente')} style={styles.botonNotificacion}><Text style={styles.textoBotonNotificacion}>¡El Paciente1 ha  hecho un registro nuevo!</Text></TouchableOpacity></View>
            <View><TouchableOpacity onPress={()=>props.navigation.navigate('AnalisisRegistroPaciente')} style={styles.botonNotificacion}><Text style={styles.textoBotonNotificacion}>¡El Paciente1 ha  hecho un registro nuevo!</Text></TouchableOpacity></View>
            
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
        margin:10,
        fontFamily:"Serif-Sans", 
        fontWeight:"700",
        color:"white"
    }
  })
  