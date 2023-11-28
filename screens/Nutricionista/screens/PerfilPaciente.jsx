
import React ,{useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Modal,
  Animated, Easing
} from 'react-native';
////props.navigation.navigate('MisPacientes')

import { ScatterChart } from 'react-native-svg-charts';

export const PerfilPaciente=(props)=>{




  const [showAlert, setShowAlert] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;

  const [showAlertElimnarPaciente, setShowAlertEliminarPaciente] = useState(false);


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
    return(props.navigation.navigate('MisPacientes'))
  };

  const fadeOutEliminarPaciente = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => setShowAlertEliminarPaciente(false));
    return(props.navigation.navigate('MisPacientes'))
  };

  const handleShowAlertEliminarPaciente=()=>{
    setShowAlertEliminarPaciente(true);
    fadeIn();
    
  }


  const handleShowAlert=()=>{
    setShowAlert(true);
    fadeIn();
    
  }

  const handleSaveEliminarPaciente = () => {
    // Agrega aquí la lógica para guardar los cambios.
    // Luego, cierra la alerta con una animación de salida.
    fadeOutEliminarPaciente();
    return(props.navigation.navigate('MisPacientes'))
  };
    
  const handleSave = () => {
    // Agrega aquí la lógica para guardar los cambios.
    // Luego, cierra la alerta con una animación de salida.
    fadeOut();
    return(props.navigation.navigate('MisPacientes'))
  };
    return(
        <View style={styles.fondoVerde}>
          <View>
            <Text style={styles.bannerNutricionista}>Nutricionista</Text>
          </View>
          <View style={{flex:4}}>
            <View>
                <Text style={styles.textoNombreApellidoPaciente}>Nombre Apellido</Text>
            </View>
            <ScrollView>
              <View>
                  <View><TouchableOpacity onPress={()=>props.navigation.navigate('EditarPeso')} style={styles.botonDescripcionPaciente}><Text style={styles.textoDescripcionPaciente}>Peso actual</Text></TouchableOpacity></View>
                  <View><TouchableOpacity onPress={()=>props.navigation.navigate('Objetivo')} style={styles.botonDescripcionPaciente}><Text style={styles.textoDescripcionPaciente}>Objetivo</Text></TouchableOpacity></View>
                  <View><TouchableOpacity onPress={()=>props.navigation.navigate('Antecedentes')} style={styles.botonDescripcionPaciente}><Text style={styles.textoDescripcionPaciente}>Antecedentes</Text></TouchableOpacity></View>
                  <View><TouchableOpacity onPress={()=>props.navigation.navigate('TabHistorial')} style={styles.botonDescripcionPaciente}><Text style={styles.textoDescripcionPaciente}>Historial</Text></TouchableOpacity></View>


                  <Text style={{color:"white", fontWeight:"300", fontSize:20, backgroundColor:"#76C893", padding:15,margin:20, borderRadius:5}}>Comentarios previos</Text>
                  <ScrollView>
                    <Text style={{color:"black", fontWeight:"500", margin:10, fontSize:15, backgroundColor:"white", borderRadius:10, padding:10, }}>2023-10-2 {'\n'}Comentario nutricionista</Text>
                    <Text style={{color:"black", fontWeight:"500", margin:10, fontSize:15, backgroundColor:"white", borderRadius:10, padding:10, }}>2023-10-2 {'\n'}Comentario nutricionista</Text>
                    <Text style={{color:"black", fontWeight:"500", margin:10, fontSize:15, backgroundColor:"white", borderRadius:10, padding:10, }}>2023-10-2 {'\n'}Comentario nutricionista</Text>
                    <Text style={{color:"black", fontWeight:"500", margin:10, fontSize:15, backgroundColor:"white", borderRadius:10, padding:10, }}>2023-10-2 {'\n'}Comentario nutricionista</Text>
                    <Text style={{color:"black", fontWeight:"500", margin:10, fontSize:15, backgroundColor:"white", borderRadius:10, padding:10, }}>2023-10-2 {'\n'}Comentario nutricionista</Text>
                    <Text style={{color:"black", fontWeight:"500", margin:10, fontSize:15, backgroundColor:"white", borderRadius:10, padding:10, }}>2023-10-2 {'\n'}Comentario nutricionista</Text>
                    <Text style={{color:"black", fontWeight:"500", margin:10, fontSize:15, backgroundColor:"white", borderRadius:10, padding:10, }}>2023-10-2 {'\n'}Comentario nutricionista</Text>
                    <Text style={{color:"black", fontWeight:"500", margin:10, fontSize:15, backgroundColor:"white", borderRadius:10, padding:10, }}>2023-10-2 {'\n'}Comentario nutricionista</Text>
                    <Text style={{color:"black", fontWeight:"500", margin:10, fontSize:15, backgroundColor:"white", borderRadius:10, padding:10, }}>2023-10-2 {'\n'}Comentario nutricionista</Text>
                    
                  </ScrollView>
                  <TouchableOpacity><Text style={{fontSize:20, backgroundColor:"#52B69A", color:"white", fontWeight:"600", padding:20, borderRadius:10,margin:5, textAlign:"center"}}>Añadir comentario</Text></TouchableOpacity>
                  
                  <Text style={{color:"white", fontWeight:"300", fontSize:20, backgroundColor:"#76C893", padding:15,margin:20, borderRadius:5}}>Registros previos</Text>
                  <ScrollView>
                    <Text style={{color:"black", fontWeight:"500", margin:10, fontSize:15, backgroundColor:"white", borderRadius:10, padding:10, }}>2023-10-2 {'\n'}Comentario nutricionista</Text>
                    <Text style={{color:"black", fontWeight:"500", margin:10, fontSize:15, backgroundColor:"white", borderRadius:10, padding:10, }}>2023-10-2 {'\n'}Comentario nutricionista</Text>
                    <Text style={{color:"black", fontWeight:"500", margin:10, fontSize:15, backgroundColor:"white", borderRadius:10, padding:10, }}>2023-10-2 {'\n'}Comentario nutricionista</Text>
                    <Text style={{color:"black", fontWeight:"500", margin:10, fontSize:15, backgroundColor:"white", borderRadius:10, padding:10, }}>2023-10-2 {'\n'}Comentario nutricionista</Text>
                    <Text style={{color:"black", fontWeight:"500", margin:10, fontSize:15, backgroundColor:"white", borderRadius:10, padding:10, }}>2023-10-2 {'\n'}Comentario nutricionista</Text>
                    <Text style={{color:"black", fontWeight:"500", margin:10, fontSize:15, backgroundColor:"white", borderRadius:10, padding:10, }}>2023-10-2 {'\n'}Comentario nutricionista</Text>
                    <Text style={{color:"black", fontWeight:"500", margin:10, fontSize:15, backgroundColor:"white", borderRadius:10, padding:10, }}>2023-10-2 {'\n'}Comentario nutricionista</Text>
                    <Text style={{color:"black", fontWeight:"500", margin:10, fontSize:15, backgroundColor:"white", borderRadius:10, padding:10, }}>2023-10-2 {'\n'}Comentario nutricionista</Text>
                    <Text style={{color:"black", fontWeight:"500", margin:10, fontSize:15, backgroundColor:"white", borderRadius:10, padding:10, }}>2023-10-2 {'\n'}Comentario nutricionista</Text>
                    
                  </ScrollView>

              </View>
              <TouchableOpacity onPress={handleShowAlert} style={{backgroundColor:"#52B69A",borderRadius:30, padding:20, margin:25}}><Text style={{fontSize:25,textAlign:"center", fontWeight:"bold", color:"white"}}>Guardar cambios</Text></TouchableOpacity>
              <TouchableOpacity onPress={handleShowAlertEliminarPaciente}><Text style={styles.textoEliminarPaciente}>Eliminar paciente</Text></TouchableOpacity>
              
              

            </ScrollView>

            <Modal visible={showAlert} transparent animationType="none">
              <View style={{flex:1, justifyContent:"center", alignContent:"center",alignItems: 'center', backgroundColor: 'rgba(0, 0, 0)'}}>
                <Animated.View
                style={{
                backgroundColor:"#76C893",
                padding: 25,
                borderRadius: 15,
                opacity: opacity,
                } }
                >
                  <Text  style={{fontSize:20, color:"white", margin:10, fontWeight:"400"}}>¿Deseas guardar cambios?</Text>
                  <TouchableOpacity onPress={handleSave}>
                    <Text style={{fontSize:20, color:"white", backgroundColor:"#52B69A", textAlign:"center", padding:10, borderRadius:15, margin:10, fontWeight:"600"}}>Guardar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={fadeOut}>
                    <Text style={{fontSize:20, color:"white", backgroundColor:"#52B69A", textAlign:"center", padding:10, borderRadius:15, margin:10, fontWeight:"600"}}>Cancelar</Text>
                  </TouchableOpacity>
                </Animated.View>
              </View>
            </Modal>


            <Modal visible={showAlertElimnarPaciente} transparent animationType="none">
              <View style={{flex:1, justifyContent:"center", alignContent:"center",alignItems: 'center', backgroundColor: 'rgba(0, 0, 0)'}}>
                <Animated.View
                style={{
                backgroundColor:"#76C893",
                padding: 25,
                borderRadius: 15,
                opacity: opacity,
                } }
                >
                  <Text  style={{fontSize:25, color:"white", margin:10}}>¿Deseas eliminar a este paciente?</Text>
                  <TouchableOpacity onPress={handleSaveEliminarPaciente}>
                    <Text style={{fontSize:20, color:"white", backgroundColor:"#52B69A", textAlign:"center", padding:10, borderRadius:15, margin:10}}>Aceptar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={fadeOutEliminarPaciente}>
                    <Text style={{fontSize:20, color:"white", backgroundColor:"#52B69A", textAlign:"center", padding:10, borderRadius:15, margin:10}}>Cancelar</Text>
                  </TouchableOpacity>
                </Animated.View>
              </View>
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
    bannerNutricionista:{
      backgroundColor:"#76C893",
      textAlign:'center', 
      fontSize:35, 
      fontFamily:"Serif-Sans", 
      fontWeight:"600", 
      padding:30,
      color:"white"
    },
    textoNombreApellidoPaciente:{
      color:"#99D98C", 
      fontWeight:"400",
      margin:20, 
      textAlign:"left", 
      fontSize:40,
      borderRadius:10
    },
    textoTipoRegistroComida:{ 
      color:"#99D98C", 
      fontWeight:"400",
      margin:20, 
      textAlign:"left", 
      fontSize:50, 
      borderRadius:10
    },
    botonDescripcionPaciente:{
      backgroundColor:"white", 
      margin:20, 
      padding:10, 
      borderRadius:30
    },
    textoDescripcionPaciente:{
      color:"black", 
      textAlign:"center",
      fontSize:20, 
      fontWeight:"600"
    },
    textoEliminarPaciente:{
        color:"black",
        fontSize:20,
        textAlign:"center",
        fontWeight:"500",
        margin:15
    }
  })