import React ,{useContext, useState, useEffect}from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import UserContext from '../../../context/userContext';


export const MisPacientes=(props)=>{

  const { user } = useContext(UserContext);

  const [pacientes, setPacientes] = useState([]);

 
  useEffect(() => {
    obtenerPacientes(); 
  }, [])

  const obtenerPacientes = async () => {
    try {
      console.log("Matrícula del nutricionista:", user.matriculaNacional);
      const response = await fetch(`http://localhost:3000/nutricionista/obtenerPacientes?matriculaNacional=${user.matriculaNacional}`);
      
      if (response.ok) {
        const data = await response.json();
        setPacientes(data);
        console.log("Datos de pacientes:", data);
      }

    } catch (error) {
      console.error('Error al obtener pacientes:', error);
    }
  };


  return(
    <View style={styles.fondoVerde}>
      <View>
        <Text style={styles.bannerNutricionista}>Nutricionista</Text>
      </View>
      <View style={{flex:4}}>
        <Text style={styles.textoMisPacientes}>Mis Pacientes</Text>
        <ScrollView>
          {pacientes.map((paciente) => (
            <TouchableOpacity
              key={paciente.id}
              onPress={() =>
                //props.navigation.navigate('PerfilPaciente')
               props.navigation.navigate('PerfilPaciente', {paciente})
              }
              style={styles.botonNotificacion}
            >
              <Text style={styles.textoBotonNotificacion}>
                {`${paciente.nombre} ${paciente.apellido}\nObjetivo: ${paciente.objetivo}`}
              </Text>
            </TouchableOpacity>
          ))}
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
        margin:15,
        fontFamily:"Serif-Sans", 
        fontWeight:"700",
        color:"white"
    },
    textoMisPacientes:{
        color:"#99D98C", 
        fontWeight:"400",
        margin:25, 
        textAlign:"left",
        fontSize:40 
    }
  })
  