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
                        <View  style={{backgroundColor:"white",borderColor:"#76C893",padding:15,margin:20,borderRadius:15,borderWidth:2,padding:15, marginVertical: 5, alignItems: "center", justifyContent: "center",alignItems:"stretch", borderRadius:25}}>
                          <View style={{flexDirection: "row",alignItems: "center",}}>
                            <Image style={{width:50, height:50,}}source={{uri: "data:image/png;base64,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"}}></Image>
    
                            <Text style={styles.comentarioRegistro}> {item.stringComentario}</Text>
                          </View>
                        </View>
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
        
      color:"black",
      fontSize:15,
      margin:5,
      textAlign:"center",
      fontWeight:"500"
    }
    
  })