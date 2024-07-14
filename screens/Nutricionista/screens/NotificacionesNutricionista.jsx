import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,Image
} from 'react-native';


import { format , parseISO} from 'date-fns';
import UserContext from '../../../context/userContext';

export const NotificacionesPaciente = (props) => {
  const { user } = useContext(UserContext);

  const [notificaciones, setNotificaciones] = useState([]);

  const obtenerNotificaciones = async () => {
    try {
      let response = await fetch(`http://localhost:3000/notificacionesNutricionista/notificaciones?matriculaNacional=${user.matriculaNacional}`);
      if (response.ok) {
        let data = await response.json();
        setNotificaciones(data);
   
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
        
        const updatedNotificaciones = notificaciones.filter(item => item.idSolicitud !== id);
        setNotificaciones(updatedNotificaciones);

        // Obtener notificaciones actualizadas
        obtenerNotificaciones();
       
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
        const updatedNotificaciones = notificaciones.filter(item => item.idTurno !== id);
        setNotificaciones(updatedNotificaciones);

        // Obtener notificaciones actualizadas
        obtenerNotificaciones();
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
        const updatedNotificaciones = notificaciones.map(item => {
          if (item.idTurno === id) {
            return { ...item, turnoPaciente: { ...item.turnoPaciente, turnoAceptado: true } };
          }
          return item;
        });
        setNotificaciones(updatedNotificaciones);
  
        // Obtener notificaciones actualizadas
        obtenerNotificaciones();
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
        const updatedNotificaciones = notificaciones.filter(item => item.idSolicitud !== id);
        setNotificaciones(updatedNotificaciones);

        // Obtener notificaciones actualizadas
        obtenerNotificaciones();
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
                    {item.notificacionSolicitud.nombre}{' '}
                    {item.notificacionSolicitud.apellido} quiere iniciar un plan contigo!
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
                    {item.turnoPaciente.paciente.nombre}{' '}
                    {item.turnoPaciente.paciente.apellido} quiere un turno contigo
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

              {(item.turnoPaciente!=null && item.turnoPaciente.turnoAceptado===false)&& (
                <View style={styles.botonNotificacion}>

                  <View  style={{backgroundColor:"#52B69A",borderRadius:10, alignItems: "center", justifyContent: "center",alignItems:"stretch"}}>
                    <View style={{flexDirection: "row",alignItems: "center",justifyContent: "space-between",}}>
                      <Text style={{fontSize:15,padding:10,color:"white",fontFamily:"Serif-Sans", fontWeight:"700"}}>
                        ¡
                        {item.turnoPaciente.paciente.nombre || ''}{' '}
                        {item.turnoPaciente.paciente.apellido || '  '}{' '} 
                        canceló un turno contigo {'\n'} el día {format(item.turnoPaciente.horario, 'dd/MM/yyyy HH:mm')}!
                      </Text>
                      <Image style={{width:30, height:30,}}source={{uri: "data:image/png;base64,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"}}></Image>
                    </View>
                  </View>
              
                 </View> 
                )     
              }


              {item.idRegistroAguaPaciente && (
                <View>
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate('AnalisisRegistroPacienteAgua', { idRegistro: item.idRegistroAguaPaciente })}
                    style={{backgroundColor:"#52B69A", margin:10,borderRadius:10,padding:10, alignItems: "center", justifyContent: "center",alignItems:"stretch"}}                  >

                    <View style={{flexDirection: "row",alignItems: "center",justifyContent: "space-between",}}>
                        <Text style={styles.textoBotonNotificacion}>
                          ¡El Paciente  
                          {' '}{item.registroAguaPaciente.paciente.nombre}{' '} 
                          {item.registroAguaPaciente.paciente.apellido}{' '} ha registrado agua!
                        </Text>
                        <Image style={{width:30, height:30}}source={{uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEMklEQVR4nO2aXYhVVRTHd5YWxaBYEIgZDpWfIBg62hTki/jgg2QPQaAiJsyMH6ONiZVITpRoOYk++FGCIilKRUE+KDQqjlY66oMKikUvvQVNH1o26k/2uI+t2XPvnH3O3vfq3Nk/uHC5d+//WuectfbH2kepSCQSiUQikUgkEon4AwwA5gCzVX8E+JD/Waz6E0ANcEPcgKvAs6o/ADwMnKcnJ4AHVaUDrLeevP4kNKpKBphihf5iYIl1Q55TFRz6F8TFHjczgf4cqfhUAD6ynvQz4r+RwF/i/2WqwkN/UYE2Oh0S/gHGqkoOfdWzXWWmAvBxsdAv0NZOhTdVXwaYmhb6Kanwb59NBeBR4FJa6Dukwsk+mQpAi2voO6RCk+pLALXAzSyhX0BjkTUrjHbo8wDwOjBPf1f3MPQvC+dbXUK/SCq0ZkkF4A3R/m11H4T+30C1h1a10UhYkdJ+vjWAjlflBHjBGvXrA2g2WBc1rpe2DwGnRPszwEBfH/KG/nch8tDk9SGh+31vqaCnTXOjypsKwCfCqB7BRwbUtmeFt1Lar3aNmlAOjgY6hdG6EtioF/rXgOEpqXC6bKkAfCOMHSvFFGRSQWsnbEtpPwG4LtqvDO1TF8DzwsgtYJIqEcBkYwMTcU+ntF9jrSXGlMKpDcLIgeAGetr7MsNYMBA45zqA5nXoJ2FgZlDxwvZmCXvtDu11KvznetPyjM4JHXrvH0y8uM1HgD/vWoUhDn3ey7qsdnVmhhA+GkTUzW6bsFvj0F7PCu3BU4Hue/ft3oLudncKu3Mc+0y0pmr/uiOwUgh+4C2Y72zBec0BNIt+vwNDfR1ZJgQ3eIlls7tR2F2Yod8gq0jT7OtInevCJCTADmF3Xsa+r4q+V3wdmSbE2rzEstnVg1jClIx99drgN9F/lI8jQ4WQ3qwMyi2WrcyenCfqqtNjOTS+Fn7P8nXoYjAxN3uzhb2zAXaufhs34B0h9pWXWPaNV1OAqpXzIFoQYIQogN5yWZh4VpySzZCuPA3LqfOFuAH+r+gAu0q64Shc7vo0p44utv4qdJzL9UXRT8Kq2GxSgQE2C/0/gCdz6kwXOj8Hq13Q/UUHzfIgwne0l1va9R5P/0ehszaUj10AWy1Ht/lMjSbsN1maOz301lpL4SfyavW21DxsOazHhFqVEeBF4AdL63Ce2p4ek4D3xQCa67Qqy359Pz35FngFqOqlb5WZ5w8W6L8vT70BeNk6bNXszqqTp4C51HoDLOG6OSn+3MzHLeZ7m1XETLhqzgmLDlbAS8BeYIs+BwBWAZ9Zi7S7F1+Owk0XumgJ7LH24a50GmefUinoTY2DXsc9eyOVOzditanPy1Njm5umcvNuWsXX0i+Ucgm/AOuAx9X9ADDEhOxcc+7XYL7r3wZ7TG+6ZL7AFGkagdfKfjgaiUQiqkK5DYyjRp3Pl6NBAAAAAElFTkSuQmCC"}}></Image>
                    </View>

                  </TouchableOpacity>
                </View>
              )}
              {item.idRegistroActividadPaciente && (
                <View>
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate('AnalisisRegistroPacienteActividad', { idRegistro: item.idRegistroActividadPaciente })}
                    style={{backgroundColor:"#52B69A", margin:10,borderRadius:10,padding:10, alignItems: "center", justifyContent: "center",alignItems:"stretch"}}                  > 

                    <View style={{flexDirection: "row",alignItems: "center",justifyContent: "space-between",}}>
                        <Text style={styles.textoBotonNotificacion}>
                          ¡El Paciente  {item.registroActividadPaciente.paciente.nombre}{' '}
                          {item.registroActividadPaciente.paciente.apellido} ha registrado actividad!
                        </Text>
                        <Image style={{width:30, height:30}}source={{uri: "data:image/png;base64,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"}}></Image>
                    </View>
                   
                  </TouchableOpacity>
                </View>
              )}
              {item.idRegistroComidaPaciente && (
                <View>
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate('AnalisisRegistroPaciente', { idRegistro: item.idRegistroComidaPaciente })}
                    style={styles.botonNotificacion}
                  >
                    <View style={{flexDirection: "row",alignItems: "center",justifyContent: "space-between",}}>
                        <Text style={styles.textoBotonNotificacion}>
                          ¡El Paciente {item.registroComidaPaciente.paciente.nombre || ''}{' '}
                          {item.registroComidaPaciente.paciente.apellido || ''} ha registrado comida!
                        </Text>
                        <Image style={{width:30, height:30}}source={{uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAACBklEQVR4nO2WPU8UURSGx9hhiJQiHwYkbLFE/Q/UUEgsCP9A1opAYSiEZH8EBD9iYrEYkQIwsaCA/yChJYDBAnEhS2Qhj7n6jjmOrnvvBRqyb3KTmWfuuec9M2fuTJI01FCAgA6gAHwANoAjDXe8AowC7ZeRuA2YAarU1xkwD9y5qOSDQFmLfwdKwDCQA25o5MRKmoNiBs6b/IkqcnoHdHvE3AUWzN0onKfyM43xiPgJEz8Q88zLqiI4ecaE0zegNSRwLr3thl0HisAXYAeYTrtO12sdv9fpTMirdqpm+v3MgdlabV/HQA9wojeozcdAQfElwx6IVYB+jYqPAZ2/FXrsY2BFk4cNey5WNKwYYGBEaMnHwKYm9xr2SazPsL4AA26fcNrwMVDW5GbD0tvdZFhTJuk6sFbDQLNQ2cfAsSbfNMx1vlOPYa65UrVnmthpz7CWtId8DGxr8j3D3BbrtAjc0nDHqZacCY1lsTcm/r7YVmwT5oFD/pZjn//Bd4Gu2CYc1+TlDM9nql4U6wReGf4i+yU0RY35GOjURlS1VZjrfzSYB+826/n9KwCvtd4qcC3WgIsFPurSS6/kppMPFPg0iTcwKbzvtQ1bAY/Mv8CzUAPAlJBb42ESI359F36aiDCQJq+///9PwBDwNcLAfnTlWdnnF2DgdnIZIvA1vHoGGkouWD8ARiit8H7kbYoAAAAASUVORK5CYII="}}></Image>
                    </View>
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
    fontSize:15,
    margin:15,
    color:"white",
    fontFamily:"Serif-Sans", 
    fontWeight:"700"
  }
});

export default NotificacionesPaciente;