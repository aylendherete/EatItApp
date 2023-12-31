import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';



export const RegistroComentado =(props)=>{
    
    return(
        <View style={styles.fondoVerde}>
            <View>
            <Text style={styles.bannerPaciente}>Paciente</Text>
            </View>
            <View style={{flex:4}}>
              <View>
                 
                  <Text style={styles.textoFechaRegistro}>Registros del día 3 de septiembre</Text>
              </View>

              <ScrollView>
                <View > 
                  <Text style={styles.textoTipoRegistroPaciente}>Comida</Text>
                  <View style={{ backgroundColor:"#52B69A", padding:25,textAlign:'center', margin:20, borderRadius:5}}>
                    <Text style={styles.textoRegistroPaciente}>Milanesa con puré de papa {'\n'}13:30 hs</Text> 
                    <View>
                      <Image
                        source={require('../../imgs/milanga.jpeg')}
                        style={{alignSelf: 'center', width: 280, height: 200, borderWidth: 1,borderColor: 'black'}}

                      />
                    </View> 
                  </View>
    
                </View>
                <View>
                  <Text style={styles.comentarioRegistro}> Nutricionista: Añadir mas fruta!</Text>
                </View>
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
    textoFechaRegistro:{
      color:"black",
      fontSize:20,
      textAlign:"left",
      margin:15,
      fontWeight:"600"
    },
    textoTipoRegistroPaciente:{
      fontSize:45,
      textAlign:"left",
      color:"#99D98C",
      margin:10
    },
    textoRegistroPaciente:{
      backgroundColor:"#52B69A",
      color:"black",
      fontWeight:"600",
      padding:25,
      textAlign:'center',
      fontSize:20,
      margin:20,
      borderRadius:5
    },
    comentarioRegistro:{
        backgroundColor:"white",

        color:"black",
        fontSize:15,
        padding:15,
        margin:25,
        borderRadius:15,
        textAlign:"center",
        fontWeight:"500"
    }
    
  })