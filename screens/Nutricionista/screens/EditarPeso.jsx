import React ,{useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Modal,
  Animated, Easing
} from 'react-native';

import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';


export const EditarPeso=(props)=>{
  const { paciente } = props.route.params;
  const [pesos, setPesos] = useState([]); 



  const data = {
    datasets: [
      {
        data: [65, 75, 80, 72,73,72,69], // Pesos en el eje Y
      },
    ],
  };

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
    return(props.navigation.navigate('PerfilPaciente',{paciente}))
  };

  const handleShowAlert=()=>{
    setShowAlert(true);
    fadeIn();
    
  }
    
  const handleSave = () => {
    // Agrega aquí la lógica para guardar los cambios.
    // Luego, cierra la alerta con una animación de salida.
    fadeOut();
    return(props.navigation.navigate('PerfilPaciente',{paciente}))
  };



  const obtenerPesos = async (id) => {
    try {
      let response = await fetch(`http://localhost:3000/paciente/getRegistroPesos?id=${paciente.id}`);
      if (response.ok) {
        let data = await response.json();
        const pesosArray = data.map(registro => registro.peso); 
        setPesos(pesosArray);
      } else {
        console.error('Error al obtener registros de peso:', response.statusText);
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };
  useEffect(() => {
   
    obtenerPesos(); // Obtener pesos al montar el componente
  }, []);

    return(
        <View style={styles.fondoVerde}>
            <View>
            <Text style={styles.bannerNutricionista}>Nutricionista</Text>
            </View>
            <View style={{flex:4}}>
            <View>
                <Text style={styles.textoNombreApellidoPaciente}>Nombre Apellido</Text>
            </View>
            <View>
                <ScrollView>
                  <Text style={{color:"black", fontWeight:"bold", textAlign:"center", fontSize:20, margin:5}}>CAMBIAR PESO</Text>
                  <TextInput keyboardType="decimal-pad" style ={styles.botonCambiarPaciente} placeholder="Peso actual 65kg" placeholderTextColor={"black"}></TextInput>

                  <LineChart
                    data={{
                      datasets: [
                        {
                          data: pesos.length ? pesos : [0], // Asegúrate de que siempre haya datos
                        },
                      ],
                    }}
                    width="300"
                    height={220}
                    yAxisSuffix="kg"
                    chartConfig={{
                      backgroundGradientFrom: 'rgba(255, 255, 255, 0)', // Fondo transparente (blanco con opacidad 0)
                      backgroundGradientTo: 'rgba(255, 255, 255, 0)',
                      barPercentage: 1.3,
                       // optional, defaults to 2dp
                      color: (opacity = 1) => `rgba(1, 122, 205, 1)`,
                      labelColor: (opacity = 1) => `rgba(0, 0, 0, 1)`,

                    }}

                    propsForDots={{
                      r: "6", // Tamaño del punto
                      strokeWidth: "2", // Ancho del borde del punto
                      stroke: "#52B69A", // Color del borde del punto
                      fill: "#52B69A", // Color de relleno del punto
                    }}
                    propsForBackgroundLines={{
                      strokeWidth: 1,
                      stroke: '#52B69A',
                      strokeDasharray: '0',
                    }}
                    style={{
                      margin:5,
                      padding:5,
                      alignSelf:"center"
                    }}
                  />
                  <TouchableOpacity  onPress={handleShowAlert} style={{backgroundColor:"#52B69A",borderRadius:30, padding:15, marginTop:5}}><Text style={{fontSize:25,textAlign:"center", fontWeight:"bold", color:"white"}}>Guardar cambios</Text></TouchableOpacity>
                </ScrollView>
            </View>
           
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