import React,{useState, useRef}  from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Animated, Easing
} from 'react-native';

export const EditarAntecedentes=(props)=>{
  const { paciente } = props.route.params;
  const [showAlert, setShowAlert] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;
  const [antecedentes,setAntecedentes]=React.useState("");


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
    return(props.navigation.navigate('PerfilPaciente',{paciente}))
  };

  const handleShowAlert=()=>{
    setShowAlert(true);
    fadeIn();
    
  }
    
  const handleSave =async () => {
    try{
      const response = await fetch(`http://localhost:3000/paciente/updateAntecedentes?id=${paciente.id}&antecedentes=${antecedentes}`, {
        method: 'POST',
      });
      if (response.ok) {
        const data = await response.json();
        console.log("SE ACTUALIZÓ PACIENTE",paciente.id)
        fadeOut();
        return(props.navigation.navigate('PerfilPaciente',{paciente}))
    
      }

    }catch(e){
      console.log(e);
    }
  };
    return(
        <View style={styles.fondoVerde}>
          <View>
          <Text style={styles.bannerNutricionista}>Nutricionista</Text>
          </View>
          <View style={{flex:4}}>
          <View>
              <Text style={styles.textoNombreApellidoPaciente}>{paciente.nombre} {paciente.apellido}</Text>
          </View>
          <View>
              <Text style={{color:"black", fontWeight:"bold", textAlign:"center", fontSize:20, margin:15}}>CAMBIAR ANTECEDENTES</Text>
              <TextInput  style ={styles.botonCambiarPaciente} onChangeText={setAntecedentes}  placeholder={`Antecedentes: ${paciente.antecedentes}`} placeholderTextColor={"black"}></TextInput>
              
          </View>
          <TouchableOpacity onPress={handleShowAlert} style={{backgroundColor:"#52B69A",borderRadius:30, padding:20, margin:25}}><Text style={{fontSize:25,textAlign:"center", fontWeight:"bold", color:"white"}}>Guardar cambios</Text></TouchableOpacity>
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
    botonCambiarPaciente:{
      backgroundColor:"white", 
      margin:35, 
      padding:10, 
      borderRadius:30,
      color:"black", 
      textAlign:"center",
      fontSize:20, 
      fontWeight:"600"
    }
  })