import React ,{useState, useRef} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Modal,
    Animated, Easing,
    TouchableOpacity
  } from 'react-native';

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
    const [selectedDate, setSelectedDate] = useState('');
    
    const [showAlert, setShowAlert] = useState(false);
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
        Animated.timing(opacity, {
          toValue: 0,
          duration: 350,
          easing: Easing.linear,
          useNativeDriver: true,
        }).start(() => setShowAlert(false));
      };
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
            <Text  style={{fontSize:24, color:"white", margin:5, textAlign:"center", fontWeight:"500", margin:10}}>Fecha seleccionada: {[selectedDate]}</Text>
                <ScrollView > 
                    <Text style={styles.registroDiario}>Cita con Paciente: Nombre Apellido {'\n'}A las 19:00hs</Text>
                    <Text style={styles.registroDiario}>Cita con Paciente: Nombre Apellido {'\n'}A las 19:00hs</Text>
                    <Text style={styles.registroDiario}>Cita con Paciente: Nombre Apellido {'\n'}A las 19:00hs</Text>
                    <Text style={styles.registroDiario}>Cita con Paciente: Nombre Apellido {'\n'}A las 19:00hs</Text>
                    <Text style={styles.registroDiario}>Cita con Paciente: Nombre Apellido {'\n'}A las 19:00hs</Text>
                    <Text style={styles.registroDiario}>Cita con Paciente: Nombre Apellido {'\n'}A las 19:00hs</Text>
                    <Text style={styles.registroDiario}>Cita con Paciente: Nombre Apellido {'\n'}A las 19:00hs</Text>
                    <Text style={styles.registroDiario}>Cita con Paciente: Nombre Apellido {'\n'}A las 19:00hs</Text>
                    <Text style={styles.registroDiario}>Cita con Paciente: Nombre Apellido {'\n'}A las 19:00hs</Text>
                    <Text style={styles.registroDiario}>Cita con Paciente: Nombre Apellido {'\n'}A las 19:00hs</Text>
                    <Text style={styles.registroDiario}>Cita con Paciente: Nombre Apellido {'\n'}A las 19:00hs</Text>
                    <Text style={styles.registroDiario}>Cita con Paciente: Nombre Apellido {'\n'}A las 19:00hs</Text>
                    <Text style={styles.registroDiario}>Cita con Paciente: Nombre Apellido {'\n'}A las 19:00hs</Text>
                    <Text style={styles.registroDiario}>Cita con Paciente: Nombre Apellido {'\n'}A las 19:00hs</Text>
                    <Text style={styles.registroDiario}>Cita con Paciente: Nombre Apellido {'\n'}A las 19:00hs</Text>

                    <Text style={styles.registroDiario}>Cita con Paciente: Nombre Apellido {'\n'}A las 19:00hs</Text>
                    <Text style={styles.registroDiario}>Cita con Paciente: Nombre Apellido {'\n'}A las 19:00hs</Text>
                    <Text style={styles.registroDiario}>Cita con Paciente: Nombre Apellido {'\n'}A las 19:00hs</Text>
                    <Text style={styles.registroDiario}>Cita con Paciente: Nombre Apellido {'\n'}A las 19:00hs</Text>
                    
                </ScrollView>
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
        
    }
  });
  
