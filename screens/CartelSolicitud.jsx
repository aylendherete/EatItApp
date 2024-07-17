import React ,{useContext}from 'react';
import {StyleSheet,Text,View, Image, TouchableOpacity} from 'react-native';
import UserContext from '../context/userContext';

export const CartelSolicitud=(props)=>{
  const {user,setUser}= useContext(UserContext)
  const logOut=()=>{
    setUser(null)
    return props.navigation.navigate("Inicio");
  }

  return(
      
    <View style={styles.fondoVerde}>
      <View style={styles.fondoVerde}>
        <View style={styles.logoContainer}>
          <Image
            source={require('./imgs/logo.png')}
            style={styles.logo}
          />
        </View>
      </View>
      <View style={styles.fondoVerdeClaro}>
        <View style={styles.cartelContainer}>
            <Text style={styles.titleCartel}>¡Ya le enviamos al nutricionista la solicitud!</Text>
            <Text style={styles.cartelDescription}>En el caso de que rechace la solicitud deberas volver a elegir otro nutricionista</Text>
            <TouchableOpacity style={styles.logOutButton} onPress={logOut}><Text style={styles.logOutTextButton}>Cerrar Sesión</Text></TouchableOpacity>
        </View>

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
  },logo:{
    alignSelf: 'center', 
    width: 150, 
    height: 150, 

  },logoContainer:{
    flex: 1,justifyContent: 'center',
    alignItems: 'center'
  },
  cartelContainer:{
    backgroundColor:"#52B69A",
    opacity:0.9, 
    borderRadius:10, 
    justifyContent:"center", 
    padding:10, 
    alignItems:"center",
    margin:30
  },
  titleCartel:{
    fontSize:35, 
    fontWeight:"800", 
    color:"white", 
    justifyContent:"center", 
    textAlign:"center",
    padding:10
  },
  cartelDescription:{
    fontSize:16, 
    fontWeight:"300", 
    color:"white", 
    justifyContent:"center", 
    textAlign:"center",
    padding:10
  },
  logOutButton:{
    backgroundColor:"#32A09B", 
    padding:10, 
    borderRadius:10
  },
  logOutTextButton:{
    justifyContent:"center", 
    fontSize:25,
    color:"white", 
    fontWeight:"800"
  }
})
