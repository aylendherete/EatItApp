import React ,{useContext, useState, useEffect}from 'react';
import {StyleSheet,Text,View,TouchableOpacity,ScrollView,Image} from 'react-native';
import UserContext from '../../../context/userContext';
import { useIsFocused } from '@react-navigation/native';

export const MisPacientes=(props)=>{

  const { user } = useContext(UserContext);
  const [pacientes, setPacientes] = useState([]);
  const isFocused = useIsFocused();

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


  useEffect(() => {
    obtenerPacientes(); 
  }, [isFocused])


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
               <View style={{flexDirection: "row",alignItems: "center",alignContent:"stretch"}}>
            
                    <Image style={{width:50, height:50,margin:25}}source={{uri: "data:image/png;base64,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"}}></Image>

                    <Text style={styles.textoBotonNotificacion}>
                      {`${paciente.nombre} ${paciente.apellido}\nObjetivo: ${paciente.objetivo}`}
                    </Text>
              
                </View>
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
        margin:25, 
        borderRadius:30, 
        borderColor:"#76C893",
        borderWidth:2
    },
    textoBotonNotificacion:{
        fontSize:18,
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
  