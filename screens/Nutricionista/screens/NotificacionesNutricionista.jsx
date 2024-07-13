import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList
} from 'react-native';


import { format , parseISO} from 'date-fns';
import UserContext from '../../../context/userContext';

export const NotificacionesPaciente = (props) => {
  const { user } = useContext(UserContext);

  const [notificaciones, setNotificaciones] = useState([]);
  const [nombres, setNombres] = useState({});

 

  const obtenerNombreNotificaciones = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/paciente/getNombrePaciente?id=${id}`);
      if (response.ok) {
        const nombrePaciente = await response.json();
        return { nombre: nombrePaciente.nombre, apellido: nombrePaciente.apellido };
      } else {
        console.error('Error al obtener nombre del paciente:', response.statusText);
        return { nombre: '', apellido: '' };
      }
    } catch (error) {
      console.error('Error de red:', error);
      return { nombre: '', apellido: '' };
    }
  }

  const obtenerNotificaciones = async () => {
    try {
      let response = await fetch(`http://localhost:3000/notificacionesNutricionista/notificaciones?matriculaNacional=${user.matriculaNacional}`);
      if (response.ok) {
        let data = await response.json();
        setNotificaciones(data);

        // Obtener nombres para todas las notificaciones que lo requieran
        let nombresPromises = data.map(item => {
          if (item.idSolicitud !== null) {
            return obtenerNombreNotificaciones(item.idSolicitud);
          } else if (item.idRegistroAguaPaciente !== null) {
            return obtenerNombreNotificaciones(item.registroAguaPaciente.pacienteId);
          } else if (item.idRegistroActividadPaciente !== null) {
            return obtenerNombreNotificaciones(item.registroActividadPaciente.pacienteId);
          } else if (item.idRegistroComidaPaciente !== null) {
            return obtenerNombreNotificaciones(item.registroComidaPaciente.pacienteId);
          }else if (item.idTurno !== null){
            return obtenerNombreNotificaciones(item.turnoPaciente.pacienteId);
          } else {
            return Promise.resolve({ nombre: '', apellido: '' });
          }
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

  const rechazarSolicitud = async (id) => {
    try {
      const solicitud = await fetch(`http://localhost:3000/paciente/rechazarSolicitud?id=${id}`);

      if (solicitud.ok) {
        console.log("Se rechazó la solicitud");
       
      } else {
        console.error('Error al rechazar la solicitud:', solicitud.statusText);
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  }

  const rechazarTurno= async (id)=>{
    console.log(id)
    try{
      const turno= await fetch("http://localhost:3000/turno/rechazarTurno?id="+id, {method:'POST'});
      if(turno.ok){
        console.log("SE RECHAZÓ TURNOOOOOOOOOO")
      }
    }catch(e){
      console.log(e)
    }
  }


  const aceptarTurno= async (id)=>{
    console.log(id)
    try{
      const turno= await fetch("http://localhost:3000/turno/aceptarTurno?id="+id, {method:'POST'});
      if(turno.ok){
        console.log("SE ACEPTO TURNOOOOOOOOOO")
      }
    }catch(e){
      console.log(e)
    }
  }

  const asociarPaciente = async (id, mn) => {
    try {
      const asociacion = await fetch(`http://localhost:3000/paciente/asociarPacienteANutricionista?id=${id}&matriculaNacional=${mn}`, {
        method: 'POST',
      });

      if (asociacion.ok) {
        console.log("Paciente asociado correctamente");
        setNotificaciones(prevNotificaciones => prevNotificaciones.filter(notif => notif.id !== id));
      } else {
        console.error('Error al asociar paciente:', asociacion.statusText);
      }
    } catch (error) {
      console.error('Error de red:', error);
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
              <Text style={{ fontSize: 20, fontWeight: 500, textAlign: "center" }}>No tienes notificaciones</Text>
            </View>
          }
          renderItem={({ item }) => (
            <ScrollView style={{ flex: 1 }}>
              {item.notificacionSolicitud && (
                <View style={styles.botonNotificacion}>
                  <Text style={styles.textoBotonNotificacion}>
                    ¡Paciente {' '}
                    {nombres[item.idSolicitud]?.nombre || ' '}{' '}
                    {nombres[item.idSolicitud]?.apellido || ''} quiere iniciar un plan contigo!
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
              )}
              {(item.turnoPaciente && item.turnoPaciente.turnoAceptado===null)&& (
                <View style={styles.botonNotificacion}>
                  <Text style={styles.textoBotonNotificacion}>
                    ¡
                    {nombres[item.idSolicitud]?.nombre || ''}{' '}
                    {nombres[item.idSolicitud]?.apellido || ' '} quiere un turno contigo
                    el día {format(item.turnoPaciente.horario,'dd/MM/yyyy HH:mm')}!
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
                      onPress={() => aceptarTurno(item.idTurno)}
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
                      onPress={() => rechazarTurno(item.idTurno)}
                    >
                      <Text style={styles.textoBotonNotificacion}>Rechazar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              {(item.turnoPaciente && item.turnoPaciente.turnoAceptado===false)&& (
                <View style={styles.botonNotificacion}>
                  <Text style={styles.textoBotonNotificacion}>
                    ¡
                    {nombres[item.idSolicitud]?.nombre || ''}{' '}
                    {nombres[item.idSolicitud]?.apellido || '  '}{' '} 
                    canceló un turno contigo el día {format(item.turnoPaciente.horario, 'dd/MM/yyyy HH:mm')}!
                  </Text>
                 </View> 
                )     
              }


              {item.idRegistroAguaPaciente && (
                <View>
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate('AnalisisRegistroPacienteAgua', { idRegistro: item.idRegistroAguaPaciente })}
                    style={styles.botonNotificacion}
                  >
                    <Text style={styles.textoBotonNotificacion}>
                      ¡El Paciente  
                       {' '}{nombres[item.registroAguaPaciente.pacienteId]?.nombre || ' '}{' '}
                      {nombres[item.registroAguaPaciente.pacienteId]?.apellido || ' '} ha registrado agua!
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              {item.idRegistroActividadPaciente && (
                <View>
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate('AnalisisRegistroPacienteActividad', { idRegistro: item.idRegistroActividadPaciente })}
                    style={styles.botonNotificacion}
                  >
                    <Text style={styles.textoBotonNotificacion}>
                      ¡El Paciente  {nombres[item.registroActividadPaciente.pacienteId]?.nombre || ''}{' '}
                      {nombres[item.registroActividadPaciente.pacienteId]?.apellido || ''} ha registrado actividad!
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              {item.idRegistroComidaPaciente && (
                <View>
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate('AnalisisRegistroPaciente', { idRegistro: item.idRegistroComidaPaciente })}
                    style={styles.botonNotificacion}
                  >
                    <Text style={styles.textoBotonNotificacion}>
                      ¡El Paciente {nombres[item.registroComidaPaciente.pacienteId]?.nombre || ''}{' '}
                      {nombres[item.registroComidaPaciente.pacienteId]?.apellido || ''} ha registrado comida!
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </ScrollView>
          )}
        />
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

export default NotificacionesPaciente;