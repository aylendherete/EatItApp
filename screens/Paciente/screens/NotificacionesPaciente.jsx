import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,FlatList,Image
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

  return (
    <View style={styles.fondoVerde}>
      <View>
        <Text style={styles.bannerPaciente}>Paciente</Text>
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
            
              <View>
                {item.idRegistroComidaPaciente && (
                  
                  
                  <TouchableOpacity onPress={() => props.navigation.navigate('RegistroComentado', { registro: item.registroComidaPaciente })} style={{backgroundColor:"#52B69A", margin:10,borderRadius:10,padding:10, alignItems: "center", justifyContent: "center",alignItems:"stretch"}}>
                    <View style={{flexDirection: "row",alignItems: "center",justifyContent: "space-between",}}>
                      <Text style={styles.textoBotonNotificacion}>Tu nutricionista hizo un comentario en una comida {format(item.registroComidaPaciente.hora, 'dd/MM/yyyy HH:mm')}</Text>
                      <Image style={{width:30, height:30,}}source={{uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC5klEQVR4nO3dT2jPcRzH8V/WuHBCanKYHDihxIkTpbaTtcSFLbQdNAfNwZ9CO1hqk9JSiCQiM/K/FofFYXJQZE35d5CLHBiFl771UyuX7fd+ffZd39/zWb/aYb96t8f6/fr9+r6/n1KJiIiIiIiIiGhSSXqmeMP82U1JemIAGQLEB/LIADIIiA/kvgHkLiA+kJsGkBuA+ECuGkCuAOIDuWgAuQCID+SMAeQ0ID6QUwaQk4D4QHoNIMcB8YEcM4B0AeIDOWIAOQSID2S/AWQfID6QvQaQPYD4QHYbQNoB8YHsMoC0AuID2W4A2QqID2SLAaQJEB/IJgNIIyA+kAYDyAZAfCDrDSDrAPGBrDWArAHEB7LaALICEB/IcgPIMkB8IEsNIPWA+EAWG0DqAPGBLDSAzAXEBzLPADIbEB/IHANILSA+kJlBjN9gmJP0JwAyBogf5EcA5AsgfpCvAZBPgPhBPgdA3gHiB/kYABkBxA/yJgDyAhA/yMsACPuFCUCeB0DYL0wA8jQAwn5hApDHAZA79oGqPUkPAiD9ec9fuCTdCoBcznv+wiXpWgDkfN7zFy5JlwIg7BcmADkXAGG/MAFIXwCE/cIEICcCIOwXJgDpDoCwX5gA5GgApNM+ULUn6UAApCPv+QuXpM4ASFve8xcuSR0BkJa85y9cktoCIOwXJgCpl9Rc4WORfSAiIiIiIiIi+v+Te6uknuwihuxGyeWfd0paMv53KWGSVmYXvk1go+qhpFVgpMXYNslNqp+SdoCSBmOjpF8VfNObPacBFC9GraRRVd5bSbNA8YE0K95mQKbX6QhnAfGBDBlAWNoxgrwygLy2DVTtSRo2gLBnaAQZMIAM2Aaq9hS7BOhf3IzfCFIn6XsAYyy7CZptICpFD3Xh6nd3kmokXa8AIzuUsoZ/6gRJmiHpoKRvE3yZOgzGFCRpfvnUnduS3peBsveYD5LuZccbSVowFbMQERERERERUanA/QXbMTF9O3XOOQAAAABJRU5ErkJggg=="}}></Image>
                    </View>
                  </TouchableOpacity>
                )}

                {item.idRegistroActividadPaciente && (
                  <TouchableOpacity onPress={() => props.navigation.navigate('RegistroComentadoActividad', { registro: item.registroActividadPaciente })} style={{backgroundColor:"#52B69A", margin:10,borderRadius:10,padding:10, alignItems: "center", justifyContent: "center",alignItems:"stretch"}}>
                    <View style={{flexDirection: "row",alignItems: "center",justifyContent: "space-between",}}>
                      <Text style={styles.textoBotonNotificacion}>Tu nutricionista hizo un comentario en una actividad {format(item.registroActividadPaciente.horaInicio, 'dd/MM/yyyy HH:mm')}</Text>
                      <Image style={{width:30, height:30,}}source={{uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC5klEQVR4nO3dT2jPcRzH8V/WuHBCanKYHDihxIkTpbaTtcSFLbQdNAfNwZ9CO1hqk9JSiCQiM/K/FofFYXJQZE35d5CLHBiFl771UyuX7fd+ffZd39/zWb/aYb96t8f6/fr9+r6/n1KJiIiIiIiIiGhSSXqmeMP82U1JemIAGQLEB/LIADIIiA/kvgHkLiA+kJsGkBuA+ECuGkCuAOIDuWgAuQCID+SMAeQ0ID6QUwaQk4D4QHoNIMcB8YEcM4B0AeIDOWIAOQSID2S/AWQfID6QvQaQPYD4QHYbQNoB8YHsMoC0AuID2W4A2QqID2SLAaQJEB/IJgNIIyA+kAYDyAZAfCDrDSDrAPGBrDWArAHEB7LaALICEB/IcgPIMkB8IEsNIPWA+EAWG0DqAPGBLDSAzAXEBzLPADIbEB/IHANILSA+kJlBjN9gmJP0JwAyBogf5EcA5AsgfpCvAZBPgPhBPgdA3gHiB/kYABkBxA/yJgDyAhA/yMsACPuFCUCeB0DYL0wA8jQAwn5hApDHAZA79oGqPUkPAiD9ec9fuCTdCoBcznv+wiXpWgDkfN7zFy5JlwIg7BcmADkXAGG/MAFIXwCE/cIEICcCIOwXJgDpDoCwX5gA5GgApNM+ULUn6UAApCPv+QuXpM4ASFve8xcuSR0BkJa85y9cktoCIOwXJgCpl9Rc4WORfSAiIiIiIiIi+v+Te6uknuwihuxGyeWfd0paMv53KWGSVmYXvk1go+qhpFVgpMXYNslNqp+SdoCSBmOjpF8VfNObPacBFC9GraRRVd5bSbNA8YE0K95mQKbX6QhnAfGBDBlAWNoxgrwygLy2DVTtSRo2gLBnaAQZMIAM2Aaq9hS7BOhf3IzfCFIn6XsAYyy7CZptICpFD3Xh6nd3kmokXa8AIzuUsoZ/6gRJmiHpoKRvE3yZOgzGFCRpfvnUnduS3peBsveYD5LuZccbSVowFbMQERERERERUanA/QXbMTF9O3XOOQAAAABJRU5ErkJggg=="}}></Image>
                    </View>
                  </TouchableOpacity>
                )}

                {item.idRegistroAguaPaciente && (
                  <TouchableOpacity onPress={() => props.navigation.navigate('RegistroComentadoAgua', { registro: item.registroAguaPaciente })} style={{backgroundColor:"#52B69A", margin:10,borderRadius:10,padding:10, alignItems: "center", justifyContent: "center",alignItems:"stretch"}}>
                     <View style={{flexDirection: "row",alignItems: "center",justifyContent: "space-between",}}>
                        <Text style={styles.textoBotonNotificacion}>Tu nutricionista hizo un comentario en agua {format(item.registroAguaPaciente.hora, 'dd/MM/yyyy HH:mm')}</Text>
                        <Image style={{width:30, height:30,}}source={{uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC5klEQVR4nO3dT2jPcRzH8V/WuHBCanKYHDihxIkTpbaTtcSFLbQdNAfNwZ9CO1hqk9JSiCQiM/K/FofFYXJQZE35d5CLHBiFl771UyuX7fd+ffZd39/zWb/aYb96t8f6/fr9+r6/n1KJiIiIiIiIiGhSSXqmeMP82U1JemIAGQLEB/LIADIIiA/kvgHkLiA+kJsGkBuA+ECuGkCuAOIDuWgAuQCID+SMAeQ0ID6QUwaQk4D4QHoNIMcB8YEcM4B0AeIDOWIAOQSID2S/AWQfID6QvQaQPYD4QHYbQNoB8YHsMoC0AuID2W4A2QqID2SLAaQJEB/IJgNIIyA+kAYDyAZAfCDrDSDrAPGBrDWArAHEB7LaALICEB/IcgPIMkB8IEsNIPWA+EAWG0DqAPGBLDSAzAXEBzLPADIbEB/IHANILSA+kJlBjN9gmJP0JwAyBogf5EcA5AsgfpCvAZBPgPhBPgdA3gHiB/kYABkBxA/yJgDyAhA/yMsACPuFCUCeB0DYL0wA8jQAwn5hApDHAZA79oGqPUkPAiD9ec9fuCTdCoBcznv+wiXpWgDkfN7zFy5JlwIg7BcmADkXAGG/MAFIXwCE/cIEICcCIOwXJgDpDoCwX5gA5GgApNM+ULUn6UAApCPv+QuXpM4ASFve8xcuSR0BkJa85y9cktoCIOwXJgCpl9Rc4WORfSAiIiIiIiIi+v+Te6uknuwihuxGyeWfd0paMv53KWGSVmYXvk1go+qhpFVgpMXYNslNqp+SdoCSBmOjpF8VfNObPacBFC9GraRRVd5bSbNA8YE0K95mQKbX6QhnAfGBDBlAWNoxgrwygLy2DVTtSRo2gLBnaAQZMIAM2Aaq9hS7BOhf3IzfCFIn6XsAYyy7CZptICpFD3Xh6nd3kmokXa8AIzuUsoZ/6gRJmiHpoKRvE3yZOgzGFCRpfvnUnduS3peBsveYD5LuZccbSVowFbMQERERERERUanA/QXbMTF9O3XOOQAAAABJRU5ErkJggg=="}}></Image>

                    </View>
                  </TouchableOpacity>
                )}

                {item.idTurno && (
                  <View style={styles.botonNotificacion}>
                    {item.turnoPaciente.turnoAceptado ? (
                      <View  style={{backgroundColor:"#52B69A", margin:10,borderRadius:10,padding:10, alignItems: "center", justifyContent: "center",alignItems:"stretch"}}>
                      <View style={{flexDirection: "row",alignItems: "center",justifyContent: "space-between",}}>
                        <Text style={{fontSize:15,color:"white",fontFamily:"Serif-Sans", fontWeight:"700"}}>Tu nutricionista aceptó el turno del día {format(item.turnoPaciente.horario, 'dd/MM/yyyy HH:mm')}!</Text>
                        <Image style={{width:30, height:30}}source={{uri: "data:image/png;base64,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"}}></Image>
                      </View>
                    </View>
                    ) : (
                      <View  style={{backgroundColor:"#52B69A", margin:10,borderRadius:10,padding:10, alignItems: "center", justifyContent: "center",alignItems:"stretch"}}>
                        <View style={{flexDirection: "row",alignItems: "center",justifyContent: "space-between",}}>
                          <Text style={{fontSize:15,color:"white",fontFamily:"Serif-Sans", fontWeight:"700"}}>Tu nutricionista rechazó el turno del día {format(item.turnoPaciente.horario, 'dd/MM/yyyy HH:mm')}!</Text>
                          <Image style={{width:30, height:30}}source={{uri: "data:image/png;base64,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"}}></Image>
                        </View>
                      </View>
                    )}
                  </View>
                )}
              </View>
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
  