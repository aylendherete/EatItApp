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
                <View  style={{backgroundColor:"white", margin:15,borderRadius:10,padding:15, alignItems: "center", justifyContent: "center",alignItems:"stretch", borderRadius:40}}>
                  <View style={{flexDirection: "row",alignItems: "center",justifyContent: "space-between",}}>
                    <Text style={styles.textoFechaRegistro}>{format(registro.horaInicio, 'dd/MM/yyyy HH:mm')}</Text>
               
                    <Image style={{width:50, height:50}}source={{uri: "data:image/png;base64,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"}}></Image>
                  </View>
                </View>
              </View>

              <ScrollView>
                <View > 
                  
                  <View style={{backgroundColor:"#52B69A", padding:10,textAlign:'center', margin:10, borderRadius:5}}>
                    <Text style={styles.textoRegistroPaciente}>Actividad: {registro.descripcion}</Text> 
                    <Text style={styles.textoRegistroPaciente}>Tiempo: {registro.tiempoTotal}</Text> 
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
    fontWeight:"600"
  },
  textoTipoRegistroPaciente:{
    fontSize:35,
    textAlign:"left",
    color:"#99D98C",
    margin:10
  },
  textoRegistroPaciente:{
    backgroundColor:"#52B69A",
    color:"white",
    fontWeight:"600",
    padding:15,
    textAlign:'center',
    fontSize:20,
    margin:10,
  },
  comentarioRegistro:{
      backgroundColor:"white",
      borderColor:"#76C893",
      borderWidth:2,
      color:"black",
      fontSize:15,
      padding:15,
      margin:20,
      borderRadius:15,
      textAlign:"center",
      fontWeight:"500"
  }
  
  })