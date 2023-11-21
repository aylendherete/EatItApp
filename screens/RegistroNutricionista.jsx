/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React,{useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView
} from 'react-native';


import DateTimePicker from '@react-native-community/datetimepicker'



export const RegistroNutricionista=(props)=>{
  
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
  return(
    
  <View style={styles.fondoVerde}>
    <View style={styles.fondoVerde}>
      <Text style={styles.textoTipoRegistro}>Soy nutricionista</Text>
    </View>
    <View style={styles.fondoVerdeClaro}>
        <ScrollView>
        <View style={styles.inputRegistro}>
          <TextInput placeholder="  Nombre" placeholderTextColor={"white"}></TextInput>
        </View>
        
        <View style={styles.inputRegistro}>
          <TextInput placeholder="  Apellido" placeholderTextColor={"white"}></TextInput>
        </View>
        <View style={styles.inputRegistro}>
          <TextInput placeholder="  E-mail" placeholderTextColor={"white"}></TextInput>
        </View>


        <TouchableOpacity  style={styles.inputRegistro} onPress={showDatepicker}><Text style={{backgroundColor:"#B5E48C",borderRadius:20, flex:0.3,margin:15, color:"white"}}>Seleccionar fecha de nacimiento  {date.toDateString()}</Text></TouchableOpacity>
          {showPicker && (<DateTimePicker
              value={date}
              mode="date" // Puedes usar 'date' para solo fecha o 'time' para solo hora
              is24Hour={true}
              display="default"
              onChange={onChange}
          />)}

        
        <View style={styles.inputRegistro}>
          <TextInput keyboardType="number-pad" placeholder="  DNI" placeholderTextColor={"white"}></TextInput>
        </View>
        <View style={styles.inputRegistro}>
          <TextInput keyboardType="number-pad" placeholder="  Matricula Nacional" placeholderTextColor={"white"}></TextInput>
        </View>
        <View style={styles.inputRegistro}>
          <TextInput keyboardType="number-pad" placeholder="  Telefono" placeholderTextColor={"white"}></TextInput>
        </View>
        <View style={styles.inputRegistro}>
          <TextInput secureTextEntry placeholder="  Contraseña" placeholderTextColor={"white"}></TextInput>
        </View>
        <View style={styles.inputRegistro}>
          <TextInput  secureTextEntry placeholder="  Confirmar contraseña" placeholderTextColor={"white"}></TextInput>
        </View>
        <View style={styles.botonRegistrarme}>
          <TouchableOpacity onPress={()=>props.navigation.navigate('Inicio')}>
            <Text style={styles.textoBotonRegistrarme}>Registrarme</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
       
    </View>
      
  </View>
  );
}
const styles=StyleSheet.create({
  fondoVerde:{
    backgroundColor:"#99D98C", 
    flex:1
  },
 
  fondoVerdeClaro:{
    backgroundColor:"#D9ED92",
    flex:3,borderTopLeftRadius:120,
    borderTopRightRadius:120,
    justifyContent:"center"
    
  },
  botonRegistrarme:{
    justifyContent:"center",
    margin:20,
    marginBottom:120
  },
  textoBotonRegistrarme:{
    textAlign:"center", 
    fontSize:30,
    fontFamily:"Serif-Sans",
    color:"white",
    fontWeight:'bold',
    backgroundColor:"#52B69A",
    borderRadius:20,
    padding:15
  },
  inputRegistro:{
    backgroundColor:"#B5E48C",
    borderRadius:20,
    flex:0.3,
    margin:10
  },
  textoTipoRegistro:{
    textAlign:"center",
    fontSize:30,
    fontFamily:"Serif-Sans",
    color:"white",
    fontWeight:'bold',
    marginTop:100
  }
})
