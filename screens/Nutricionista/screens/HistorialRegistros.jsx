import React,{useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,FlatList
} from 'react-native';

import { format } from 'date-fns';


export const HistorialRegistros=({paciente})=>{
  const [registroPaciente, setRegistroPaciente] = useState(null);

  console.log(paciente)

  const obtenerRegistros = async () => {
    try {
      console.log("Obteniendo registros para el pacientw con id:", paciente.id); // Log adicional
      const response = await fetch(`http://localhost:3000/paciente/getRegistros?id=${paciente.id}`);
      if (response.ok) {
        const data = await response.json();
        console.log("Datos obtenidos:", data); // Log adicional
        setRegistroPaciente(data);
     
        
      } else {
        console.log("Error en la respuesta del servidor:", response.status); // Log adicional
      }
    } catch (e) {
      console.log('Error al obtener los registros del paciente:', e);
    }
  };

  useEffect(() => {
    obtenerRegistros();
    
  }, []);

  useEffect(() => {
    console.log("Registro Paciente actualizado:", registroPaciente);
    // Aquí puedes realizar cualquier acción adicional basada en registroPaciente
    
  }, [registroPaciente]);
    return(
        <View style={styles.fondoVerde}>
            <View>
            <Text style={styles.bannerNutricionista}>Nutricionista</Text>
            </View>
            <View style={{flex:4, justifyContent:"center"}}>
                <Text style={{color:"white", fontWeight:"200", fontSize:25, margin:10}}>Historial Registros</Text>
                <ScrollView>
 
                {registroPaciente && (
                  <>
                    <FlatList
                      data={registroPaciente.registrosAgua}
                      keyExtractor={(item) => item.id.toString()}
                      renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                          <Text style={{color:"black", fontWeight:"600", fontSize:16,}}>{format(item.hora, 'dd/MM/yyyy HH:mm')}</Text>
                          <Text style={{color:"black", fontWeight:"300", fontSize:15}}>Vasos de agua: {item.cantidadVasos} {"("}{item.cantidadVasos * 250} ml{")"}</Text>
                        </View>
                      )}
                    />

                    <FlatList
                      data={registroPaciente.registrosActividad}
                      keyExtractor={(item) => item.id.toString()}
                      renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                          <Text style={{color:"black", fontWeight:"600", fontSize:16}}>{format(item.horaInicio, 'dd/MM/yyyy HH:mm')}</Text>
                          <Text style={{color:"black", fontWeight:"300", fontSize:15}}>Descripción: {item.descripcion}</Text>
                          <Text style={{color:"black", fontWeight:"300", fontSize:15}}>Tiempo Total: {item.tiempoTotal}</Text>
                        </View>
                      )}
                    />

                    <FlatList
                      data={registroPaciente.registrosComida}
                      keyExtractor={(item) => item.id.toString()}
                      renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                          <Text style={{color:"black", fontWeight:"600", fontSize:16,}}>{format(item.hora, 'dd/MM/yyyy HH:mm')}</Text>
                          <Text style={{color:"black", fontWeight:"300", fontSize:15}}>Descripción: {item.descripcion}</Text>
                          
                        </View>
                      )}
                    />
                  </>
                )}

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
      fontFamily:"Serif-Sans", 
      fontWeight:"600", 
      padding:30,
      color:"white"
    }, itemContainer: {
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 15,
      marginVertical: 5,
      margin:10
    },
  })