import React ,{useState, useRef, useContext, useEffect} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Modal,
    Animated, Easing,
    TouchableOpacity,FlatList,Image
  } from 'react-native';

  import UserContext from '../../../context/userContext';

  import { format , parseISO} from 'date-fns';


import { Calendar, LocaleConfig} from 'react-native-calendars';

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
  
export  const CalendarioNutricionista=(props)=> {

    const { user } = useContext(UserContext);

    const [selectedDate, setSelectedDate] = useState('');
    
    const [showAlert, setShowAlert] = useState(false);
    const opacity = useRef(new Animated.Value(0)).current;

    
  const [turnos,setTurnos]=useState(null);
  const [selectedTurno, setSelectedTurno] = useState(null);

    const obtenerTurnos = async () => {
      try {
        console.log("Obteniendo turnos para el usuario con id:", user.matriculaNacional); // Log adicional
        const response = await fetch(`http://localhost:3000/turno/getTurnosNutricionista?matriculaNacional=${user.matriculaNacional}`);
        if (response.ok) {
          const data = await response.json();
          console.log("Datos obtenidos:", data);
          setTurnos(data);
        }
      } catch (e) {
        console.log('Error al obtener los registros del paciente:', e);
      }
    };
  

    const cancelarTurno=async()=>{

      try {
        console.log("Obteniendo turnos para el cancelar con id:", selectedTurno.id); // Log adicional
        const response = await fetch(`http://localhost:3000/turno/rechazarTurnoNutricionista?id=${selectedTurno.id}`, {method:'POST'});
        if (response.ok) {
  
          console.log("se canceló turno")
          setSelectedTurno(null);
          fadeOut();
        }
      } catch (e) {
        console.log('Error al obtener los registros del paciente:', e);
      }
    }
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
        Animated.timing(opacity, {
          toValue: 0,
          duration: 350,
          easing: Easing.linear,
          useNativeDriver: true,
        }).start(() => setShowAlert(false));
      };
    
      const handleTurnoPress = (item) => {
        setSelectedTurno(item);
      };
  
      const handleTurnoClose = () => {
        setSelectedTurno(null);
        fadeOut();
      };
    

    useEffect(() => {
      obtenerTurnos();
      
    }, []);  
    return (

        <View style={styles.fondoVerde}>
        <View>
          <Text style={styles.bannerPaciente}>Nutricionista</Text>
        </View>
        <View style={{flex:4}}>
        <View style={styles.container}>
          <Calendar
            backgroundColor="rgba(0,0,0,0)"
            onDayPress={onDayPress}
            markedDates={{
              [selectedDate]: { selected: true, selectedColor: '#52B69A' },
            }}
            hideExtraDays={true}
          />
          
        </View>
        </View>
        <Modal visible={showAlert} transparent animationType='none'>
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
            <Text  style={{fontSize:24, color:"white", margin:5, textAlign:"center", fontWeight:"500", margin:10}}> {[selectedDate]}</Text>

                <ScrollView > 

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
                                <Text style={{color:"black", fontWeight:"600", fontSize:18,textAlign:"center", margin:5}}>{format(item.horario, 'HH:mm')}{'\n'}{item.paciente.apellido}, {item.paciente.nombre} </Text>
                                <Image style={{width:35, height:35, margin:5}}source={{uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAACiklEQVR4nO2dS07dQBBF7+RlFWQY8clSw1fsAiHmSZYBWQZS3oPZQypkqZkgoA2t16ds3yPV/J6qdrflQVsyxhhjdst3SdeSNqVuJO0nanr2fM1y95LiVd1L2qPDTSBfM9dvyL3UFR1uAvma2XwguKbDTSBfM1Epmuz5Zi8YyfPNXjCS55u9YCTPV+WnpDNJd5IeRwhNvR6L66mkI7Lx3yRdSnpK0JSAanC/kLQimv83QQMiSf3pPYTLBNKRrM577vlL3nbindpKOuwxgPMEspG0TnoM4F8C0Uhatz0G8JBANJLW8F1p59CSkbw8AHkA+CoMPwF8I8JbEN+MAMpngDwAfBWGnwC+EeEtiG9GAOUzQB4AvgrDTwDfiFjqFjR3gvbHA8Dg/ngAGNwfDwCD++MBYHB/PAAM7o8HgMH98QAwuD8eAAb3xwPA4P54ABjcHw8Ag/vjAWBwfzwADO6PB4DB/fEAMLg/HgAG98cDwOD+eAAY3B8PAIP74wE+ef9PLe9n7wfC/fEAX7z/p1Zj7wfC/fEADff/1OpqCv54gApjtp2W+4FwfzxAha82f2x+3B8PUMEDgAk/AR7ATvEWJJ8BH+EtCCZ8BngAiz4DNg1PwP8p+OMBKtw0DGD4jJHeHw9QYb/hY9yPKfjjAUawVz6srUfkXZeVP6b5KfzxADC4Px4ABvfHA8Dg/ngAGNwfDwCD++MBYHB/PAAM7o8HgMH9W761zL3WPQZwl0A0lnx18WkC0Uhav3oMYPhth6+v15vX1x+oExcJVlskq2Fn6Maq/LaDlo4k9Zv4j8yq/Mxhm6ABAdW2rPzuzX99JpyUN4Al/Fvgobge9/pliTHGGGOMMcYYY4zRLHgGOIO/xt8uZG8AAAAASUVORK5CYII="}}></Image>
                              </View>
                            </View>
                          </TouchableOpacity>)
                        )}
                      />
                    </>
                  )}  
                            
                </ScrollView>

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

            </View>
            <TouchableOpacity onPress={fadeOut}>
              <Text style={{fontSize:20, color:"white", backgroundColor:"#52B69A", textAlign:"center", padding:10, borderRadius:15, margin:15}}>Cerrar</Text>
            </TouchableOpacity> 

            </Animated.View>

        </View>
        </Modal>
        
      </View>
      );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#52B69A',
      
    },

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
      padding: 12,
      marginVertical: 3,
      margin:5
    },
  });
  
