import React, {useState,useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Animated, Easing,
  ScrollView,
  TextInput, Image
} from 'react-native';



export const AnalisisRegistroPaciente=(props)=>{
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
    return(props.navigation.navigate("NotificacionesNutricionista"))
  };

  const handleShowAlert=()=>{
    setShowAlert(true);
    fadeIn();
    
  }
    
  const handleSave = () => {
    // Agrega aquí la lógica para guardar los cambios.
    // Luego, cierra la alerta con una animación de salida.
    fadeOut();
    return(props.navigation.navigate("NotificacionesNutricionista"))
  };
    
    return(
        <View style={styles.fondoVerde}>
            <View>
            <Text style={styles.bannerNutricionista}>Nutricionista</Text>
            </View>
            <View style={{flex:4}}>
              <View>
                  <Text style={styles.textoNombreApellidoPaciente}>Nombre Apellido</Text>
                  <Text style={styles.textoFechaRegistro}>Registros del día 3 de septiembre</Text>
              </View>

              <ScrollView>
                <View > 
                  <Text style={styles.textoTipoRegistroPaciente}>Comida</Text>
                  <View style={{ backgroundColor:"#52B69A", padding:25,textAlign:'center', margin:20, borderRadius:5}}>
                    <Text style={styles.textoRegistroPaciente}>Milanesa con puré de papa {'\n'}13:30 hs</Text> 
                    <View>
                      <Image
                        source={require('../../imgs/milanga.jpeg')}
                        style={{alignSelf: 'center', width: 280, height: 200, borderWidth: 1,borderColor: 'black'}}

                      />
                    </View> 
                  </View>
                </View>
                <View >
                  <TextInput style={styles.inputComentarioRegistro} placeholderTextColor="black" placeholder='Añadir comentario'></TextInput>
                </View>
                <TouchableOpacity onPress={handleShowAlert} style={{backgroundColor:"#52B69A",borderRadius:30, padding:20, margin:25}}><Text style={{fontSize:25,textAlign:"center", fontWeight:"bold", color:"white"}}>Guardar cambios</Text></TouchableOpacity>
                
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
                    <Text  style={{fontSize:25, color:"white", margin:10}}>¿Deseas guardar cambios?</Text>
                    <TouchableOpacity onPress={handleSave}>
                      <Text style={{fontSize:20, color:"white", backgroundColor:"#52B69A", textAlign:"center", padding:10, borderRadius:15, margin:10}}>Guardar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={fadeOut}>
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
      color:"white", 
      fontFamily:"Serif-Sans", 
      fontWeight:"600", 
      padding:30
    },
    textoNombreApellidoPaciente:{
      color:"white", 
      fontWeight:"bold",
      margin:15, 
      textAlign:"left", 
      fontSize:40,
      borderRadius:10
    },
    textoFechaRegistro:{
      color:"black",
      fontSize:20,
      textAlign:"left",
      margin:15,
      fontWeight:"600"
    },
    textoTipoRegistroPaciente:{
      fontSize:45,
      textAlign:"left",
      color:"#99D98C",
      margin:10
    },
    textoRegistroPaciente:{
      backgroundColor:"#52B69A",
      color:"black",
      fontWeight:"600",
      padding:25,
      textAlign:'center',
      fontSize:15,
      margin:20,
      borderRadius:5
    },
    inputComentarioRegistro:{
      backgroundColor:"white",
      color:"black",
      fontSize:15,
      margin:15,
      borderRadius:15,
      textAlign:"center",
      fontWeight:"500"
    }
    
  })