import React,{ useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Animated, Easing, Platform
  
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker'



export const RegistroTipoComida=(props)=>{
  const [showAlert, setShowAlert] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };
  const fadeOut = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => setShowAlert(false));
    return(props.navigation.navigate('RegistroComida'))
  };
  const handleShowAlert = () => {
    setShowAlert(true);
    fadeIn();
  };

  const handleSave = () => {
    // Agrega aquí la lógica para guardar los cambios.
    // Luego, cierra la alerta con una animación de salida.
    fadeOut();
    return(props.navigation.navigate('RegistroComida'))
  };

  
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === 'android' ? false : showPicker); // Oculta el selector en iOS
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShowPicker(true);
  };
  
  const obtenerHora = () => {
    
    const hora = date.getHours();
    const minutos = date.getMinutes();
    return `${hora}:${minutos < 10 ? '0' : ''}${minutos}`;
  };
  
  return(
    <View style={styles.fondoVerde}>
      <View>
        <Text style={styles.bannerPaciente}>Paciente</Text>
      </View>
      <View style={{flex:4}}>
        <View>
          <Text style={styles.textoTipoRegistroComida}>Comida</Text>
        </View>
        <View>
          <TextInput  style={styles.botonTipoRegistroComida} placeholder="Descripcion" placeholderTextColor={"black"}></TextInput>
          <TouchableOpacity  style={styles.botonTipoRegistroComida} onPress={showDatepicker}><Text style={{color:"black", textAlign:"center",fontSize:20, fontWeight:"600"}}>Seleccionar hora: {obtenerHora()}</Text></TouchableOpacity>
          {showPicker && (<DateTimePicker
              value={date}
              mode="time" // Puedes usar 'date' para solo fecha o 'time' para solo hora
              is24Hour={true}
              display="default"
              onChange={onChange}
          />)}
          <TextInput  style={styles.botonTipoRegistroComida} placeholder="Foto" placeholderTextColor={"black"}></TextInput>
          
        </View>
        <TouchableOpacity onPress={handleShowAlert} style={{backgroundColor:"#52B69A",borderRadius:30, padding:20, margin:25}}><Text style={{fontSize:25,textAlign:"center", fontWeight:"bold", color:"white"}}>Añadir registro</Text></TouchableOpacity>
        <Modal visible={showAlert} transparent animationType="none">
        <TouchableOpacity
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0)' }}
          onPress={fadeOut}
        >
          <Animated.View
            style={{
              backgroundColor:"#76C893",
              padding: 25,
              borderRadius: 15,
              opacity: opacity,
            }}
          >
            <Text  style={{fontSize:25, color:"white", margin:10}}>¿Deseas añadir este registro?</Text>
            <TouchableOpacity onPress={handleSave}>
              <Text style={{fontSize:20, color:"white", backgroundColor:"#52B69A", textAlign:"center", padding:10, borderRadius:15, margin:10}}>Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={fadeOut}>
              <Text style={{fontSize:20, color:"white", backgroundColor:"#52B69A", textAlign:"center", padding:10, borderRadius:15, margin:10}}>Cancelar</Text>
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
        </Modal>
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
  textoTipoRegistroComida:{ 
    color:"#99D98C", 
    fontWeight:"400",
    margin:20, 
    textAlign:"left", 
    fontSize:50, 
    borderRadius:10
  },
  botonTipoRegistroComida:{
    backgroundColor:"white", 
    margin:35, 
    padding:10, 
    borderRadius:30,
    color:"black", 
    textAlign:"center",
    fontSize:20, 
    fontWeight:"600"
  }
})
