/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,FlatList
} from 'react-native';


import UserContext from '../context/userContext';



export const ElegirNutricionista=(props)=>{
  const {user}= useContext(UserContext)
  
  const [nutricionistas,setNutricionistas]=React.useState([])


  const obtenerNutricionistas=async ()=>{
    var nutricionistas=await fetch('http://localhost:3000/nutricionista/')
    if(nutricionistas.ok){
      nutricionistas=await nutricionistas.json();
      setNutricionistas(nutricionistas)
    }
  }
  async function handleEnviarSolicitud(email){
    try{
      const enviarSolicitud= await fetch('http://localhost:3000/paciente/enviarSolicitud?email='+user.email)
        if (enviarSolicitud.ok ){
          console.log("se envio solicitud")
          console.log(email)
          return props.navigation.navigate("Inicio");
          
        }
        else{  
          console.log(crearNutricionista.status);
         
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
          <Text style={{fontWeight:"500", fontSize:35, textAlign:"center", color:"white"}}>Elegi el nutricionista!</Text>
      </View>
      <View style={styles.fondoVerdeClaro}>
          

          <FlatList
            data={nutricionistas}
            ListEmptyComponent={
              <View>
                <Text>No hay nutricionistas</Text>
              </View>
            }
            renderItem={({item})=>
              <View style={{backgroundColor:"#52B69A",borderRadius:10, padding:20, margin:15}}><TouchableOpacity onPress={()=>handleEnviarSolicitud(user.email)}>
                <Text style={{color:"white", fontSize:25, fontWeight:"bold"}}>{item.nombre} {item.apellido}</Text>
                <Text style={{color:"white", fontWeight:"300", fontSize:15}}>{item.matriculaNacional}</Text>
                </TouchableOpacity>
              </View>
            }
          />

        
          </View>  
        
          
      </View>
      );
}


const styles=StyleSheet.create({
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
  }
})