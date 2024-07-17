import React ,{useState, useRef, useEffect} from 'react';
import {StyleSheet,Text,View,TouchableOpacity,
  ScrollView,
  Modal,
  Animated, Easing,Image
} from 'react-native';
import * as Animatable from 'react-native-animatable';

export const PerfilPaciente=(props)=>{
  const paciente  = props.route.params.paciente;
  const [showAlert, setShowAlert] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;
  const [showAlertElimnarPaciente, setShowAlertEliminarPaciente] = useState(false);
  const [showTick, setShowTick] = useState(false);


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


  const handleShowAlert=()=>{
    setShowAlert(true);
    fadeIn();
    
  }

  const handleSave = async() => {

    try{
      const response = await fetch(`http://localhost:3000/paciente/deletePaciente?id=${paciente.id}`, {
        method: 'POST',
      });
      if (response.ok) {
        const data = await response.json();
        console.log("SE DESVINCULÓ PACIENTE",paciente.id)
        setShowTick(true);
        setShowAlert(false);
        setTimeout(() => {
          setShowTick(false);
          return(props.navigation.navigate('MisPacientes'))
        }, 1500);
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
              
              <TouchableOpacity onPress={handleShowAlert}><Text style={styles.textoEliminarPaciente}>Eliminar paciente</Text></TouchableOpacity>
              
              

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
                  <Text  style={{fontSize:25, color:"white", margin:10}}>¿Deseas eliminar a este paciente?</Text>
                  <TouchableOpacity onPress={handleSave}>
                    <Text style={{fontSize:20, color:"white", backgroundColor:"#52B69A", textAlign:"center", padding:10, borderRadius:15, margin:10}}>Aceptar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={fadeOut}>
                    <Text style={{fontSize:20, color:"white", backgroundColor:"#52B69A", textAlign:"center", padding:10, borderRadius:15, margin:10}}>Cancelar</Text>
                  </TouchableOpacity>
                </Animated.View>
              </View>
            </Modal>

            <Modal visible={showTick} transparent >
            <View style={{backgroundColor:"#01981F",}} >
              <Animatable.View animation="zoomIn" duration={1000} >
                <View style={{width:"100%",height:"100%", justifyContent:"center"}}>
                  <Image style={{flex:0.5,justifyContent:"center", alignItems:"center"}} source={{uri:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAYAAAB5fY51AAAACXBIWXMAAAsTAAALEwEAmpwYAAAYqklEQVR4nO3debSfRX3H8YclkLAKtAVCWArUhUDYPUgRqW0BMSwJIEc9YBWILCKgEBCxFcti2QRk30UplYIsYQ+oLGErWLQFjBD2HcJOCFvePdPOPb2Em+Qu33m+88x8XufkDyO59zfrb555vvOdphEREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREWkZsACwEvBZYBywO3AIcBxwPjAJmAzcDNwT/zwITIt/Huz19zfH/3ZS/LfHAt+LP3Nc/B0rAvOroUVkjoBVgG3iBHIWcCPwMPAu7XsHeChObmfFz7R1+IxqQpGKhNULsCYwATgVuBV4le4In/UW4JS4Mgtl0YpMpATAIsBmwKHANcArlCeU6Wrg+8DnQpm9611E+glYNa6gwl7RTOrzHnAbcBCwPjCfOo9IJoCFgC8CpwOPec8WGXoUOA3YChjm3V4itb692wQ4EXjBe0bo2OPjBXETX5OXSErAxsAZwIveI78AL8aV10bqtSJGgCXjntR93iO8YA/GPa8/U8cVGYT4yPdz4G3v0VyRGfGRcWN1WpH+xUmF/ZXbvUeucC+wC7CgOq5IL8Bi8bFvqiaK7DwSHxeXVKeVqgGLAz8AXvYelTJP0+M5ysW8+42IRwT6vsBzmig656W44lJEvZQNWFgTVTGeAfYJgbve/UrEXNxMDxkQpCwhs8SOGjJSBOBTwLXeo0qSuwkY493fRAYFWCZGUr+vyaKqg9cnA0tr2EhnAF+p8Izf6/Ft5/ReGUenx78L/19NwsuUnbz7ochcxXTCITdTCWYBTwNTgAuBI4A9YjrjTYHRwHIDOUQc/tv4b0bHnzEu/swj4u+YEjezS3ElMErDRnKMUP9Wh1cSzwI3AMfE6O51geGO9TkcWA/4Wsz9fkP8jF30GrCXMqNKFuKKoUub6mFP7f6Y9SFMTqObjgBGxretP45J+kL+9y5tymu1JX6AHeI+Te6mxTzoW5cUqR1PCmwT89OHRH1dCDod711vUpk4UM4lXx/Eyxr2Az7RVAL4JLB/XH2FOshVuA1oUe/6kgoA68RgwRw3yafEIz8rNJULj19x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Uu5zERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERFp3f8A7xgEoERKflEAAAAASUVORK5CYII="}}></Image>
                </View>  
              </Animatable.View>
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
        color:"white",
        fontSize:20,
        textAlign:"center",
        fontWeight:"500",
        margin:30,
        padding:20,
        backgroundColor:"#76C893",
        borderRadius:10,
        borderColor:"#99D98C",
        borderWidth:5
    }
  })