
import React ,{useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Modal,
  Animated, Easing,Image
} from 'react-native';

import { ScatterChart } from 'react-native-svg-charts';

export const PerfilPaciente=(props)=>{
  const { paciente } = props.route.params;



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

  const handleSaveEliminarPaciente = async() => {

    try{
      const response = await fetch(`http://localhost:3000/paciente/deletePaciente?id=${paciente.id}`, {
        method: 'POST',
      });
      if (response.ok) {
        const data = await response.json();
        console.log("SE DESVINCULÓ PACIENTE",paciente.id)
        fadeOutEliminarPaciente();
        return(props.navigation.navigate('MisPacientes'))
      }

    }catch(e){
      console.log(e);
    }
  };
    
  const handleSave = () => {
    fadeOut();
    return(props.navigation.navigate('MisPacientes'))
    
  };


  console.log(paciente)
    return(
        <View style={styles.fondoVerde}>
          <View>
            <Text style={styles.bannerNutricionista}>Nutricionista</Text>
          </View>
          <View style={{flex:4}}>
            <View>
                <Text style={styles.textoNombreApellidoPaciente}>{paciente.nombre} {paciente.apellido}</Text>
            </View>
            <ScrollView>
              <View>
                  <View>
                    <TouchableOpacity onPress={()=>props.navigation.navigate('EditarPeso',{paciente})} style={styles.botonDescripcionPaciente}>
                      <View style={{flexDirection: "row",alignItems: "center",justifyContent: "space-between",}}>
                        <Text style={styles.textoDescripcionPaciente}>PESO</Text>
                        <Image style={{width:50, height:50,margin:10}}source={{uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFBElEQVR4nO2da6xdQxTHf1wNGq40KFrPhCjaVFNCIoLEq0VJhLQ+iAhBCB9E1TMSBAlBRZpq9EGFHhEavohHX5fEF5TwgUQk3s+oEnKr3bKcuYk2u/vMmplz9j5n1i+ZD/fec9aaWf87s/eax95gGIZhGIZhGIZhGIZhGIZRI0cDtwBLgFZmZYlru8SgdoaBZ4GtQJF52eZiMVynGB82IBBFw8rGukRZ2YDGFw0tEpuecozronU3vGho2eZi1DNua0Cji4aXBb0UZFkDGlw0vDzdS0FaNTf2c2AhcCEwDTgQOACYCpwPPAJ8WnMdWzkI8q4L+C6e9TwLWGOCpBfiL+BWYNfAf6DLgc3WQ9KI8TMwk3iOA76zIStOjF+A6aRjCvC9XUPCBbmU9Jzdo6megbuoL0tU191Lfve4CaITYxQ4PNEQVdbL9uvBRX6gesjyBHWc6q4Xk3fyd8ljTBDPIMxJ0DPkjmp9xWdON0H8h6u9InvGD87WjRWfGwdssiGrsyB/A0MJxJA7qUkVn5Vs/ycTxK+X3BwpRtFhuBKusiFLdxF9B3gKWOxZ/i+GlA8qPruuB+s5A3WXVQxAMUGoXwQThPoDb4JQf7BNEOoPsAlC/UE1QWjf7l4JzHCTgFPcz+8HBEi+czVwLLCvW3+XycZX3IyACVIRhM+AUytutXcD7vUMouQYd3TI+A8DXrMeUh7AVcB4zxzoAY8gzlfkVNKD/rEha3sx5L/fl6EOe4rXKnaljDHHbaTI/hrynpt11XJBRfCOJ4xrcxdEVuyODPQ/BHy9E4FjeDFnQe6MrMPyEpv3RNrcH/gjR0F+ByZE1uH6EruzErTt4RwFkV0fsVxUYjfFHi7ZJ7wlN0HOTFCHM0rsSm6RgpGcBJHbyz0T1OHihHdYO3J3ToJsSFSHG0psz05k+7ScBJFEMAWrSmw/mMj2UTkJ8mQC/8PAnyW2v1Jm/VX2sxHkvgT+H+vB2b4tuQjyaKTvczpMBspNwymRPvbIqYcsjfA7HfjN85CPHNAJ5aCcBHkj0OfByhNQ37jvhHBSToLIjvQQ1gT4GgmYih9bI8lGkKLiiIAmK/ctcmpXy+LcBLlC6e+hCF+LAtr3ZW6CvJAgCSw8y+sBm7aL3AT5VXnkYGWEr1eVbZufoyBSTlb4uz/Cjxxd07A2V0E0q3uzI/xcovAzIdFaSF8Koln/HueSPa2PTYrtRcJlicToS0G2KpdxFwX4kAdUaliRsyDa9YsZAfblOxq+yF0Q7czvBoXtN5W2JycUo28FWa30O09hWzbTaTjXBIFPlEEb7/lIjB8DdkTeZIK0z6RrJ/+e70LuITxhgrSDp31qw1yPwMnwo+U5E6QdPFkM0jCtC7PJuOtZ9hf1wu3w0DDJI78J2ejwtgnSDuCJysAd4nF6KkQQefKD9RDgPGXgZnZhGBS+NUHawZNtmxqu6UIO0mkYzCYxDDlks7oLc1jXmSDbB/AEz8Ad4Tk9LsnjRE+bslD2cb8LsjRx5Uc8VxBfVtiUt93UkaGn2H/WiNdVLOyQtd8VYFPqWcWsLj5AYMEgvNDlJeDQHXxNjOyRz5Qkinu7FctUq4O1v9Clm688GnWP55Mx+K1E58dH3dR9y+1C2Txorzwa27K/scsNK/qwfFT3m9pkUs7eR8V/MZBY7EMDkJ3mt7s16VZmZYVre8xue8MwDMMwDMMwDMMwDMMwDKL4F73YYixV4c3jAAAAAElFTkSuQmCC"}}></Image>
                      </View>
                    </TouchableOpacity>
                  </View>

                  <View>
                    <TouchableOpacity onPress={()=>props.navigation.navigate('EditarObjetivo',{paciente})} style={styles.botonDescripcionPaciente}>
                      <View style={{flexDirection: "row",alignItems: "center",justifyContent: "space-between",}}>
                        <Text style={styles.textoDescripcionPaciente}>OBJETIVO</Text>
                        <Image style={{width:50, height:50,margin:10}}source={{uri: "data:image/png;base64,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"}}></Image>
                      </View>
                     </TouchableOpacity>
                  </View>
                  <View>
                    <TouchableOpacity onPress={()=>props.navigation.navigate('EditarAntecedentes',{paciente})} style={styles.botonDescripcionPaciente}>
                      <View style={{flexDirection: "row",alignItems: "center",justifyContent: "space-between",}}>
                        <Text style={styles.textoDescripcionPaciente}>ANTECEDENTES</Text>
                        <Image style={{width:50, height:50,margin:10}}source={{uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACA0lEQVR4nO2ZzUocQRSFP3dORDeJRl24SaI+gpuYPIW4cyH+xI0QSAxJiM/iPiFIMNn4AOq40hHBjS5EspnoRgmEWKHhFBTSqWntma6WrgMXuu4pas7prtt9qYGIiMLwEKgrBlL4JLfbYX4H2Mxjok8/YBSHwJDD9wN7BfJ3xnctcAQ0dL2vuzSga5vbbxPfSOFNXiPXWmCkg8LT+MaNa5PXyM0F0rbCYIf5oU4YQXeuVfHn4ftV3MkL4LFHR24jIWCikao8EXPHyLpGNFLZrVWJGml3LSWIRiqztYqGKbJGWvG3mReNVHZrVbLXcnGvviPmPhkpGiYaEeITKfPWegn8AC5ydLXtjl/ABjCZ1cg757CujPEXeJvFSBJ/gPc61E7ig3IJN00YPAI+OjqmshhZSOEXxZ0BDwiHV610WBNbQFcKn+S2NWeGcOjS6eR/dVgjsxo/BQ50sPxEuTnN+UJYzPl0WCPPNF53cl+VG9P4hLAY8+mwors1PndyTeVqGl8RFjWfjt8ZjPRofElY9Ph0nIoc9WytcY2PCYtxn44NkUkh2WK3/ybZYp/XnM+ExbxPx4LIHc/rt16S12/dp6MX+KkJr1P45ZJ8EJey6Jh26mINmACGgVWn/wrZonxSi3Lta1EsVtSYlblpfJPV/QsVf7MEwo3zCfgGPM/9bCMiKoZ/yk1p2vQM7IAAAAAASUVORK5CYII="}}></Image>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <TouchableOpacity onPress={()=>props.navigation.navigate('TabHistorial', { paciente })} style={styles.botonDescripcionPaciente}>
                    <View style={{flexDirection: "row",alignItems: "center",justifyContent: "space-between",}}>
                        <Text style={styles.textoDescripcionPaciente}>HISTORIAL</Text>
                        <Image style={{width:50, height:50,margin:10}}source={{uri: "data:image/png;base64,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"}}></Image>
                      </View>
                    </TouchableOpacity>
                  </View>


                 
                  

              </View>
              <TouchableOpacity onPress={handleShowAlert} style={{backgroundColor:"#52B69A",borderRadius:30, padding:20, margin:20}}><Text style={{fontSize:25,textAlign:"center", fontWeight:"bold", color:"white"}}>Guardar cambios</Text></TouchableOpacity>
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
      textAlign:"left", 
      fontSize:50, 
      borderRadius:10
    },
    botonDescripcionPaciente:{
      backgroundColor:"white", 
      margin:6, 
      borderRadius:50,
      alignItems:"stretch",
      marginHorizontal:30
    },
    textoDescripcionPaciente:{
      color:"black", 
      textAlign:"center",
      fontSize:18, 
      fontWeight:"600" ,
      margin:20
    },
    textoEliminarPaciente:{
        color:"black",
        fontSize:20,
        textAlign:"center",
        fontWeight:"500",
        
    }
  })