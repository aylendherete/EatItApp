import React ,{useState, useRef} from 'react';
import {StyleSheet,Text,View,TouchableOpacity,TextInput,Modal, Animated, Easing,Image} from 'react-native';
import * as Animatable from 'react-native-animatable';

export const EditarObjetivo=(props)=>{

  const paciente  = props.route.params.paciente;
  const [showAlert, setShowAlert] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;
  const [objetivo,setObjetivo]=React.useState("");
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
    
  };

  const handleShowAlert=()=>{
    setShowAlert(true);
    fadeIn();
    
  }
    
  const handleSave = async() => {

    try{
      const response = await fetch(`http://localhost:3000/paciente/updateObjetivo?id=${paciente.id}&objetivo=${objetivo}`, {
        method: 'POST',
      });
      if (response.ok) {
        const data = await response.json();
        console.log("SE ACTUALIZÓ PACIENTE",paciente.id)
        setShowTick(true);
        setShowAlert(false);
        setTimeout(() => {
          setShowTick(false);
          paciente.objetivo=objetivo;
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
            <Image style={{width:135, height:135, alignSelf:"center",margin:20}}source={{uri: "data:image/png;base64,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"}}></Image>
            <View>
                
                <TextInput  style ={styles.botonCambiarPaciente} onChangeText={setObjetivo}  placeholder={`Objetivo actual: ${paciente.objetivo}`} placeholderTextColor={"black"}></TextInput>
                
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