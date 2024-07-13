import React,{useState,useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,FlatList
} from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';

import { format } from 'date-fns';


export const RegistroComentado =(props)=>{

  const [comentarios, setComentarios] = useState([]);
  const { registro } = props.route.params;

  const obtenerComentarios = async () => {
    try {
      let response = await fetch(`http://localhost:3000/comentario/getComentariosRegistroComida?idRegistro=${registro.id}`);
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
                <View  style={{backgroundColor:"white", margin:25,borderRadius:10,padding:15, alignItems: "center", justifyContent: "center",alignItems:"stretch", borderRadius:40}}>
                  <View style={{flexDirection: "row",alignItems: "center",justifyContent: "space-between",}}>
                    <Text style={styles.textoFechaRegistro}>{format(registro.hora, 'dd/MM/yyyy HH:mm')}</Text>
                    <Image style={{width:50, height:50,}}source={{uri: "data:image/png;base64,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"}}></Image>

                  </View>
                </View>
                 
              </View>

              <ScrollView>
                <View > 
                 
                  <View style={{ backgroundColor:"#52B69A", padding:10,textAlign:'center', margin:10, borderRadius:5}}>
                    <Text style={styles.textoRegistroPaciente}>{registro.descripcion}</Text> 
                    <View>
                    {registro.foto&&
                      <View style={{alignItems:"center", justifyContent:"center"}}>
                      <Image source={{uri:(registro.foto)}} style={{alignSelf: 'center', width: 300, height: 300, borderWidth: 2,borderColor: 'white', borderRadius:15, margin:5}}/></View>} 
                 
                    </View> 
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