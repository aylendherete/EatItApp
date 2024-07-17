import React from 'react';
import {StyleSheet,Text,View,TextInput,TouchableOpacity,Alert, Image,} from 'react-native';
import UserContext from '../context/userContext';
import messaging from '@react-native-firebase/messaging'

export const Inicio=(props)=> {

  const {setUser}=React.useContext(UserContext);
  const [email,setEmail]=React.useState("");
  const [contrasenia, setContrasenia]= React.useState("");

  async function handleLogin(email, contrasenia){
    const token= await messaging().getToken();
    console.log("TOKEN",token);

    const loginCheckPaciente= await fetch('http://localhost:3000/paciente/login?email='+email+'&contrasenia='+contrasenia+'&token='+token)

    if (loginCheckPaciente.ok ){
      let data= await loginCheckPaciente.json();
      const userData={
        id: data.id,
        nombre:data.nombre,
        apellido:data.apellido,
        email:email,
        contrasenia:contrasenia,
        matriculaNacionalNutricionista:data.matriculaNacionalNutricionista,
        telefono:data.telefono
      }
      setUser(userData)
      console.log("entra paciente");

      //se ve estado del paciente
      if(data.enviarSolicitudNutricionista==false && data.matriculaNacionalNutricionista==null){
        return props.navigation.navigate("ElegirNutricionista");
      }
      else if (data.enviarSolicitudNutricionista!=false && data.matriculaNacionalNutricionista!=null){
        return props.navigation.navigate("Paciente");
      }
      else{
        return props.navigation.navigate("CartelSolicitud");
      }
      
    }
    else{
      const loginCheckNutricionista= await fetch('http://localhost:3000/nutricionista/login?email='+email+'&contrasenia='+contrasenia+'&token='+token)

      if(loginCheckNutricionista.ok){
          let data=await loginCheckNutricionista.json();
         
          const userData={
            matriculaNacional: data.matriculaNacional,
            nombre:data.nombre,
            apellido:data.apellido,
            email:email,
            contrasenia:contrasenia,
            telefono:data.telefono
          }
          setUser(userData)
          console.log("entra nutricionista")
          return props.navigation.navigate("Nutricionista");
          
        }else{
          Alert.alert("No se encontro el usuario")
    
        }
    }
    
  }

  return(
    <View style={styles.fondoVerde}>
      
      <View style={styles.fondoVerde}>
        <View style={{flex: 1,justifyContent: 'center',alignItems: 'center',}}>
          <Image
              source={require('./imgs/logo.png')} 
              style={styles.logo}
            />
        </View>
      </View>
      <View style={styles.fondoBlanco}>
        
        <Text style={styles.textoBienvenido}>¡Bienvenido!</Text>
        <View style={styles.textoInputInicioSesion}>
          <TextInput placeholder="  e-mail" placeholderTextColor={"black"} onChangeText={setEmail} color={"black"}></TextInput>
        </View>
        <View style={styles.textoInputInicioSesion}>
          <TextInput placeholder="  contraseña" placeholderTextColor={"black"} onChangeText={setContrasenia}  color={"black"} secureTextEntry={true}></TextInput>
        </View>
        <TouchableOpacity onPress={()=>props.navigation.navigate('TipoRegistro')}><Text style={styles.textoRegistro}>¿No tienes una cuenta? Registrate</Text></TouchableOpacity>
        <View style={styles.botonIniciarSesion}><TouchableOpacity onPress={()=>handleLogin(email, contrasenia)}><Text style={styles.textoBotonIniciarSesion}>Iniciar Sesion</Text></TouchableOpacity></View>
      </View>
      
    </View>
  );
}

const styles=StyleSheet.create({
  fondoVerde:{
    backgroundColor:'#99D98C',
    flex:1
  },
  fondoBlanco:{
    backgroundColor:'white',
    flex:3,borderTopLeftRadius:120,
    borderTopRightRadius:120
  },
  textoBienvenido:{
    textAlign:"center",
    fontSize:35,
    color:"black",
    fontWeight:'bold',
    marginTop:80
  },
  textoInputInicioSesion:{
    textAlign:"center",
    backgroundColor:"#DBDBDB",
    borderRadius:20,
    margin:20,
    color:"black"
  },
  textoRegistro:{
    color:"black",
    textAlign:"center",
    fontSize:15
  },
  botonIniciarSesion:{
    justifyContent:"center",
    margin:20,
    marginBottom:120
  },
  textoBotonIniciarSesion:{
    textAlign:"center", 
    fontSize:30,
    fontFamily:"Serif-Sans",
    color:"black",
    fontWeight:'bold',
    backgroundColor:"#99D98C",
    borderRadius:20,
    margin:15,
    padding:20
  },logo:{
    alignSelf: 'center', 
    width: 150, 
    height: 150, 

  }
})