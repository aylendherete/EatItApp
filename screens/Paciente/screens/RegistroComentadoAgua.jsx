import React,{useState,useEffect} from 'react';
import {StyleSheet,Text,View,Image,FlatList} from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { format } from 'date-fns';

export const RegistroComentadoAgua =(props)=>{

  const [comentarios, setComentarios] = useState([]);
  const registro  = props.route.params.registro;

  const obtenerComentarios = async () => {
    try {
      let response = await fetch(`http://localhost:3000/comentario/getComentariosRegistroAgua?idRegistro=${registro.id}`);
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


    return(
        <View style={styles.fondoVerde}>
            <View>
            <Text style={styles.bannerPaciente}>Paciente</Text>
            </View>
            <View style={{flex:4}}>
              <View>
                <View>
                  <View  style={{backgroundColor:"white", margin:15,borderRadius:10,padding:15, alignItems: "center", justifyContent: "center",alignItems:"stretch", borderRadius:40}}>
                    <View style={{flexDirection: "row",alignItems: "center",justifyContent: "space-between",}}>
                      <Text style={styles.textoFechaRegistro}>{format(registro.hora, 'dd/MM/yyyy HH:mm')}</Text>
                      <Image style={{width:50, height:50}}source={{uri: "data:image/png;base64,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"}}></Image>

                    </View>
                  </View>
                </View>
                  
              </View>

              <ScrollView>
                <View > 
                  
                  <View style={{ backgroundColor:"#52B69A", padding:10,textAlign:'center', margin:10, borderRadius:5}}>
                    <Text style={styles.textoRegistroPaciente}> Cantidad vasos: {registro.cantidadVasos}</Text> 
                  
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