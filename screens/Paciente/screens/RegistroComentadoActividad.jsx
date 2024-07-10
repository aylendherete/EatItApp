import React,{useState,useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,FlatList
} from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';

import { format } from 'date-fns';


export const RegistroComentadoActividad =(props)=>{

  const [comentarios, setComentarios] = useState([]);
  const { registro } = props.route.params;

  const obtenerComentarios = async () => {
    try {
      let response = await fetch(`http://localhost:3000/comentario/getComentariosRegistroActividad?idRegistro=${registro.id}`);
      if (response.ok) {
        let data = await response.json();
        setComentarios(data);
      }

    } catch (error) {
      console.error('Error de red:', error);
    }
  };
  useEffect(() => {
    obtenerComentarios();
  }, []);

  console.log(registro)
    return(
        <View style={styles.fondoVerde}>
            <View>
            <Text style={styles.bannerPaciente}>Paciente</Text>
            </View>
            <View style={{flex:4}}>
              <View>
                 
                  <Text style={styles.textoFechaRegistro}>Registros del día  {format(registro.horaInicio, 'dd/MM/yyyy HH:mm')}</Text>
              </View>

              <ScrollView>
                <View > 
                  <Text style={styles.textoTipoRegistroPaciente}>Actividad</Text>
                  <View style={{ backgroundColor:"#52B69A", padding:25,textAlign:'center', margin:20, borderRadius:5}}>
                    <Text style={styles.textoRegistroPaciente}>{registro.descripcion}</Text> 
                    <Text style={styles.textoRegistroPaciente}>{registro.tiempoTotal}</Text> 
                  </View>
    
                </View>
                <View>
                <FlatList
                  data={comentarios}
                  keyExtractor={(item) => item.id.toString()}
                 
                  renderItem={({ item }) => (
                    <ScrollView style={{ flex: 1 }}>
                      {item && (
                          <Text style={styles.comentarioRegistro}> {item.stringComentario}</Text>
                      )}
                      
                    </ScrollView>
                  )}
                />
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