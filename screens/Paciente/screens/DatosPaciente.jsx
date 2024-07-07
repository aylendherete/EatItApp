import React , {useEffect, useState, useContext}from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,FlatList,ScrollView
} from 'react-native';

import { format } from 'date-fns';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import UserContext from '../../../context/userContext';

const Tab = createMaterialTopTabNavigator();

export const  DatosPaciente=(props)=>{
  const [registroPaciente, setRegistroPaciente] = useState(null);
  const { user } = useContext(UserContext);

  const obtenerRegistros = async () => {
    try {
      console.log("Obteniendo registros para el usuario con id:", user.id); // Log adicional
      const response = await fetch(`http://localhost:3000/paciente/getRegistros?id=${user.id}`);
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
        
      <View style={{flex:3}}>
        
      <View style={styles.container}>
      <Text style={{ color: "white", fontWeight: "200", fontSize: 25, margin: 10 }}>Historial Comentarios</Text>

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
   
    container: {
      flex: 1,
      
      justifyContent:"center"
    },
    registroDiario:{
      fontSize:15, 
      color:"black",
      textAlign:"center",
      borderRadius:10,
      backgroundColor:"white",
      padding:15,
      margin:5,
      
  }, itemContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
  },
})
