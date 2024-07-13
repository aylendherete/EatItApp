import React, { useContext,useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Animated, Easing, Image
} from 'react-native';

import * as Animatable from 'react-native-animatable';

import UserContext from '../../../context/userContext';


export const RegistroTipoAgua=(props)=>{

  const { user } = useContext(UserContext);
  const [count, setCount] = useState(0);

  const[animation]=useState(new Animated.Value(0))

  const startAnimation=()=>{
    Animated.spring(animation, {
      toValue:1,
      friction:1,
      useNativeDriver:true
    }).start(()=>{
      animation.setValue(0)
    })
  }

  const incrementCount = () => {
    startAnimation()
    setCount(count + 1);
  };
  const decrementCount = () => {

    if (count>0){
      startAnimation()
      setCount(count -1);
    }
  };

  const countml=count*250;

  const [showAlert, setShowAlert] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;
  
  const [showTick, setShowTick] = useState(false);

  const handleButtonClick =async () => {
    try{
      const registro= await fetch( "http://localhost:3000/registroAgua/createRegistroAgua",{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          idUsuario:user.id,
          cantidadVasos:count,
          matriculaNacional:user.matriculaNacionalNutricionista
          
          
        })
      });
    
      if (registro.ok ){
        let data= await registro.json();
        console.log("crea registro");
        setShowTick(true);
        setShowAlert(false);
        setTimeout(() => {
          setShowTick(false);
        }, 1500);
        
      }
    }catch(e){
      console.log(e)
    } 
  
  };

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
    }).start(() => {
      setShowAlert(false)
    });
  };

  const handleShowAlert = () => {
    setShowAlert(true);
    fadeIn();
    
  };


  return(
    <View style={styles.fondoVerde}>
      <View>
        <Text style={styles.bannerPaciente}>Paciente</Text>
      </View>
      <View style={{flex:4}}>
        <View style={{alignItems: "center",justifyContent: "center",}}>
            <View style={{flexDirection: "row",alignItems: "center",justifyContent: "space-between",}}>
              <Text style={styles.textoTipoRegistroComida}>Agua</Text>
              <Image style={{width:65, height:65}} source={{uri:"data:image/png;base64,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"}}></Image>
            </View>
        </View>
        <View >
          <View><Text style={styles.textoCantidadVasos}>Cantidad de vasos {count} ({countml} ml)</Text></View>
          <View style={{flexDirection: 'row',justifyContent:"center"}}>
            <View style={{}}><TouchableOpacity onPress={incrementCount} style={{backgroundColor:"white",height:45,width:45, borderRadius:50, justifyContent:"center",margin:10}}><Text style={{color:"black",textAlign:"center",fontSize:35, fontWeight:"500"}} >+</Text></TouchableOpacity></View>
            <View style={{}}><TouchableOpacity onPress={decrementCount} style={{backgroundColor:"white",height:45,width:45, borderRadius:50, justifyContent:"center",margin:10}}><Text style={{color:"black",textAlign:"center",fontSize:35, fontWeight:"500"}} >-</Text></TouchableOpacity></View>
            </View>
        </View>
        <Animated.View
        style={{transform:[{scale:animation}]}}>
          <Image style={{ width:80, height:80, alignSelf:"center", margin:20}} source={{uri:"data:image/png;base64,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"}}></Image>
        </Animated.View>
        <TouchableOpacity onPress={handleShowAlert} style={{backgroundColor:"#52B69A",borderRadius:30, padding:20, margin:25}}><Text style={{fontSize:25,textAlign:"center", fontWeight:"bold", color:"white"}}>Añadir registro</Text></TouchableOpacity>
        <Modal visible={showAlert} transparent animationType="slide">
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0)' }}>
            <Animated.View style={{backgroundColor:"#76C893",padding: 25,borderRadius: 15,opacity: opacity,}}>
              <Text  style={{fontSize:25, color:"white", margin:10}}>¿Deseas añadir este registro?</Text>
              <TouchableOpacity onPress={handleButtonClick}>
                <Text style={{fontSize:20, color:"white", backgroundColor:"#52B69A", textAlign:"center", padding:10, borderRadius:15, margin:10}}>Guardar</Text>
              </TouchableOpacity>
              <TouchableOpacity animationType="slide" onPress={fadeOut}>
                <Text style={{fontSize:20, color:"white", backgroundColor:"#52B69A", textAlign:"center", padding:10, borderRadius:15, margin:10}}>Cancelar</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Modal>


        <Modal visible={showTick} transparent >
          <View style={{backgroundColor:"#01981F",}} >
            <Animatable.View animation="zoomIn" duration={1000} >
              <View style={{bwidth:"100%",height:"100%", justifyContent:"center"}}>
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
  bannerPaciente:{
    backgroundColor:"#76C893",
    textAlign:'center', 
    fontSize:35, 
    color:"white",
    fontFamily:"Serif-Sans", 
    fontWeight:"600", 
    padding:30
  },
  textoTipoRegistroComida:{ 
    color:"#99D98C", 
    fontWeight:"300",
    margin:20, 
    textAlign:"left", 
    fontSize:50, 
    borderRadius:10
  },
  textoCantidadVasos:{
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