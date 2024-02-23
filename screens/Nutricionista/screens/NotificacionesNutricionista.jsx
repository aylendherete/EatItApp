import React,{useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList
} from 'react-native';



import UserContext from '../../../context/userContext';


export const NotificacionesPaciente=(props)=>{

  const {user}=useContext(UserContext)

  const[notificaciones,setNotificaciones]=React.useState([])

  const obtenerNotificaciones=async()=>{
    console.log("AAAAAAAAAAAAAAAAA"+(user.matriculaNacional))
    var notificaciones= await fetch('http://localhost:3000/notificacionesNutricionista/notificaciones?matriculaNacional='+user.matriculaNacional);
    if(notificaciones.ok){
      notificaciones=await notificaciones.json();
      setNotificaciones(notificaciones)

      console.log(user.matriculaNacional);
      console.log(notificaciones)
    }
  }

  React.useEffect(()=>{
    obtenerNotificaciones()
  },[])
    return(
      <View style={styles.fondoVerde}>
        <View>
          <Text style={styles.bannerNutricionista}>Nutricionista</Text>
        </View>
        <View style={{flex:4}}>
          <FlatList
          data={notificaciones}
          ListEmptyComponent={
            <View>
              <Text>No tienes notificaciones </Text>
            </View>
          }
          renderItem={({item})=>
          
              <View style={styles.botonNotificacion}>
              <Text style={styles.textoBotonNotificacion}>
                ¡Paciente quiere iniciar un plan con vos!
              </Text>
              <View style={{flexDirection:"row", margin:10}}> 
                <TouchableOpacity style={{backgroundColor:"#3B8D77",borderRadius:10, color:"white", fontWeight:"bold", marginRight:10}}><Text style={styles.textoBotonNotificacion}>Aceptar</Text></TouchableOpacity>
                <TouchableOpacity  style={{backgroundColor:"#3B8D77",borderRadius:10, color:"white", fontWeight:"bold"}}><Text style={styles.textoBotonNotificacion}>Rechazar</Text></TouchableOpacity>
              </View>
              
            </View>
         }

        />
          <ScrollView>
            <View style={styles.botonNotificacion}>
              <Text style={styles.textoBotonNotificacion}>
                ¡Paciente 1 quiere iniciar un plan con vos!
              </Text>
              <View style={{flexDirection:"row", margin:10}}> 
                <TouchableOpacity style={{backgroundColor:"#3B8D77",borderRadius:10, color:"white", fontWeight:"bold", marginRight:10}}><Text style={styles.textoBotonNotificacion}>Aceptar</Text></TouchableOpacity>
                <TouchableOpacity  style={{backgroundColor:"#3B8D77",borderRadius:10, color:"white", fontWeight:"bold"}}><Text style={styles.textoBotonNotificacion}>Rechazar</Text></TouchableOpacity>
              </View>
              
            </View>
            <View><TouchableOpacity onPress={()=>props.navigation.navigate('AnalisisRegistroPaciente')} style={styles.botonNotificacion}><Text style={styles.textoBotonNotificacion}>¡El Paciente1 ha  hecho un registro nuevo!</Text></TouchableOpacity></View>
            <View><TouchableOpacity onPress={()=>props.navigation.navigate('AnalisisRegistroPaciente')} style={styles.botonNotificacion}><Text style={styles.textoBotonNotificacion}>¡El Paciente1 ha  hecho un registro nuevo!</Text></TouchableOpacity></View>
            <View style={styles.botonNotificacion}>
              <Text style={styles.textoBotonNotificacion}>
                ¡Paciente 1 quiere iniciar un plan con vos!
              </Text>
              <View style={{flexDirection:"row", margin:10}}> 
                <TouchableOpacity style={{backgroundColor:"#3B8D77",borderRadius:10, color:"white", fontWeight:"bold", marginRight:10}}><Text style={styles.textoBotonNotificacion}>Aceptar</Text></TouchableOpacity>
                <TouchableOpacity  style={{backgroundColor:"#3B8D77",borderRadius:10, color:"white", fontWeight:"bold"}}><Text style={styles.textoBotonNotificacion}>Rechazar</Text></TouchableOpacity>
              </View>
              
            </View>
            <View><TouchableOpacity onPress={()=>props.navigation.navigate('AnalisisRegistroPaciente')} style={styles.botonNotificacion}><Text style={styles.textoBotonNotificacion}>¡El Paciente1 ha  hecho un registro nuevo!</Text></TouchableOpacity></View>
            <View><TouchableOpacity onPress={()=>props.navigation.navigate('AnalisisRegistroPaciente')} style={styles.botonNotificacion}><Text style={styles.textoBotonNotificacion}>¡El Paciente1 ha  hecho un registro nuevo!</Text></TouchableOpacity></View>
            <View><TouchableOpacity onPress={()=>props.navigation.navigate('AnalisisRegistroPaciente')} style={styles.botonNotificacion}><Text style={styles.textoBotonNotificacion}>¡El Paciente1 ha  hecho un registro nuevo!</Text></TouchableOpacity></View>
            <View><TouchableOpacity onPress={()=>props.navigation.navigate('AnalisisRegistroPaciente')} style={styles.botonNotificacion}><Text style={styles.textoBotonNotificacion}>¡El Paciente1 ha  hecho un registro nuevo!</Text></TouchableOpacity></View>
            <View><TouchableOpacity onPress={()=>props.navigation.navigate('AnalisisRegistroPaciente')} style={styles.botonNotificacion}><Text style={styles.textoBotonNotificacion}>¡El Paciente1 ha  hecho un registro nuevo!</Text></TouchableOpacity></View>
            <View><TouchableOpacity onPress={()=>props.navigation.navigate('AnalisisRegistroPaciente')} style={styles.botonNotificacion}><Text style={styles.textoBotonNotificacion}>¡El Paciente1 ha  hecho un registro nuevo!</Text></TouchableOpacity></View>
            <View><TouchableOpacity onPress={()=>props.navigation.navigate('AnalisisRegistroPaciente')} style={styles.botonNotificacion}><Text style={styles.textoBotonNotificacion}>¡El Paciente1 ha  hecho un registro nuevo!</Text></TouchableOpacity></View>
            <View><TouchableOpacity onPress={()=>props.navigation.navigate('AnalisisRegistroPaciente')} style={styles.botonNotificacion}><Text style={styles.textoBotonNotificacion}>¡El Paciente1 ha  hecho un registro nuevo!</Text></TouchableOpacity></View>
            <View><TouchableOpacity onPress={()=>props.navigation.navigate('AnalisisRegistroPaciente')} style={styles.botonNotificacion}><Text style={styles.textoBotonNotificacion}>¡El Paciente1 ha  hecho un registro nuevo!</Text></TouchableOpacity></View>
            <View><TouchableOpacity onPress={()=>props.navigation.navigate('AnalisisRegistroPaciente')} style={styles.botonNotificacion}><Text style={styles.textoBotonNotificacion}>¡El Paciente1 ha  hecho un registro nuevo!</Text></TouchableOpacity></View>
            
          </ScrollView>
        </View>
      </View>
    
      
    );
}

const styles=StyleSheet.create({
    fondoVerde:{
      backgroundColor:"#D9ED92",
      flex:1
    },
    bannerNutricionista:{
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
        fontWeight:"700",
        color:"white"
    }
  })
  