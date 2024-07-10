import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,FlatList
} from 'react-native';

import { format } from 'date-fns';
import UserContext from '../../../context/userContext';

export const NotificacionesPaciente=(props)=>{
  const { user } = useContext(UserContext);
  const [notificaciones, setNotificaciones] = useState([]);

  const obtenerNotificaciones = async () => {
    try {
      let response = await fetch(`http://localhost:3000/notificacionesPaciente/getNotificaciones?idUsuario=${user.id}`);
      if (response.ok) {
        let data = await response.json();
        setNotificaciones(data);
      }

    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  useEffect(() => {
    obtenerNotificaciones();
  }, []);

  return(
    <View style={styles.fondoVerde}>
      <View>
        <Text style={styles.bannerPaciente}>Paciente</Text>
      </View>
      <View style={{flex:4}}>

      <FlatList
        data={notificaciones}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <View>
            <Text style={{ fontSize: 20, fontWeight: 500, textAlign: "center" }}>No tienes notificaciones</Text>
          </View>
        }
        renderItem={({ item }) => (
          <ScrollView style={{ flex: 1 }}>
            {item.idRegistroComidaPaciente && (
                <View><TouchableOpacity onPress={()=>props.navigation.navigate('RegistroComentado',{registro:item.registroComidaPaciente})} style={styles.botonNotificacion}
                ><Text style={styles.textoBotonNotificacion}>Tu nutricionista hizo un comentario en una comida {format(item.registroComidaPaciente.hora, 'dd/MM/yyyy HH:mm')} 
                </Text></TouchableOpacity>
                </View>
            )}

            {item.idRegistroActividadPaciente && (
                <View><TouchableOpacity onPress={()=>props.navigation.navigate('RegistroComentadoActividad',{registro:item.registroActividadPaciente})} style={styles.botonNotificacion}
                ><Text style={styles.textoBotonNotificacion}>Tu nutricionista hizo un comentario en una actividad{format(item.registroActividadPaciente.horaInicio, 'dd/MM/yyyy HH:mm')} 
                </Text></TouchableOpacity>
                </View>
            )}

            {item.idRegistroAguaPaciente&& (
                <View><TouchableOpacity onPress={()=>props.navigation.navigate('RegistroComentadoAgua',{registro:item.registroAguaPaciente})} style={styles.botonNotificacion}
                ><Text style={styles.textoBotonNotificacion}>Tu nutricionista hizo un comentario en agua {format(item.registroAguaPaciente.hora, 'dd/MM/yyyy HH:mm')} 
                </Text></TouchableOpacity>
                </View>
            )}
           

            
          </ScrollView>
        )}
      />
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
    botonNotificacion:{
        backgroundColor:"#52B69A", 
        margin:10, 
        borderRadius:10, 
        padding:10
    },
    textoBotonNotificacion:{
        fontSize:15,
        margin:10,
        color:"white",
        fontFamily:"Serif-Sans", 
        fontWeight:"700"
    }
  })
  