import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList
} from 'react-native';

import UserContext from '../../../context/userContext';

export const NotificacionesPaciente = (props) => {
  const { user } = useContext(UserContext);

  const [notificaciones, setNotificaciones] = useState([]);
  const [nombres, setNombres] = useState({});

  const obtenerNombreNotificaciones = async (id) => {
    let nombrePaciente = await fetch('http://localhost:3000/paciente/getNombrePaciente?id=' + id);
    if (nombrePaciente.ok) {
      nombrePaciente = await nombrePaciente.json();
      console.log(nombrePaciente.apellido);
      return { nombre: nombrePaciente.nombre, apellido: nombrePaciente.apellido };
    }
  }

  const obtenerNotificaciones = async () => {
    try {
      let response = await fetch(`http://localhost:3000/notificacionesNutricionista/notificaciones?matriculaNacional=${user.matriculaNacional}`);
      if (response.ok) {
        let data = await response.json();
        setNotificaciones(data);

        let nombresPromises = data.map(item => {
          return obtenerNombreNotificaciones(item.idSolicitud); // Aquí retornamos la promesa directamente
        });

        let nombresResult = await Promise.all(nombresPromises);

        let nombresMap = {};
        data.forEach((item, index) => {
          nombresMap[item.idSolicitud] = nombresResult[index]; // Usamos idSolicitud como clave en el mapa
        });

        setNombres(nombresMap);
      } else {
        console.error('Error al obtener notificaciones:', response.statusText);
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };


  const rechazarSolicitud=async(id)=>{

    console.log("ID A RECHAZAR"+id)
    try{
      const solicitud= await fetch("http://localhost:3000/paciente/rechazarSolicitud?id="+id)

     
      if (solicitud.ok ){
        console.log("se rechazó solicitud")
        await solicitud.json()
        
        return props.navigation.navigate("NotificacionesNutricionista");
        
      }
    }
    catch(e){
      console.log(e);
    }
  }

  const asociarPaciente = async (id, mn) => {


    console.log("Usuario"+ id+" MN"+ mn)
    try {

      const asociacion = await fetch('http://localhost:3000/paciente/asociarPacienteANutricionista?id='+id+'+&matriculaNacional='+mn, {
        method: 'POST',
      });     
      if (asociacion.ok) {
        let data = await asociacion.json();
        console.log("asocia");
        return props.navigation.navigate("NotificacionesNutricionista")
      }
    } catch (e) {
      console.log(e);
    }
  }


  useEffect(() => {
    obtenerNotificaciones();
  }, []);

  return (
    <View style={styles.fondoVerde}>
      <View>
        <Text style={styles.bannerNutricionista}>Nutricionista</Text>
      </View>
      <View style={{ flex: 4 }}>
        <FlatList
          data={notificaciones}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={
            <View>
              <Text>No tienes notificaciones </Text>
            </View>
          }
          renderItem={({ item }) =>
            <ScrollView style={{ flex: 1 }}>
              <View style={styles.botonNotificacion}>
                <Text style={styles.textoBotonNotificacion}>
                  ¡Paciente quiere iniciar un plan con vos!{' '}
                  {nombres[item.idSolicitud]?.nombre || ''}{' '}
                  {nombres[item.idSolicitud]?.apellido || ''}
                </Text>
                <View style={{ flexDirection: "row", margin: 10 }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#3B8D77",
                      borderRadius: 10,
                      color: "white",
                      fontWeight: "bold",
                      marginRight: 10
                    }}
                    onPress={() => asociarPaciente(item.idSolicitud, user.matriculaNacional)}
                  >
                    <Text style={styles.textoBotonNotificacion}>Aceptar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#3B8D77",
                      borderRadius: 10,
                      color: "white",
                      fontWeight: "bold"
                    }}
                  
                    onPress={() => rechazarSolicitud(item.idSolicitud)}
                  >
                    <Text style={styles.textoBotonNotificacion}>Rechazar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          }
        />
        <ScrollView>
          <View>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('AnalisisRegistroPaciente')}
              style={styles.botonNotificacion}
            >
              <Text style={styles.textoBotonNotificacion}>
                ¡El Paciente1 ha hecho un registro nuevo!
              </Text>
            </TouchableOpacity>
          </View>
         
         
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fondoVerde: {
    backgroundColor: "#D9ED92",
    flex: 1
  },
  bannerNutricionista: {
    backgroundColor: "#76C893",
    textAlign: 'center',
    fontSize: 35,
    color: "white",
    fontFamily: "Serif-Sans",
    fontWeight: "600",
    padding: 30
  },
  botonNotificacion: {
    backgroundColor: "#52B69A",
    margin: 10,
    borderRadius: 10,
    padding: 10
  },
  textoBotonNotificacion: {
    fontSize: 15,
    margin: 10,
    fontFamily: "Serif-Sans",
    fontWeight: "700",
    color: "white"
  }
});
