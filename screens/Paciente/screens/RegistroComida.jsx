import React from 'react';
import {StyleSheet,Text,View,TouchableOpacity} from 'react-native';
import { Image } from 'react-native-animatable';

export const RegistroComida=(props)=>{
    return(
      <View style={styles.fondoVerde}>
        <View>
          <Text style={styles.bannerPaciente}>Paciente</Text>
        </View>
        <View style={{flex:4}}>

          <View style={{alignItems: "center",justifyContent: "center",alignSelf:"center"}}>
              <View style={{flexDirection: "row",alignItems: "center",justifyContent: "space-between",backgroundColor:"#52B69A",   borderRadius:10, margin:20 }}>
                <Text style={styles.tipoRegistroComida}>TIPO REGISTRO </Text>
                <Image style={{width:60, height:60, margin:15,alignSelf:"center"}} source={{uri:"data:image/png;base64,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"}}></Image>
              </View>
          </View>
          <View>
            <View>
              <TouchableOpacity style={{ alignItems: "center", justifyContent: "center" ,backgroundColor:"white", borderRadius:30, margin:20, alignItems:"stretch"}} onPress={()=>props.navigation.navigate('RegistroTipoComida')}>
                <View style={{flexDirection: "row",alignItems: "center",justifyContent: "space-between",}}>
                  <Text style={{color:"black",fontSize:20, fontWeight:"600", margin:15}}>COMIDA</Text>
                  <Image style={{width:50, height:50,margin:20}}source={{uri: "data:image/png;base64,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"}}></Image>
            
                </View>
              </TouchableOpacity>
            </View>
            <View style={{justifyContent: 'space-between'}}>
              <TouchableOpacity style={{ alignItems: "center", justifyContent: "center" ,backgroundColor:"white", borderRadius:30, margin:20, alignItems:"stretch"}} onPress={()=>props.navigation.navigate('RegistroTipoAgua')}>
                <View style={{flexDirection: "row",alignItems: "center",justifyContent: "space-between",}}>
                  <Text style={{color:"black",fontSize:20, fontWeight:"600", margin:15}}>AGUA</Text>
                  <Image style={{width:50, height:50,margin:20}}source={{uri: "data:image/png;base64,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"}}></Image>
          
                </View>
              </TouchableOpacity>
            </View>
            <View style={{justifyContent: 'space-between'}}>
              <TouchableOpacity style={{ alignItems: "center", justifyContent: "center" ,backgroundColor:"white", borderRadius:30, margin:20, alignItems:"stretch"}} onPress={()=>props.navigation.navigate('RegistroTipoActividad')}>
                <View  style={{flexDirection: "row",alignItems: "center",justifyContent: "space-between",}}>
                  <Text style={{color:"black",fontSize:20, fontWeight:"600", margin:15}}>ACTIVIDAD</Text>
                  <Image style={{width:50, height:50,margin:20}}source={{uri: "data:image/png;base64,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"}}></Image>
                </View>
              </TouchableOpacity>
            </View>

          </View>
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
  tipoRegistroComida:{
    backgroundColor:"#52B69A", 
    color:"black", 
    fontWeight:"bold", 
    margin:40,
    fontSize:25, 
    borderRadius:10
  },
  botonTipoRegistroComida:{
    backgroundColor:"white", 
    margin:35, 
    padding:10, 
    borderRadius:30
  },
  textoBotonTipoRegistroComida:{
    color:"black", 
    textAlign:"center",
    fontSize:20, 
    fontWeight:"600"
  }
})
