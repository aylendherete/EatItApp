import React from 'react';
import {StyleSheet,Text,View,TouchableOpacity,TextInput,ScrollView,Alert} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'


export const RegistroPaciente=(props)=> {
  const [fecha, setFecha] = React.useState(new Date());
  const [showPicker, setShowPicker] = React.useState(false);

  const [email,setEmail]=React.useState("");
  const [nombre,setNombre]=React.useState("");
  const [apellido,setApellido]=React.useState("");
  const [contrasenia, setContrasenia]= React.useState("");
  const [dni,setDni]=React.useState("");
  const [telefono,setTelefono]=React.useState("");
  const [objetivo,setObjetivo]=React.useState("");
  const [antecedentes,setAntecedentes]=React.useState("");
  const [contraseniaBackup,setContraseniaBackup]=React.useState("");

  
  async function handleCreatePaciente(){
    if(contrasenia!=contraseniaBackup || email=="" || nombre==""||apellido==""||contrasenia==""||dni==""||telefono==""){
      Alert.alert("Contraseñas no coinciden o campos obligatorios en blanco")
      return
    }
    try{
      const crearPaciente= await fetch('http://localhost:3000/paciente/createPaciente',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          email:email,
          contrasenia:contrasenia,
          nombre:nombre,
          apellido:apellido,
          telefono:telefono,
          fechaNacimiento:fecha,
          dni:dni,
          objetivo:objetivo,
          antecedentes:antecedentes,
          
          
        })
      });
    
      if (crearPaciente.ok ){
        console.log("crea nutricionista");
        return props.navigation.navigate("Inicio");
        
      }
    }catch(e){
      console.log(e);

    }
  
  }

  const onChange = (event, selectedDate) => {
    setShowPicker(Platform.OS === 'android' ? false : showPicker);
    setFecha(selectedDate || fecha);
  };


  return(  
  <View style={styles.fondoVerde}>
    <View style={styles.fondoVerde}>
      <Text style={styles.textoTipoRegistro}>Soy paciente</Text>
    </View>
    <View style={styles.fondoVerdeClaro}>
        <ScrollView>
        <View style={styles.inputRegistro}>
          <TextInput onChangeText={setNombre}placeholder="  *Nombre" placeholderTextColor={"white"}></TextInput>
        </View>
        
        <View style={styles.inputRegistro}>
          <TextInput onChangeText={setApellido} placeholder="  *Apellido" placeholderTextColor={"white"}></TextInput>
        </View>
        <View style={styles.inputRegistro}>
          <TextInput onChangeText={setEmail} placeholder="  *E-mail" placeholderTextColor={"white"}></TextInput>
        </View>

        <TouchableOpacity  style={styles.inputRegistro} onPress={()=>{setShowPicker(true)}}><Text style={styles.inputRegistro}> *Seleccionar fecha de nacimiento  {fecha.toDateString()}</Text></TouchableOpacity>
          {showPicker && (<DateTimePicker
              value={fecha}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChange}
          />)}

        <View style={styles.inputRegistro}>
          <TextInput onChangeText={setDni} keyboardType="number-pad" placeholder="  *DNI" placeholderTextColor={"white"}></TextInput>
        </View>
        <View style={styles.inputRegistro}>
          <TextInput onChangeText={setTelefono} keyboardType="number-pad" placeholder="  *Telefono" placeholderTextColor={"white"}></TextInput>
        </View>
        <View style={styles.inputRegistro}>
          <TextInput  onChangeText={setContrasenia}secureTextEntry placeholder="  *Contraseña" placeholderTextColor={"white"}></TextInput>
        </View>
        <View style={styles.inputRegistro}>
          <TextInput onChangeText={setContraseniaBackup} secureTextEntry placeholder="  *Confirmar contraseña" placeholderTextColor={"white"}></TextInput>
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
    color:"white",
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