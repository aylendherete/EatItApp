import React,{ useContext,useState, useRef,useEffect }  from 'react';
import {StyleSheet,Text,View,TouchableOpacity,Modal,Animated, Easing, Image} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'
import * as Animatable from 'react-native-animatable';
import UserContext from '../../../context/userContext';
import { TextInput } from 'react-native-gesture-handler';

export const RegistroTipoActividad=(props)=>{
  const { user } = useContext(UserContext);
  const [showAlert, setShowAlert] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;
  const [descripcion,setDescripcion]=React.useState("");
  const [cantidadHoras,setCantidadHoras]=React.useState("");
  const [showTick, setShowTick] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleButtonClick = async() => {

    try{
      const registro= await fetch( "http://localhost:3000/registroActividad/createRegistroActividad",{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          idUsuario:user.id,
          descripcion:descripcion,
          tiempoTotal:cantidadHoras,
          matriculaNacional:user.matriculaNacionalNutricionista,
          horaInicio:date
          
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
      duration: 100,
      useNativeDriver: true,
      easing:Easing.linear
    }).start();
  };
  const fadeOut = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration:100,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start(() => {
      setShowAlert(false)
    });
    
   
  };
  const handleShowAlert = () => {
    setShowAlert(true);
    fadeIn();
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === 'android' ? false : showPicker); // Oculta el selector en iOS
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShowPicker(true);
  };
  
  const obtenerHora = () => {  
    const hora = date.getHours();
    const minutos = date.getMinutes();
    return `${hora}:${minutos < 10 ? '0' : ''}${minutos}`;
  };


  return(
    <View style={styles.fondoVerde}>
      <View>
        <Text style={styles.bannerPaciente}>Paciente</Text>
      </View>
      <View style={{flex:4}}>
        <View style={{alignItems: "center",justifyContent: "center",}}>
          <View style={{flexDirection: "row",alignItems: "center",justifyContent: "space-between",}}>
                <Text style={styles.textoTipoRegistroComida}>Actividad</Text>
                <Image style={{width:65, height:65}} source={{uri:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAJ3ElEQVR4nO1da4xkVRE+vkB3UfEtoqJGfCtqjAlxNcaEH6vBF4lo4g+Jrxg1iLuIBqVREXa6qmed7DB9Ts+sG8cHZADfCwioqIiCuzDizHRVj8vK4girLE93YYFlTN2e1b51u++j+/b0494vuUmnu899nO+eqjp1quoYkyNHjhw5cuTIkWPIMDlXemaZ4OOO8GeOkSzjf+SQz/Kd/DZxywXP6PV9Dj0Kvyk80TFssAT3OMblsMMS3GMJvyhten3fQwm3VFjjCLZHEeECxODVU9WRp/b6/ocKheXC4y3DlUnJcIdJYbhSztHr5xgaiJhqIpLulO8nefOrvdGzVFjjfWbc6Aj3BoghOKPXzzEUGJ8bP8oy7PN3Lv5JFHurNlsWzn+WI7hBkXLX9CysXd27H0I4Ln1ad+z4XPH5ke0WRo+R/za2rXDxk6tz10MMR3iZUtKF2G0ZzlVkXtLdu80AHMPuxk4tc+mEuG0navgmv3LHW7t7txmAI9zve8uXCmtit10qrFG6Z3937zYD6ISQ8bnxo/wiCx7o7t1mUGRVuPjGuG0ncpGVPizBpeotPzd2W8av50o9bUIYP6XNXjFpo9q5hdFj9PwlN3tTQD4x7EOI17aZ68QynFlZHH2tzMDlkM/yXTPXiaXiF3r9HEODNJyLy8vLj+v1cwyh+x1/kZgQgqty93uXIItNIr7iLlA5gjPyBapVgCzP2hqcZhl+6hiqMuFbOaqO8SfyW76EmyNHjgHD5K5vP6++ggjbHcE/HMGBFf3ymDdpJNxpGbZWCD6UxEeWIyG27S482RKcZxkPxg+GECMAscylY/MOTxFu16anO4bftz9nwYOWcdoRvionJo0JJOHV7ZKhRsyjjuHiJN7lHHp0VPH04MQQb3MMnyvPjxwvokz+N1YbO3KCR19WruFJjmHCEvwrhJjHLOPlFR55e97hCTA9C2u1D8sSXDtWG3taVFshSDzBlmAxfOSIKIT35G6YGCgzfkR14N1ba2PPSULqzPLMEyzhqY5gNsIdM+sYPiz/T3L+TMExzKhO+1a755IRUObSu6OMAxlRMrJkhKX7NEMAJ/OMxs6qjr4lnfPiOpnHiC4JscyWRH/NzBWOSOOaA48yl45Vo+OA2+GelPI1ThCrq259tRoxePNUdeQFJusoU/F9yrK6vp3ziM6JUtiTi6WXW8KKI3ioxWjZkfmR4lQwtmW8MAkRYg47hmv+J34YviLxwdGjEkp1L3PA1P6MyTIcw7ifEDgzSXvPsgp26n5HWJ6ojrwyrO1KYLfOW7nOZBmW4OdKlp+asP15rU1cPCTnrxC8q1V70Ruqzb0my3CM16kOWZesPVwcy6VCcMPUPBwXw6i4z2QZjvGvjR2S1P90WH80uktCTNzpQHvCL6dhVAxvhPz8yPFJ2luGP6gOHVuZseukn0BKg5eI6vnLfC6WDSbLsIy3NnZIM7ES0f5GpYPOl+8lS8sSPqgMhg82tnW10inaGMj8er4j2OUTWQv4ikSEEFzbLCnIEX5JdfZtOorFEf5WiTtrsg5LsNBuUo8gGO8F3xDHoRaFluCs4OzdL9ImFuB1JutwhNd3ZmXhlH7LK1z8gLKcDujJYqAd469Sf7hBhGW83Nd5tdIpidoTFpTI+pFj+LUaNZNNJoQH1Ivw/tQfbhDhCL+jOvSzSdpbKn1UiZ47tCjSYjBg6jLsztdHWmTbWoaRRIRWS68PmxCK0o8ydZO6a4Yatganqbf1x23EDPvM2zARmJu6EShz6a1Kls8nJdUx/LkpGU1MXW0mO0KX9HpDjdKe0lMaF47ks2ReJTmHt8bRXFz5TF0xa/V/Jqn4htQfatjmIpbhHR2W8Gg6ycxN3diE4EWdKNlyDV7TjJBG68oRPjs3dWMTAmcpUXNpEkJk6bZ5wBxc43ZterGseeh1l8yZurLGLW4MR3DTSk3FlqapC8h+vL3TQjcxrpFovjPQ8FwXBPcl6SCnjgsX8UUdh6K2IoPxxsyMjjoZeKgTMpy3UIUfS3JdieWKNzLgj0mjIgdbTHU4Mtz/5wc/SHJtiQPWOsIR/tKrcMqwzxL+TkjOVJiPpzN8nSrxT7AhVjkNwnWKkL1Jil9u2735aHXtq0zWIdF/7S6HFuo+pnt94mWxeGLc9pJyoAj5rsk6LOP9vk6JMTIigq5jd6q42JXi/rzJOrQeSNq+ElxYemjib/DcqHYSGOEYH2lQ3I8mXZsfSnRKyMxc4Yh6OKhPl4xFtRNlrSypOzOlvLtFSNNZO+PBCsFLTQjkd8fwsO/6VTzdZB1xCZHUMp0T4kIncvD9qGtbwi3KoPi3ZPWaLCMuIeIaSTgnORRlcYmuCc6B4AKTZcQfIe1MFuGWqEQey/BVvy7BB8W5aLKK7hKCcmyMWuxyBHuUgt9msop2CTEtEHCZE+4vVze/JOwevN17lLiTkrMmi0ibkKl5OC6Q5USwPewe6lGL/oh6x3CFySLSJkTgFcZU/5e8RBMCz4rTbWp4kskaukFIoe7j2qlGyZ6oQAidNyIFAzK3U083CDm81qFTmi0BmOg2vuQdiXI0WUK3CBFYxlGtrKMCs2VNRZnBt4slZrKCbhIy7m2fhH/3dTADh1WT81wqKiddFqoc49nlKrxz6LdR6iYhAlHMgRzCCOdjPR+95bzmES/qcSUNrlLb9EIzTOg2IQIpLKBFV1jas6S2SXWhEFL8hwRiE/xQ1lPc4sibB7p28GoQMj0La3VtLBFlYbW1HMH6JM5M/wEPSDLPSkjT+oFyWK4GIYIyFd8WsLoYtpqosk0S4Uj4CXGneHvvtkOQZ0zATaKH+j5BdLUIETjCoj6PrcHJJmmUTBXf6xg3SX2t0LSGJocXLUmw3vQrVpOQsdrYkZZgTr29e+Pskxi6YrlYPNHbYsOLhIR/xhBpD4tnwGSdEIEo3cBKIcMVadZVlIKb9bQ5mLCMf2lRc+uuvgy+W21CBFKOaTX3zq0HA+I3dXSm7Jll+g29IKTg1fvVxQO8t/jssD13O4UjOMd/TbzZ9Bt6QYhAVgWbzjW8txiqsiYvo0YSgdLaIEZ0lTaPzSAGygXrU0Eq5ZAkmTOspmLaJAWeoy8JCYSSBpdcA+sbhDvTuv5KoF38WXkHJOlaKlKv0fQbAptB1h17G+Vt8rKYvF3YdAFKiL3ZZBxIlQavuoMUTO4kLaIJSTJLXxFVGwPPQfg102+o5/H5A6bDDkkV2BJRsLITiIdYgrBl2z3H8D0vuTSF3JXAczDs66YB0RGkZkishyY8FLUUOwgkid5K6iHoCSlhu7HJb70gowsk3d33ZDSKL0+neOvhnsf0flF8ojO6Kaa6RZIE6tWTV71n2SHzkL4VUzly5MiRw2QF/wXNz/OFaXeO8QAAAABJRU5ErkJggg=="}}></Image>
              </View>
          </View>
        <View>
          <TextInput onChangeText={setDescripcion} style={styles.botonTipoRegistroComida} placeholder='Descripcion' placeholderTextColor={"black"}></TextInput>
          
            <View>
            <TouchableOpacity  style={styles.botonTipoRegistroComida} onPress={showDatepicker}>
              <Text style={styles.seleccionarHora}>Seleccionar hora de inicio: {obtenerHora()}</Text>
            </TouchableOpacity>
            {showPicker && (<DateTimePicker
                value={date}
                mode="time" // Puedes usar 'date' para solo fecha o 'time' para solo hora
                is24Hour={true}
                display="default"
                onChange={onChange}
            />)}
          </View>
          <TextInput  onChangeText={setCantidadHoras} style={styles.botonTipoRegistroComida} placeholder='Tiempo total' placeholderTextColor={"black"} keyboardType="number-pad"></TextInput>
          
        </View>
        
        <TouchableOpacity onPress={handleShowAlert} style={styles.botonAñadirRegistro}>
          <Text style={styles.textoBotonAñadirRegistro}>Añadir registro</Text>
        </TouchableOpacity>
        
        <Modal visible={showAlert} transparent animationType="slide" >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0)' }}>
            <Animated.View style={{backgroundColor:"#76C893", padding: 25, borderRadius: 15,opacity: opacity}}>
              <Text  style={{fontSize:25, color:"white", margin:10}}>¿Deseas añadir este registro?</Text>
              <TouchableOpacity onPress={handleButtonClick}>
                <Text style={styles.botonAlerta}>Guardar</Text>
              </TouchableOpacity>
              <TouchableOpacity  animationType="slide" onPress={fadeOut}>
                <Text style={styles.botonAlerta}>Cancelar</Text>
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
  botonTipoRegistroComida:{
    backgroundColor:"white", 
    margin:35, 
    padding:10, 
    borderRadius:30,
    color:"black", 
    textAlign:"center",
    fontSize:20, 
    fontWeight:"600"
  },
  textoBotonTipoRegistroComida:{
    color:"black", 
    textAlign:"center",
    fontSize:20, 
    fontWeight:"600"
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#52B69A',
    padding: 10,
    borderRadius: 5,
  },
  seleccionarHora:{
    color:"black", 
    textAlign:"center",
    fontSize:20, 
    fontWeight:"600"},
  botonAlerta:{
    fontSize:20, 
    color:"white", 
    backgroundColor:"#52B69A", 
    textAlign:"center", 
    padding:10, 
    borderRadius:15, 
    margin:10},
  tick: {
    fontSize: 50,
    textAlign:"center"
  },
  botonAñadirRegistro:{
    backgroundColor:"#52B69A",
    borderRadius:30, 
    padding:20, 
    margin:25},
    textoBotonAñadirRegistro: {
      fontSize:25,
      textAlign:"center", 
      fontWeight:"bold", 
      color:"white"
    }
});

