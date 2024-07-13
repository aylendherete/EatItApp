import React,{useState, useRef,useContext,useEffect}  from 'react';
import { Calendar,LocaleConfig} from 'react-native-calendars';

import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Modal,
    Animated, Easing,FlatList,Image
  } from 'react-native';

  LocaleConfig.locales['es'] = {
    monthNames: [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ],
    monthNamesShort: [
      'Ene.',
      'Feb.',
      'Mar.',
      'Abr.',
      'Mayo',
      'Jun.',
      'Jul.',
      'Ago.',
      'Sept.',
      'Oct.',
      'Nov.',
      'Dic.',
    ],
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
  };
  LocaleConfig.defaultLocale = 'es';

import { format , parseISO} from 'date-fns';

import UserContext from '../../../context/userContext';


export const CalendarioPaciente=(props)=>{
  const [selectedDate, setSelectedDate] = useState('');
    
  const [showAlert, setShowAlert] = useState(false);

  const [showAlertTurno, setShowAlertTurno]=useState(false);

  const [selectedRegistro, setSelectedRegistro] = useState(null);

  const [registroPaciente, setRegistroPaciente] = useState(null);
  const { user } = useContext(UserContext);

  const [turnos,setTurnos]=useState(null);

  const [selectedTurno, setSelectedTurno] = useState(null);


  const cancelarTurno=async()=>{

    try {
      console.log("Obteniendo turnos para el cancelar con id:", selectedTurno.id); // Log adicional
      const response = await fetch(`http://localhost:3000/turno/cancelarTurno?id=${selectedTurno.id}`,{method:'POST'});
      if (response.ok) {

        console.log("se canceló turno")
        setSelectedTurno(null);
        fadeOut();
      }
    } catch (e) {
      console.log('Error al obtener los registros del paciente:', e);
    }
  }

  const obtenerTurnos = async () => {
    try {
      console.log("Obteniendo turnos para el usuario con id:", user.id); // Log adicional
      const response = await fetch(`http://localhost:3000/turno/getTurnosPaciente?idUsuario=${user.id}`);
      if (response.ok) {
        const data = await response.json();
        console.log("Datos obtenidos:", data);
        setTurnos(data);
      }
    } catch (e) {
      console.log('Error al obtener los registros del paciente:', e);
    }
  };


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

  const opacity = useRef(new Animated.Value(0)).current;
  const fadeIn = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 350,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const onDayPress = (day) => {
      setSelectedDate(day.dateString);
      setShowAlert(true);
      fadeIn();
  };


  
  const fadeOut = () => {
    setShowAlert(false)
      Animated.timing(opacity, {
        toValue: 0,
        duration: 350,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => setShowAlert(false));
    };


    const handleModalClose = () => {
      setSelectedRegistro(null);
      fadeOut();
    };
    const handleRegistroPress = (item) => {
      setSelectedRegistro(item);
    };

    const handleTurnoPress = (item) => {
      setSelectedTurno(item);
    };

    const handleTurnoClose = () => {
      setSelectedTurno(null);
      fadeOut();
    };
  
  
  useEffect(() => {
    obtenerRegistros();
    obtenerTurnos();
    
  }, []);
    
  return(
      <View style={styles.fondoVerde}>
        
        <View style={{flex:4}}>
        
        <View style={styles.container}>
            <View style={{alignItems: "center",justifyContent: "center",alignSelf:"center", margin:10}}>
                  <View style={{flexDirection: "row",alignItems: "center",justifyContent: "space-between"}}>
                  <Text style={{color:"white", fontWeight:"600", fontSize:28, margin:10}}>Tu {'\n'}Calendario</Text>
                    <Image style={{width:65, height:65, margin:10,alignSelf:"center"}} source={{uri:"data:image/png;base64,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"}}></Image>
                  </View>
            </View>

            
            <View style={{borderRadius:20}}>
              <Calendar
                onDayPress={onDayPress}
                markedDates={{
                  [selectedDate]: { selected: true, selectedColor: '#52B69A' },
                }}
                hideExtraDays={true}
              />
            </View>

            <TouchableOpacity onPress={()=>props.navigation.navigate('TurnosPaciente')} style={{borderRadius:35,margin:35,alignItems: "center", justifyContent: "center",backgroundColor:"#52B69A", }}>
              <View style={{flexDirection: "row",alignItems: "center",justifyContent: "space-between",}}>
                <Text style={{color:"white", textAlign:"center", fontWeight:"400", fontSize:20,margin:10,padding:10}}>
                  ¡Pedi un turno!
                </Text>
                <Image style={{width:30, height:30, margin:10,padding:15}}source={{uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFhklEQVR4nO2dXW8VRRjHN6XUYL1QQS4M1iu58I5ioVI/gpdi/ABQ+AZAE+40XFtRPoAJjeXlgoJ4oR9CJZbEoPElaoUSBZFqUn5m7Fxs58zuzpzdPfvs7vNLTnLO2X1mnpn/mZmdmWf3JEkNAPuAS8ADBjHfXQX2J0Kh5f77CrNOMeacfYkwaLn/A9hfVijLiTBouf8DZDTzLP5MhEHL/R/A9Tj2eNO03f/OFYiW+9+5AtFy/ztXICT6D0wDnwF/UZKiAkknqd5/U6c3TR3HiPE3FaGCZPIIOBAiiGkZlaGC5HIjRJDS3VQaFSSXhyGCbCOon4uwL5t+3dTtf7S9CrIdFaRhHD1UkKbpoiAxi3N/JMKgZv+bEORKRIEuJ8KgZv+bEGR/xAbPK4kwqNn/kQuS2nVbNvsFnoKY7y5LFGMU/jciiJKNCiIMFUQYKogwVBBhqCBdE0SpFxVEGCqIMFQQYVQ/6ChRqCDCUEGEoYIIQwURhgoiDBVEGCpI3wWhZyQqiCxUEGGoIMJonSBqtx0VRMgPZ2h7bSH5qCAd6SKHttcWko8KUoC2kI5UENplyaogVBBZFYQKIquC6KsgXSdRQWShgghDBRFG6wTpml1ZVJAMVJACtIVkoF1WvQCLwKaOIfk/vO8Lzh0DZoEF++iNW8B94F/7um+/M8fO2HPHctKbA77TQT1FSowvgD05T3Q4B/xMPD9ZW+/z4YHdJm/fsUqvPtoyFrDFx8B4RmVdAP6hPBvARyZNTz7jtRWwrH0DdkvADs/37wD3qJ67wNuh/pUuYFn7BuzG3c+2VWRhnqN1ETgOzAAvADvty7w/ZI8tFTxz68OgllG2gGXtR22XBtgFrGRU4C/ASeDpJBBzLnAM+DYjzWsmz0YEEcYmcMTTMlYy+v6zwGRsHaTSNq3nlE3LZaWRMUQY73v89XVTvwKvx5Y9p06OAL958jkfXaFDZC6VdeBZzwDu8jXwUkA5XwM+NU+nBg4GnD9l03Y5GlWhYTJk2wvitOfS9p6nZRSKYe1vp+xuB9pMeVrK78DzwRUaklEV9g3YXXBMH8d0U8CTlO2TCLs5z5jyQa8FYWsG7k76zobmWcZfa2uWV9IYgV6sPKMWCXLOc2k7OUJBJoA7ThLvVZ5RGftR2QE7PGtTJ0PzK+tvyn7eSeIH74JkDwSZdUwexEz6yvqbsp80f1fhJHOoj4IsOCYXQ/Oqwl8njU+cZE71UZArjsnx0Lyq8NdJ44STzKU+CnLLMZkJzasKf500DjvJfNVHQdYdkz2eGfgq1bPqzuiBvc45dyurmLL2o7JjcP4x4Rw3yyF1cd3J6ynn+EZlFZNlL4CJSEHM2lRdqCA4W6cBXdbBmrqsb9w/k2ykyxLAqwWD+uC1/xDlHDKN2ZEP6gJ4s9eXvdJhcGFvqUFBzJ/G1DsxlA5ylk6e8fyr6kwfBRmzQWxpjnV2cbENMLj8bqJDdkamMXQ92fnH/6GktS+/twG2Nqg2Cvvv+gRZ8OxW1rNB1RbYCu9Ms+GGCNW0hfuGZ3K6mGfQF0F22/DONCYAYSrQPj15XA20eRlYc/I0n59L+i6IwcTauuW1oTqFotgZ/XX7mg6MOHEnpYa3RvoH98JY9JTXxNriaSlzSUXYbmotxB+f8U26y6Zb0QWhpGfcxcchghkWMm5ruBYaSjoNPKK73PEsOO6yFZR1/nxMVIqd9M17Lm3jg61tggfsvoC7Cd8VPs+4HeF8js1Duwd+wu707bUtYMK+P2yj5JcLuv3FqNsR+g5w1IZ3Vs1a4QCu+DGxtia8M+M2glge21aRfWmrhGFmz2ZJA/hxCCHM2tS7mTNwJRkauyBpblk7bfYszEaS3Xk0V0/mZd5/aY+ZG3TMLW+Zt0Xn8R/isbKvKD6x7AAAAABJRU5ErkJggg=="}}></Image>
              </View>
            </TouchableOpacity>

            
 
          
          
        </View>

        </View>
        
        
    
        <Modal visible={showAlert} transparent animationType='slide'>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}
         >
            <Animated.View style={{
              backgroundColor:"#76C893",
              padding: 30,
              borderRadius: 15,
              opacity: opacity,
              width:'90%',
              height:'100%',
              flex:0.45,
              justifyContent:"center",
              alignItems: 'center'
            }}>
            
            <View style={{ alignItems:"center"}}>
            <Text  style={{fontSize:24, color:"white", margin:5, textAlign:"center", fontWeight:"500", margin:10}}>Fecha seleccionada: {[selectedDate]}</Text>
                
                <ScrollView > 

                {registroPaciente && (
                  <>
                    <FlatList
                      data={registroPaciente.registrosAgua}
                      keyExtractor={(item) => item.id.toString()}
                      renderItem={({ item }) => (
                        
                        format(parseISO(item.hora), 'yyyy-MM-dd') === selectedDate  &&(
                        <TouchableOpacity onPress={() => handleRegistroPress(item)}>
                        <View style={styles.itemContainer}>
                          <Text style={{color:"black", fontWeight:"600", fontSize:16,textAlign:"center"}}>{format(item.hora, 'HH:mm')} Agua</Text>
                          <Text style={{color:"black", fontWeight:"300", fontSize:16,textAlign:"center", margin:5}}>Vasos de agua: {item.cantidadVasos} {"("}{item.cantidadVasos * 250} ml{")"}</Text>
                        </View></TouchableOpacity>)
                      )}
                    />

                    <FlatList
                      data={registroPaciente.registrosActividad}
                      keyExtractor={(item) => item.id.toString()}
                      renderItem={({ item }) => (
                        format(parseISO(item.horaInicio), 'yyyy-MM-dd') === selectedDate &&(
                          <TouchableOpacity onPress={() => handleRegistroPress(item)}>
                          <View style={styles.itemContainer}>
                          <Text style={{color:"black", fontWeight:"600", fontSize:16,textAlign:"center"}}>{format(item.horaInicio, ' HH:mm')} Actividad</Text>
                          <Text style={{color:"black", fontWeight:"300", fontSize:16,textAlign:"center", margin:5}}>Descripción: {item.descripcion}</Text>
                          <Text style={{color:"black", fontWeight:"300", fontSize:16,textAlign:"center", margin:5}}>Tiempo Total: {item.tiempoTotal}</Text>
                        </View></TouchableOpacity>)
                      )}
                    />

                    <FlatList
                      data={registroPaciente.registrosComida}
                      keyExtractor={(item) => item.id.toString()}
                      renderItem={({ item }) => (
                        format(parseISO(item.hora), 'yyyy-MM-dd') === selectedDate  &&(
                        <TouchableOpacity onPress={() => handleRegistroPress(item)}>
                        <View style={styles.itemContainer}>
                          <Text style={{color:"black", fontWeight:"600", fontSize:16,textAlign:"center"}}>{format(item.hora, 'HH:mm')} Comida</Text>
                          <Text style={{color:"black", fontWeight:"300", fontSize:16,textAlign:"center", margin:5}}>Descripción: {item.descripcion}</Text>
                          
                        </View></TouchableOpacity>)
                      )}
                    />
                  </>
                )}

                {turnos && (
                  <>
                  

                    <FlatList
                      data={turnos}
                      keyExtractor={(item) => item.id.toString()}
                      renderItem={({ item }) => (
                        format(parseISO(item.horario), 'yyyy-MM-dd') === selectedDate  &&(
                        <TouchableOpacity onPress={() => handleTurnoPress(item)}>
                        <View style={styles.itemContainer}>
                          <Text style={{color:"black", fontWeight:"600", fontSize:16,textAlign:"center"}}>Turno a las {format(item.horario, 'HH:mm')} </Text>
                          
                        </View></TouchableOpacity>)
                      )}
                    />
                  </>
                )}  
                    
                </ScrollView>
            </View>
            <TouchableOpacity onPress={fadeOut}>
              <Text style={{fontSize:20, color:"white", backgroundColor:"#52B69A", textAlign:"center", padding:10, borderRadius:15, margin:15}}>Cerrar</Text>
            </TouchableOpacity> 

            </Animated.View>

        </View>
        </Modal>

        {selectedTurno && (<Modal visible={true} transparent animationType='slide'>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}
         >
            <Animated.View style={{
              backgroundColor:"#76C893",
              padding: 30,
              borderRadius: 15,
              opacity: opacity,
              width:'90%',
              height:'100%',
              flex:0.45,
              justifyContent:"center",
              alignItems: 'center'
            }}>
            
            <View style={{ alignItems:"center"}}>
            <Text  style={{fontSize:24, color:"white", margin:5, textAlign:"center", fontWeight:"500"}}>Turno el dia {[selectedDate]}</Text>
            <TouchableOpacity onPress={cancelarTurno}><Text style={{fontSize:20, color:"white", backgroundColor:"#52B69A", textAlign:"center", padding:10, borderRadius:15, margin:15, fontWeight:"500"}}>Cancelar Turno</Text></TouchableOpacity>
            <TouchableOpacity onPress={handleTurnoClose}><Text style={{fontSize:20, color:"white", backgroundColor:"#52B69A", textAlign:"center", padding:10, borderRadius:15, margin:15, fontWeight:"400"}}>Cerrar</Text></TouchableOpacity>
            
            </View>

            </Animated.View>

        </View>
        </Modal>)}
        
        



        {selectedRegistro && (
        <Modal visible={true} transparent animationType='slide'>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Animated.View style={{
              backgroundColor: "#76C893",
              padding: 30,
              borderRadius: 15,
              opacity: opacity,
              width: '90%',
              height: '50%',
              justifyContent: "center",
              alignItems: 'center'
            }}>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{ fontSize: 24, color: "white", margin: 5, textAlign: "center", fontWeight: "500", margin: 10 }}>Detalles del Registro</Text>
                <ScrollView>
                  <Text style={{fontSize:24, color:"white", margin:5, textAlign:"center", fontWeight:"500"}}>Fecha: {format(parseISO(selectedRegistro.hora || selectedRegistro.horaInicio), 'dd/MM/yyyy HH:mm')}</Text>
                  {selectedRegistro.descripcion && (
                    <Text style={{backgroundColor:"#52B69A",fontSize:24, color:"white", margin:5, textAlign:"center", margin:10, padding:15, borderRadius:5}}>Descripción: {selectedRegistro.descripcion}</Text>
                  )}
                  {selectedRegistro.cantidadVasos && (
                    <Text style={{backgroundColor:"#52B69A",fontSize:24, color:"white", margin:5, textAlign:"center", margin:10, padding:15, borderRadius:5}}>Vasos de agua: {selectedRegistro.cantidadVasos} {"("}{selectedRegistro.cantidadVasos * 250} ml{")"}</Text>
                  )}
                  {selectedRegistro.tiempoTotal && (
                    <Text style={{backgroundColor:"#52B69A",fontSize:24, color:"white", margin:5, textAlign:"center", margin:10, padding:15, borderRadius:5}}>Tiempo Total: {selectedRegistro.tiempoTotal}</Text>
                  )}
                </ScrollView>
              </View>
              <TouchableOpacity onPress={handleModalClose}>
                <Text style={{ fontSize: 20, color: "white", backgroundColor: "#52B69A", textAlign: "center", padding: 10, borderRadius: 15, margin: 15 }}>Cerrar</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Modal>
      )}

        
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
        fontFamily:"Serif-Sans", 
        fontWeight:"700"
    },
    container: {
      flex: 1,
      padding: 16,
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
    padding: 10,
    marginVertical: 3,
    margin:8
  },
})
