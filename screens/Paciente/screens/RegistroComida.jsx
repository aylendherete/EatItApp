import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

export const RegistroComida=(props)=>{
    return(
      <View style={styles.fondoVerde}>
        <View>
          <Text style={styles.bannerPaciente}>Paciente</Text>
        </View>
        <View style={{flex:4}}>
          <View>
            <Text style={styles.tipoRegistroComida}>TIPO DE REGISTRO</Text>
          </View>
          <View>
            <View><TouchableOpacity style={styles.botonTipoRegistroComida} onPress={()=>props.navigation.navigate('RegistroTipoComida')}><Text style={styles.textoBotonTipoRegistroComida}>COMIDA</Text></TouchableOpacity></View>
            <View><TouchableOpacity style={styles.botonTipoRegistroComida} onPress={()=>props.navigation.navigate('RegistroTipoAgua')}><Text style={styles.textoBotonTipoRegistroComida}>AGUA</Text></TouchableOpacity></View>
            <View><TouchableOpacity style={styles.botonTipoRegistroComida} onPress={()=>props.navigation.navigate('RegistroTipoActividad')}><Text style={styles.textoBotonTipoRegistroComida}>ACTIVIDAD</Text></TouchableOpacity></View>

          </View>
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
  tipoRegistroComida:{
    backgroundColor:"#52B69A", 
    color:"black", 
    fontWeight:"bold", 
    margin:40,
    padding:20, 
    textAlign:"center", 
    fontSize:25, 
    borderRadius:10
  },
  botonTipoRegistroComida:{
    backgroundColor:"white", 
    margin:35, 
    padding:10, 
    borderRadius:30
  },
  textoBotonTipoRegistroComida:{
    color:"black", 
    textAlign:"center",
    fontSize:20, 
    fontWeight:"600"
  }
})
