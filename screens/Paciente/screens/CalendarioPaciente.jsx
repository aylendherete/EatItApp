import React,{useState, useRef,useContext,useEffect}  from 'react';
import { Calendar,LocaleConfig} from 'react-native-calendars';
import {StyleSheet,Text,View,TouchableOpacity,ScrollView,Modal,Animated, Easing,FlatList,Image} from 'react-native';
import { format , parseISO} from 'date-fns';
import UserContext from '../../../context/userContext';
import {useIsFocused } from '@react-navigation/native';

LocaleConfig.locales['es'] = {
  monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre',],
  monthNamesShort: ['Ene.','Feb.','Mar.','Abr.','Mayo','Jun.','Jul.','Ago.','Sept.','Oct.','Nov.','Dic.',],
  dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
  };

LocaleConfig.defaultLocale = 'es';

export const CalendarioPaciente=(props)=>{
  const { user } = useContext(UserContext);

  const [selectedDate, setSelectedDate] = useState('');  
  const [showAlert, setShowAlert] = useState(false);
  const [selectedRegistro, setSelectedRegistro] = useState(null);
  const [registroPaciente, setRegistroPaciente] = useState(null);
  const [turnos,setTurnos]=useState(null);
  const [selectedTurno, setSelectedTurno] = useState(null);
  const isFocused = useIsFocused();
  const opacity = useRef(new Animated.Value(0)).current;

  const cancelarTurno=async()=>{

    try {
      console.log("Obteniendo turnos para el cancelar con id:", selectedTurno.id); // Log adicional
      const response = await fetch(`http://localhost:3000/turno/cancelarTurno?id=${selectedTurno.id}`,{method:'POST'});
      if (response.ok) {

        console.log("se canceló turno")
        setSelectedTurno(null);
        fadeOut();
        obtenerTurnos()
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
    
  }, [isFocused]);
    
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
                
              <ScrollView contentContainerStyle={{ flexGrow: 1 }}> 

                {registroPaciente && (
                  <>
                    <FlatList
                      data={registroPaciente.registrosAgua}
                      keyExtractor={(item) => item.id.toString()}
                      renderItem={({ item }) => (
                        
                        format(parseISO(item.hora), 'yyyy-MM-dd') === selectedDate  &&(
                        <TouchableOpacity onPress={() => handleRegistroPress(item)}>
                          <View style={styles.itemContainer}>
                              <View style={{flexDirection: "row",justifyContent: "space-between",alignItems:"center"}}>
                                <View>
                                  <Text style={{color:"black", fontWeight:"600", fontSize:18,textAlign:"center"}}>{format(item.hora, 'HH:mm')} </Text>
                                  <Text style={{color:"black", fontWeight:"300", fontSize:18,textAlign:"center"}}>Vasos de agua: {item.cantidadVasos} {"("}{item.cantidadVasos * 250} ml{")"}</Text>
                                </View>
                                <Image style={{width:35, height:35,margin:5}}source={{uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEkklEQVR4nO2aXUikVRjH/5ZOrh+4Xe1FQkVQu1tttYmi4hfhhZKLhrDJQuCuGrHmjGwW5u72YbsXhRd+XnWxsMuysMrECl0VBLqC1n5UFJWkN0E3ESWBTuqceIZz4OGg4/tx3pmcOT84MDjzPuc8f5/nvM953hewWCwWi8VisVgsFosRcgB0AHhVfs463gUg5KDPWcVRABtMgBiAY8gScgF8zZxX4x6APGQBF5TTBQUFicFEoO8ymmMy3BMOj42NidHRUS7AJoDjyODQ/0Y5W11dLba3txOjrq6Oi3A/U1PhPR76y8vLQrGysiKKioq4CBeRYTzHQ398fFzoUDpoqfAiMjn0dXZJhRAygPd3C32dHVKBrt33of9vstDP5FTIBXBnr9B3kArf7tdU+NBp6DtIhQ+wz3ieh/7ExIRwC6WLlgplDuZ9SN5CwwAeQJrI46FfX18v4vG4awHomsbGRrepEGG/p7ojLQyrRRQWFroKfZ3V1VVRXFzMRaC0SsZp7YRJm3D6Qn9yclL4hdLHRSo8CGAxXWV1CMB3avKGhgZPoe8gFX4AkJ9kHYcBrKfjhDmsJqUdnHZyU+xwV6C5kjHIfksR+ULQzj/OOzxTU1PCNJROWn4/sUcNspTKZssNNVlNTY2R0Nchm2SbOXV9jzUd0VJhKCjnnwEQp0lycnLE0tKSCIrFxcXEHNKhuOwtJmNIi5pngxDgIzVJe3u7CJq2tjY3t0U9Fe4GkQq/qAlmZ2cDFyAajXIBfnawPj0VaIM0RqkyXFJSIjY2NgIXYH19XS+OaA2OG7Fys6a0NcJLynBtba1IFVVVVVwAWoPbVvwdU6nwhjLa3d2dMgE6Ozu5AGe9tOUAvGVCgHPK4ODgYMoEGBgY4AK87aUxC2ANwCG/AoSVQVpUqujv7+cC0D/BKRT2P7FrL/kV4HVlrKenJ2UCdHV1cQHedLnmk+zaFb9PpuuVscrKypQJUF5ezgVodLlmapr8xa5/0o8AD6sqkA4rsVgscOfpVqs9T/SSx1+w60/AJz8qY1SkBM309DR3/lePa/6U2ej2K8CQMtba2hq4AC0tLW6OxU4EoC6SLx4FsK0OQ3Nzc4E5v7CwwA9DNJ7yuOYvmY2XYYCrymBFRYXY2toy7vzm5qYoKyvjzk97XOsBAH+7LKX35BEA/yij4XDYuAC9vb3ceTrcPAZvnGJ2vodBzjHDYmRkxJjzZIvb9vFSVb7cOI2WwwoqKK7xhVJx5OfWSGHf19enO3/TR/HCN7/fABTBMPkA5vmCaU+Yn5937TxtplrBQ+O2zGG3FMoWGu8mvWLaeT7Z59rCRXNzs5iZmRFra2u7Ok3f0X2+qalJd5zGrLQNl7X/SdlKN3H7dAw9lzvPH5KoEQqFEk+KOzo6RCQSSQz6TGd8+m4Hx2Oyi5PsWR+9cfoVgCvygDMC4DMAv+9g73Iq30w9DOCWKpddDqotog5r9T8d2PsDwGtIE08D+ETbgXcbywA+lr08p0ST2FuVUXEQ/xNKATQD6AXwjhxn5d+8FiWUHuUAzkh7EZkWgbTBLRaLBdnGf/TMHo2mR2rVAAAAAElFTkSuQmCC"}}></Image>
                              </View>
                          </View>
                        </TouchableOpacity>)
                      )}
                    />

                    <FlatList
                      data={registroPaciente.registrosActividad}
                      keyExtractor={(item) => item.id.toString()}
                      renderItem={({ item }) => (
                        format(parseISO(item.horaInicio), 'yyyy-MM-dd') === selectedDate &&(
                          <TouchableOpacity onPress={() => handleRegistroPress(item)}>
                          <View style={styles.itemContainer}>
                            <View style={{flexDirection: "row",justifyContent: "space-between",alignItems:"center"}}>
                              <View>
                                <Text style={{color:"black", fontWeight:"600", fontSize:16,textAlign:"center"}}>{format(item.horaInicio, ' HH:mm')}</Text>
                                <Text style={{color:"black", fontWeight:"300", fontSize:16,textAlign:"center", margin:5}}>Descripción: {item.descripcion}</Text>
                                <Text style={{color:"black", fontWeight:"300", fontSize:16,textAlign:"center", margin:5}}>Tiempo Total: {item.tiempoTotal}</Text>
                              </View>
                              <Image style={{width:35, height:35,margin:5}}source={{uri: "data:image/png;base64,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"}}></Image>
                            </View>
                          </View>
                        </TouchableOpacity>)
                      )}
                    />

                    <FlatList
                      data={registroPaciente.registrosComida}
                      keyExtractor={(item) => item.id.toString()}
                      renderItem={({ item }) => (
                        format(parseISO(item.hora), 'yyyy-MM-dd') === selectedDate  &&(
                        <TouchableOpacity onPress={() => handleRegistroPress(item)}>
                          <View style={styles.itemContainer}>
                            <View style={styles.itemContainer}>
                              <View style={{flexDirection: "row",justifyContent: "space-between",alignItems:"center"}}>
                                <View>
                                  <Text style={{color:"black", fontWeight:"600", fontSize:16,textAlign:"center"}}>{format(item.hora, 'HH:mm')} Comida</Text>
                                  <Text style={{color:"black", fontWeight:"300", fontSize:16,textAlign:"center", margin:5}}>Descripción: {item.descripcion}</Text>
                                  {item.foto && <Image style={{borderColor:"black", borderWidth:2, width:120, height:120,alignSelf:"center"}} source={{uri:item.foto}}></Image>}
                                </View>
                                <Image style={{width:35, height:35,margin:5}}source={{uri: "data:image/png;base64,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"}}></Image>
                              </View>
                            </View>
                                                   
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
                              <View style={{flexDirection: "row",justifyContent: "space-between",alignItems:"center"}}>
                              <Text style={{color:"black", fontWeight:"600", fontSize:18,textAlign:"center"}}>Turno a las {format(item.horario, 'HH:mm')} </Text>
                                <Image style={{width:35, height:35, margin:5}}source={{uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAACiklEQVR4nO2dS07dQBBF7+RlFWQY8clSw1fsAiHmSZYBWQZS3oPZQypkqZkgoA2t16ds3yPV/J6qdrflQVsyxhhjdst3SdeSNqVuJO0nanr2fM1y95LiVd1L2qPDTSBfM9dvyL3UFR1uAvma2XwguKbDTSBfM1Epmuz5Zi8YyfPNXjCS55u9YCTPV+WnpDNJd5IeRwhNvR6L66mkI7Lx3yRdSnpK0JSAanC/kLQimv83QQMiSf3pPYTLBNKRrM577vlL3nbindpKOuwxgPMEspG0TnoM4F8C0Uhatz0G8JBANJLW8F1p59CSkbw8AHkA+CoMPwF8I8JbEN+MAMpngDwAfBWGnwC+EeEtiG9GAOUzQB4AvgrDTwDfiFjqFjR3gvbHA8Dg/ngAGNwfDwCD++MBYHB/PAAM7o8HgMH98QAwuD8eAAb3xwPA4P54ABjcHw8Ag/vjAWBwfzwADO6PB4DB/fEAMLg/HgAG98cDwOD+eAAY3B8PAIP74wE+ef9PLe9n7wfC/fEAX7z/p1Zj7wfC/fEADff/1OpqCv54gApjtp2W+4FwfzxAha82f2x+3B8PUMEDgAk/AR7ATvEWJJ8BH+EtCCZ8BngAiz4DNg1PwP8p+OMBKtw0DGD4jJHeHw9QYb/hY9yPKfjjAUawVz6srUfkXZeVP6b5KfzxADC4Px4ABvfHA8Dg/ngAGNwfDwCD++MBYHB/PAAM7o8HgMH9W761zL3WPQZwl0A0lnx18WkC0Uhav3oMYPhth6+v15vX1x+oExcJVlskq2Fn6Maq/LaDlo4k9Zv4j8yq/Mxhm6ABAdW2rPzuzX99JpyUN4Al/Fvgobge9/pliTHGGGOMMcYYY4zRLHgGOIO/xt8uZG8AAAAASUVORK5CYII="}}></Image>
                              </View>
                            </View>
                      </TouchableOpacity>)
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
              width: '95%',
              height: '50%',
              justifyContent: "center",
              alignItems: 'center'
            }}>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
  
                <ScrollView>
                  <Text style={{fontSize:24, color:"white", margin:5, textAlign:"center", fontWeight:"500"}}>{format(parseISO(selectedRegistro.hora || selectedRegistro.horaInicio), 'dd/MM/yyyy HH:mm')}</Text>
                  {selectedRegistro.descripcion && (
                    <Text style={{backgroundColor:"#52B69A",fontSize:20, color:"white", margin:5, textAlign:"center", margin:10, padding:10, borderRadius:5}}>Descripción: {selectedRegistro.descripcion}</Text>
                  )}
                  {selectedRegistro.cantidadVasos && (
                    <Text style={{backgroundColor:"#52B69A",fontSize:24, color:"white", margin:5, textAlign:"center", margin:10, padding:15, borderRadius:5}}>Vasos de agua: {selectedRegistro.cantidadVasos} {"("}{selectedRegistro.cantidadVasos * 250} ml{")"}</Text>
                  )}
                  {selectedRegistro.tiempoTotal && (
                    <Text style={{backgroundColor:"#52B69A",fontSize:24, color:"white", margin:5, textAlign:"center", margin:10, padding:15, borderRadius:5}}>Tiempo Total: {selectedRegistro.tiempoTotal}</Text>
                  )}
                  {selectedRegistro.foto && <Image style={{borderColor:"black", borderWidth:2, width:220, height:220,alignSelf:"center"}} source={{uri:selectedRegistro.foto}}></Image>}
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
    padding: 15,
    marginVertical: 2,
    margin:5
  },
})
