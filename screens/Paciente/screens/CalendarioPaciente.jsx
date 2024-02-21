import React,{useState, useRef}  from 'react';
import { Calendar,LocaleConfig} from 'react-native-calendars';

import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Modal,
    Animated, Easing,
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

export const CalendarioPaciente=(props)=>{
  const [selectedDate, setSelectedDate] = useState('');
    
  const [showAlert, setShowAlert] = useState(false);

  const [showAlertTurno, setShowAlertTurno]=useState(false);
  const [showAlertRegistroComida, setShowAlertRegistroComida]=useState(false);
  const [showAlertRegistroActividad, setShowAlertRegistroActividad]=useState(false);
  const [showAlertRegistroAgua, setShowAlertRegistroAgua]=useState(false)

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
  const onTurnoPress=()=>{
    setShowAlertTurno(true);
    fadeIn();

  }
  const onRegistroComidaPress=()=>{
    setShowAlertRegistroComida(true);
    fadeIn();
    
  }
  
  const onRegistroActividadPress=()=>{
    setShowAlertRegistroActividad(true);
    fadeIn();
    
  }
  const onRegistroAguaPress=()=>{
    setShowAlertRegistroAgua(true);
    fadeIn();
    
  }

  const fadeOutRegistroAgua=()=>{
    Animated.timing(opacity, {
      toValue: 0,
      duration: 350,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => setShowAlertRegistroAgua(false));

    Animated.timing(opacity, {
      toValue: 0,
      duration: 350,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => setShowAlert(false));
  }


  const fadeOutRegistroComida=()=>{
    Animated.timing(opacity, {
      toValue: 0,
      duration: 350,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => setShowAlertRegistroComida(false));

    Animated.timing(opacity, {
      toValue: 0,
      duration: 350,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => setShowAlert(false));
  }
  const fadeOutRegistroActividad=()=>{
    Animated.timing(opacity, {
      toValue: 0,
      duration: 350,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => setShowAlertRegistroActividad(false));

    Animated.timing(opacity, {
      toValue: 0,
      duration: 350,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => setShowAlert(false));
  }

  const fadeOutTurno = () => {
    setShowAlert(false)
    Animated.timing(opacity, {
      toValue: 0,
      duration: 350,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => setShowAlertTurno(false));

    Animated.timing(opacity, {
      toValue: 0,
      duration: 350,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => setShowAlert(false));
  };
  const fadeOut = () => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 350,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => setShowAlert(false));
    };
  return(
      <View style={styles.fondoVerde}>
        
        <View style={{flex:4}}>
        
        <View style={styles.container}>
          <ScrollView>
            <Text style={{color:"white", fontWeight:"200", fontSize:25, margin:10}}>Tu calendario</Text>
            <Calendar
              onDayPress={onDayPress}
              markedDates={{
                [selectedDate]: { selected: true, selectedColor: '#52B69A' },
              }}
              hideExtraDays={true}
            />

            <TouchableOpacity onPress={()=>props.navigation.navigate('TurnosPaciente')}><Text style={{backgroundColor:"#52B69A",color:"white", textAlign:"center", fontWeight:"bold", fontSize:25, margin:50,padding:15, borderRadius:10}}>¡Pedi un turno!</Text></TouchableOpacity>
            

          </ScrollView>
          
          
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
                    <TouchableOpacity onPress={onTurnoPress}>
                    <Text style={styles.registroDiario}>Cita con nutricionista a las 19:00hs</Text>

                    </TouchableOpacity>     
                    <TouchableOpacity onPress={onRegistroComidaPress}>
                      <Text style={styles.registroDiario}>Registro de Comida a las 18:00hs </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onRegistroActividadPress}>
                      <Text style={styles.registroDiario}>Registro de Actividad a las 15:00hs </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={onRegistroAguaPress}>
                      <Text style={styles.registroDiario}>Registro de Agua a las 18:10hs </Text>
                    </TouchableOpacity>
                
                    <TouchableOpacity onPress={onRegistroComidaPress}>
                      <Text style={styles.registroDiario}>Registro de Comida a las 12:00hs </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onRegistroComidaPress}>
                      <Text style={styles.registroDiario}>Registro de Comida a las 10:00hs </Text>
                    </TouchableOpacity>

                    
                    
                </ScrollView>
            </View>
            <TouchableOpacity onPress={fadeOut}>
              <Text style={{fontSize:20, color:"white", backgroundColor:"#52B69A", textAlign:"center", padding:10, borderRadius:15, margin:15}}>Cerrar</Text>
            </TouchableOpacity> 

            </Animated.View>

        </View>
        </Modal>

        <Modal visible={showAlertTurno} transparent animationType='slide'>
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
            <TouchableOpacity onPress={fadeOutTurno}><Text style={{fontSize:20, color:"white", backgroundColor:"#52B69A", textAlign:"center", padding:10, borderRadius:15, margin:15, fontWeight:"500"}}>Cancelar Turno</Text></TouchableOpacity>
            <TouchableOpacity onPress={fadeOutTurno}><Text style={{fontSize:20, color:"white", backgroundColor:"#52B69A", textAlign:"center", padding:10, borderRadius:15, margin:15, fontWeight:"400"}}>Cerrar</Text></TouchableOpacity>
            
            </View>

            </Animated.View>

        </View>
        </Modal>
        <Modal visible={showAlertRegistroComida} transparent animationType='slide'>
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
            <Text  style={{fontSize:24, color:"white", margin:5, textAlign:"center", fontWeight:"500", margin:10}}>Registro del dia {[selectedDate]}</Text>
            <Text  style={{backgroundColor:"#52B69A",fontSize:24, color:"white", margin:5, textAlign:"center", margin:10, padding:15, borderRadius:5}}>Descripcion comida</Text>
            <Text  style={{backgroundColor:"white",fontSize:20, color:"black", margin:5, textAlign:"center", fontWeight:"500", margin:10,padding:15, borderRadius:5}}>Comentario Nutricionista</Text>


            <TouchableOpacity onPress={fadeOutRegistroComida}><Text style={{fontSize:20, color:"white", backgroundColor:"#52B69A", textAlign:"center", padding:10, borderRadius:15, margin:15, fontWeight:"500"}}>Cerrar</Text></TouchableOpacity>
            </View>

            </Animated.View>

        </View>
        </Modal>

        <Modal visible={showAlertRegistroActividad} transparent animationType='slide'>
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
            <Text  style={{fontSize:24, color:"white", margin:5, textAlign:"center", fontWeight:"500", margin:10}}>Registro del dia {[selectedDate]}</Text>
            <Text  style={{backgroundColor:"#52B69A",fontSize:24, color:"white", margin:5, textAlign:"center", margin:10, padding:15, borderRadius:5}}>Descripcion actividad</Text>
            <Text  style={{backgroundColor:"#52B69A",fontSize:24, color:"white", margin:5, textAlign:"center", margin:10, padding:15, borderRadius:5}}>18:00hs (2 horas)</Text>
            <Text  style={{backgroundColor:"white",fontSize:20, color:"black", margin:5, textAlign:"center", fontWeight:"500", margin:10,padding:15, borderRadius:5}}>Comentario Nutricionista</Text>


            <TouchableOpacity onPress={fadeOutRegistroActividad}><Text style={{fontSize:20, color:"white", backgroundColor:"#52B69A", textAlign:"center", padding:10, borderRadius:15, margin:15, fontWeight:"500"}}>Cerrar</Text></TouchableOpacity>
            </View>

            </Animated.View>

        </View>
        </Modal>

        <Modal visible={showAlertRegistroAgua} transparent animationType='slide'>
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
            <Text  style={{fontSize:24, color:"white", margin:5, textAlign:"center", fontWeight:"500", margin:10}}>Registro del dia {[selectedDate]}</Text>
            <Text  style={{backgroundColor:"#52B69A",fontSize:24, color:"white", margin:5, textAlign:"center", margin:10, padding:15, borderRadius:5}}> 8 vasos (2000 ml)</Text>


            <TouchableOpacity onPress={fadeOutRegistroAgua}><Text style={{fontSize:20, color:"white", backgroundColor:"#52B69A", textAlign:"center", padding:10, borderRadius:15, margin:15, fontWeight:"500"}}>Cerrar</Text></TouchableOpacity>
            </View>

            </Animated.View>

        </View>
        </Modal>
        
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
      
  }
})
