import React,{useState, useRef}  from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Animated, Easing,Image
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
              <Image style={{width:135, height:135, alignSelf:"center",margin:20}}source={{uri: "data:image/png;base64,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"}}></Image>

              <TextInput  style ={styles.botonCambiarPaciente} onChangeText={setAntecedentes}  placeholder={`Antecedentes: ${paciente.antecedentes}`} placeholderTextColor={"black"}></TextInput>
              
          </View>
          <TouchableOpacity onPress={handleShowAlert} style={{backgroundColor:"#52B69A",borderRadius:30, padding:15, margin:25}}><Text style={{fontSize:25,textAlign:"center", fontWeight:"bold", color:"white"}}>Guardar cambios</Text></TouchableOpacity>
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