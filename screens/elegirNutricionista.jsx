import React from 'react';
import {StyleSheet,Text,View,TouchableOpacity,FlatList} from 'react-native';
import UserContext from '../context/userContext';

export const ElegirNutricionista=(props)=>{
  const {user}= React.useContext(UserContext)
  const [nutricionistas,setNutricionistas]=React.useState([])

  const obtenerNutricionistas=async ()=>{
    var nutricionistas=await fetch('http://localhost:3000/nutricionista/')
    if(nutricionistas.ok){
      nutricionistas=await nutricionistas.json();
      setNutricionistas(nutricionistas)
    }
  }

  async function handleEnviarSolicitud( matriculaNacional){
    try{
      const enviarSolicitud= await fetch('http://localhost:3000/paciente/enviarSolicitud?email='+user.email)
      const crearNotificacion= await fetch('http://localhost:3000/notificacionesNutricionista/createNotificacionSolicitudPaciente',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          matriculaNacional:matriculaNacional,
          idUsuario: user.id
        })
      })
      if (enviarSolicitud.ok && crearNotificacion.ok ){
        console.log("se envio solicitud")
        
        return props.navigation.navigate("Inicio");
        
      }
    }
    catch(e){
      console.log(e);
    }
  }

  React.useEffect(()=>{
    obtenerNutricionistas()
  },[])

  return(
    <View style={styles.fondoVerde}>
      <View style={styles.fondoVerde}>
          <Text style={styles.titleElegir}>Elegi el nutricionista!</Text>
      </View>
      <View style={styles.fondoVerdeClaro}>
        <FlatList
          data={nutricionistas}
          ListEmptyComponent={
            <View>
              <Text styles={styles.noInformation}>No hay nutricionistas</Text>
            </View>
          }
          renderItem={({item})=>
            <View style={styles.container}>
              <TouchableOpacity onPress={()=>handleEnviarSolicitud(item.matriculaNacional)}>
              <Text style={styles.nombreApellidoNutricionista}>{item.nombre} {item.apellido}</Text>
              <Text style={styles.matriculaNacionalTexto}>MN: {item.matriculaNacional}</Text>
              </TouchableOpacity>
            </View>
          }
        />
      </View>  
    </View>
  );
}


const styles=StyleSheet.create({
  container:{
    backgroundColor:"#52B69A",
    borderRadius:10, 
    padding:20, 
    margin:15
  },
  fondoVerde:{
    backgroundColor:"#99D98C", 
    flex:1,
    justifyContent:"center"
  },
 
  fondoVerdeClaro:{
    backgroundColor:"#D9ED92",
    flex:3,borderTopLeftRadius:120,
    borderTopRightRadius:120,
    justifyContent:"center"
    
  },
  botonTipo:{
    justifyContent:"center",
    margin:5,
  },
  textoTipo:{
    textAlign:"center", 
    fontSize:25,
    fontFamily:"Serif-Sans", 
    color:"white", 
    fontWeight:'bold', 
    backgroundColor:"#99D98C", 
    borderRadius:20, 
    margin:5,
    padding:15
  },titleElegir:{
    fontWeight:"500", 
    fontSize:35, 
    textAlign:"center", 
    color:"white"
  },noInformation:{
    fontSize:15,
    fontWeight:"500",
    textAlign:"center"
  },nombreApellidoNutricionista:{
    color:"white", 
    fontSize:25, 
    fontWeight:"bold"
  },matriculaNacionalTexto:{
    color:"white", 
    fontWeight:"300", 
    fontSize:15
  }
})