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
  const [pesoACambiar,setPesoACambiar]=useState([])


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
    
  };

  const handleShowAlert=()=>{
    setShowAlert(true);
    fadeIn();
    
  }
    
  const handleSave = async() => {
    try{
      const response= await fetch('http://localhost:3000/pesoPaciente/createPesoPaciente',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          id:paciente.id,
          peso:pesoACambiar
        })
      })
      fadeOut();
      obtenerPesos()
    }catch(e){
      console.log(e)
    }
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
                <ScrollView>
                  <Image style={{width:145, height:145, alignSelf:"center",}}source={{uri: "data:image/png;base64,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"}}></Image>
                  <TextInput onChangeText={setPesoACambiar} keyboardType="decimal-pad" style ={styles.botonCambiarPaciente} placeholder={`Peso actual: ${pesos[pesos.length-1]} kg`} placeholderTextColor={"black"}></TextInput>

                  <LineChart
                    data={{
                      datasets: [
                        {
                          data: pesos.length ? pesos : [0], // Asegúrate de que siempre haya datos
                        },
                      ],
                    }}
                    width="300"
                    height={250}
                    yAxisSuffix="kg"
                    chartConfig={{
                      backgroundGradientFrom: 'rgba(255, 255, 255, 0)', 
                      backgroundGradientTo: 'rgba(255, 255, 255, 0)',
                      barPercentage: 1.3,
                       
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
                      alignSelf:"center",
                      borderRadius:10
                    }}
                  />
                  <TouchableOpacity  onPress={handleShowAlert} style={{backgroundColor:"#52B69A",borderRadius:30, padding:15, margin:25}}><Text style={{fontSize:25,textAlign:"center", fontWeight:"bold", color:"white"}}>Guardar cambios</Text></TouchableOpacity>
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
      margin:25, 
      padding:20, 
      borderRadius:30,
      color:"black", 
      textAlign:"center",
      fontSize:20, 
      fontWeight:"600"
    }
  })