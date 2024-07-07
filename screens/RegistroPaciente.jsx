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


export const RegistroPaciente=(props)=> {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const [email,setEmail]=React.useState("");
  const [nombre1,setNombre]=React.useState("");
  const [apellido1,setApellido]=React.useState("");
  const [contrasenia1, setContrasenia]= React.useState("");
  const [dni1,setDni]=React.useState("");
  const [telefono1,setTelefono]=React.useState("");
  const [objetivo1,setObjetivo]=React.useState("");
  const [antecedentes1,setAntecedentes]=React.useState("");
  console.log(JSON.stringify(props));

  const checkContraseña=(contraseniaBackup)=>{
    if(contrasenia1!=contraseniaBackup){
      console.log("NO COINCIDEN")
    }
  }
  async function handleCreatePaciente(){
    try{
      const crearPaciente= await fetch('http://localhost:3000/paciente/createPaciente',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          email:email,
          contrasenia:contrasenia1,
          nombre:nombre1,
          apellido:apellido1,
          telefono:telefono1,
          fechaNacimiento:date,
          dni:dni1,
          objetivo:objetivo1,
          antecedentes:antecedentes1,
          
          
        })
      });
    
      if (crearPaciente.ok ){
        let data= await crearPaciente.json();
        console.log("crea nutricionista");
        return props.navigation.navigate("Inicio");
        
      }
      else{
        
        console.log(crearPaciente.status);
        
        console.log(email+","+contrasenia1+","+nombre1+","+apellido1+","+telefono1+","+date+","+dni1+","+objetivo1+","+antecedentes1)

      }
  }catch(e){
    console.log(crearPaciente.status);
    console.log(email+","+contrasenia1+","+nombre1+","+apellido1+","+telefono1+","+date+","+dni1+","+objetivo1+","+antecedentes1)

   

  }
  
  }

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
      <Text style={styles.textoTipoRegistro}>Soy paciente</Text>
    </View>
    <View style={styles.fondoVerdeClaro}>
        <ScrollView>
        <View style={styles.inputRegistro}>
          <TextInput onChangeText={setNombre}placeholder="  Nombre" placeholderTextColor={"white"}></TextInput>
        </View>
        
        <View style={styles.inputRegistro}>
          <TextInput onChangeText={setApellido} placeholder="  Apellido" placeholderTextColor={"white"}></TextInput>
        </View>
        <View style={styles.inputRegistro}>
          <TextInput onChangeText={setEmail} placeholder="  E-mail" placeholderTextColor={"white"}></TextInput>
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
          <TextInput onChangeText={setDni} keyboardType="number-pad" placeholder="  DNI" placeholderTextColor={"white"}></TextInput>
        </View>
        <View style={styles.inputRegistro}>
          <TextInput onChangeText={setTelefono} keyboardType="number-pad" placeholder="  Telefono" placeholderTextColor={"white"}></TextInput>
        </View>
        <View style={styles.inputRegistro}>
          <TextInput  onChangeText={setContrasenia}secureTextEntry placeholder="  Contraseña" placeholderTextColor={"white"}></TextInput>
        </View>
        <View style={styles.inputRegistro}>
          <TextInput  secureTextEntry placeholder="  Confirmar contraseña" placeholderTextColor={"white"}></TextInput>
        </View>
        <View style={styles.inputRegistro}>
          <TextInput onChangeText={setObjetivo} placeholder="  Escribir objetivo" placeholderTextColor={"white"}></TextInput>
        </View>
        <View style={styles.inputRegistro}>
          <TextInput onChangeText={setAntecedentes}  placeholder="  Antecedentes" placeholderTextColor={"white"}></TextInput>
        </View>
        <View style={styles.botonRegistrarme}>
          <TouchableOpacity onPress={handleCreatePaciente}>
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