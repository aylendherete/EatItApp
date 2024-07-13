import React,{useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,FlatList,Image
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
              <View style={{alignItems: "center",justifyContent: "center",alignSelf:"center", margin:10}}>
                <View style={{flexDirection: "row",alignItems: "center",justifyContent: "space-between"}}>
                  <Text style={{ color: "white", fontWeight: "300", fontSize: 30, margin: 10 }}>Historial registro</Text>
                  <Image style={{width:35, height:35, margin:10,alignSelf:"center"}} source={{uri:"data:image/png;base64,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"}}></Image>
                </View>
              </View>
                <ScrollView>
 
                {registroPaciente && (
                  <>
                    <FlatList
                      data={registroPaciente.registrosAgua}
                      keyExtractor={(item) => item.id.toString()}
                      renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                          <View style={{flexDirection: "row",justifyContent: "space-between",}}>
                            <View>
                              <Text style={{color:"black", fontWeight:"600", fontSize:16,}}>{format(item.hora, 'dd/MM/yyyy HH:mm')}</Text>
                              <Text style={{color:"black", fontWeight:"300", fontSize:15}}>Vasos de agua: {item.cantidadVasos} {"("}{item.cantidadVasos * 250} ml{")"}</Text>
                            </View>
                            <Image style={{width:30, height:30,margin:5}}source={{uri: "data:image/png;base64,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"}}></Image>
                          </View>
                        </View>
                      )}
                    />

                    <FlatList
                      data={registroPaciente.registrosActividad}
                      keyExtractor={(item) => item.id.toString()}
                      renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                          <View style={{flexDirection: "row",justifyContent: "space-between",}}>
                              <View>
                                <Text style={{color:"black", fontWeight:"600", fontSize:16}}>{format(item.horaInicio, 'dd/MM/yyyy HH:mm')}</Text>
                                <Text style={{color:"black", fontWeight:"300", fontSize:15}}>Descripción: {item.descripcion}</Text>
                                <Text style={{color:"black", fontWeight:"300", fontSize:15}}>Tiempo Total: {item.tiempoTotal}</Text>
                              </View>
                            <Image style={{width:30, height:30,margin:5}} source={{uri: "data:image/png;base64,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"}}></Image>
                          </View>
                        </View>
                      )}
                    />

                    <FlatList
                      data={registroPaciente.registrosComida}
                      keyExtractor={(item) => item.id.toString()}
                      renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                          <View style={{flexDirection: "row",justifyContent: "space-between",}}>
                              <View>
                                <Text style={{color:"black", fontWeight:"600", fontSize:16,}}>{format(item.hora, 'dd/MM/yyyy HH:mm')}</Text>
                                <Text style={{color:"black", fontWeight:"300", fontSize:15}}>Descripción: {item.descripcion}</Text>
                              </View>
                            <Image style={{width:30, height:30,margin:5}} source={{uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAHgklEQVR4nO2daYwURRTH/8MK7qLsIgqaKLIeISBKTBCJyEbiFfFCRI0Xh5iICh6IiqhAo5gYI4ZDg6jxIGoU8IIPGo7oBwWjHySg4oEoCgqKcgisyO6OecmbOJlMvXo909NdPdQvqS9s1/nvqXpV71UDeDwej8fj8Xg8Ho/H4/F4PJ5KUQ+gP4DhAEYDGA9gEqfx/G/0tzP4WU+EdADQBGAagBUAfgWQDZm2AFgOYCqAQQDae4XCizAMwDsA9pQggC1RmW8DuILr8hg4AcAcANsrIIIpUV2zATR6Vf7nJADzARyIUYjC1ApgIYDeB7MwnfntbElQiGwRYRYAOBIHERkAowBsK3Pw9gL4AcBaAKs4reV/21dm2VsBjOS2VjVH8GIddoB2AHgPwN0AzgNwnKKu7vws5VkCYGcJ9b7Fv+SqZACAH0OK8CybqjUR1F/DJvR8Llvbjo2876kqrgWwXzkA63lKq61ge2p5A/mNsk3/ALgGVcIdvFjaOv09gKsAtIuxbe14oDcoF/xxSDlTFR1t5p14bYLtrAMwnX8JtvY+jBT/MmydW+uY7X8KgC8V7R6XxjXDNk29wG+ma3QE8KJi+roaKbKmpAW8DcB9cJ8HuK3SQk8nys7vMyTT9gBbN2nhJsuRDm1CG+AoGT5FlX4ZY5A+brT8UhbDUUZZ5t00TFPS9CX1jURzbqraZlnA085LQv9+c23qmmcxbcNaUz0B3AvgdQDLALwB4DE2GHIHfkezJ7BYor/leNLwDB0e5rjQ8MyrBdaXZBLPhSP0Fkzc5pD7jEYA71rm7M/4TKpReCbf4fSh4Zkg75nRhmfIQMmnj7B5bOEXKXFeEQaGduBahgLYbZmr8/cBzyUgCPGoUC/tXxJ3ux4Qzqa0xyE3KM+7sspUSUHq2Nwt9vy/AHogQeYIg0IHhRoGVsB921hBQXInEaa6ZyEhKGLjD+EIXXNq28D+hmzKBKkB8K0QOJFINMswYUBoT6LhZcvArgPwFFtaLgmS28Wb6r8cCWByxf6lXDv6WtaN6QWewqHsR3dFkDrBLbwIMdNBCGIjt6uGJcKAzjDkuUi5+MchCPG8Id/uuCMkm4TBIB+4jV5C/lUADhHyPuGQIOcIbSBjJTamGRqxUxmQINnyTZa8hwP43RFB6MXZ5YJncYWhERSqYyMjWFbLlfVPcUQQYqkhLxkisWGKQqcYKBs9hYEcoay/h+V4JU5B7jHk3YyYqBcGggLTbIww5N0f8j7Hp44IcoEhbxtPrxWnvzAQmojCuYa8n4dsx0xHBDleaEc/xMBwQ+V7lLGwpjl3Xsh2XFemINMiEiQj7I9o81xxymk82Kwtln9yyHacrRTE5FgaGWGfNinqqBjjBUeUhvWG/LeGbEcvpSCDimwmySjpEqEg6wz5aawqzmRD5fTmazB53W4P2Y4+SkHAZ0treM+wjAPiXPzVl8RDhspXK/Ob5vQpIdsh7ZJPjSjKkl4eDasN+WmsKs5EQ+VfK/Mviiic5s4IfDE5njaUs7LMaXgCYuA24fpxOb+wP0MGQ3wgCEJBEWEOSn8xlPNMmRvlsUjQD0Kmn4azhIGcoCyjn2Wn3soRKhruF8q5UllGsyE/uQwqzgChA8cq8rdnn0mx/PvYnJU4BsB3Qhvyjy56K/ZUJvfxDuVOu7vQhlhuXnUTGnCxsgzptLeZ75V0LcjTke36zQoxcmkXf3Kj8FbtyRy1Iv3KHlf25VKhjKMQE6bjbwq51NBV4f1rZb/1J7zHMU0LmtTCRgeZpz8pnt/C0ZgaHhSiGWNjpXBrtVzjIJtwohfhkghc2bEevz8iuC4PDVHOgogG8StL4Jw2tYW0jCh24O8IggTL5nyhU0NClEPivVbmIK5hYyLD8760Lkhpbwh/jGb9OBcxUhdBkEOODL+VO0pYFyhE6LCC8oYob9XmJzo9OK2EcZCCHGK/xLpY8Kt3KqG8Bo54/8IyeJtYiBMtpjVdDvpIiFLZxxtIinwvhXrBn/4mEkDyR9xVZtkzDOV+XEJZGgdVKZhct9mkLoTW8nGH6ZS0nM9hBMLU4oIgNUKgxvaQhk2kzBLektFVLMjNQr/JtezkdYStZVzzChwWpJ43fU5eRwBfOzO9LXSdrNoEmS30l/ZVidOT3wzTG3NmFQkyUJgR9vPnCp3A5ODJLfDacyGXBaEDyp+FftLlJWfowmuGqbFLQ34uL3BMkAxfRjX1b2tB0IQTXC80OMtR62kVZKalb85+3Exa4MNEhAcOCWJqSy7R52WdpbPiu4oUJJEWQSZZ+rLRtS84FON0xSfC51tuGAUJC1JjuWGcOwtz/vNM+b5q29Wz94VDyCBBQTpZIlqy3Df6dnyqGKPwTQx2UJDBETuxnGKiRZS0CdIWV/BbJRkrTF9pEqQFwC2oEoYZfM9pEWR3XEFvcdK3yEdb0iDIhhKCt1NDJzZ50yLIwmr+GH+hWbzFYUE2x3UdzSXqOSzVNUG6+f/dzS1BPEUIvCBuEXhB3CLwgrhF4AVxi8AL4haBF8QtLuMdfWHSeBsLmWgoi+rweDwej8fj8Xg8Ho8HTvEfqsH7lgcC4rYAAAAASUVORK5CYII="}}></Image>
                          </View>               
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