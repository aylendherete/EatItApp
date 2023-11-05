/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView
} from 'react-native';

export const ElegirNutricionista=(props)=>{
    return(
    
        <View style={styles.fondoVerde}>
        <View style={styles.fondoVerde}>
            <Text style={{fontWeight:"500", fontSize:35, textAlign:"center", color:"white"}}>Elegi el nutricionista!</Text>
        </View>
        <View style={styles.fondoVerdeClaro}>
            
            <ScrollView>
            <View style={{backgroundColor:"#52B69A",borderRadius:10, padding:20, margin:15}}><TouchableOpacity onPress={()=>props.navigation.navigate('RegistroPaciente')}>
                <Text style={{color:"white", fontSize:25, fontWeight:"bold"}}>Pepe Perez</Text>
                <Text style={{color:"white", fontWeight:"300", fontSize:15}}>turno mas reciente: 19/10/2023</Text>
                </TouchableOpacity>
            </View>
            <View style={{backgroundColor:"#52B69A",borderRadius:10, padding:20, margin:15}}><TouchableOpacity onPress={()=>props.navigation.navigate('RegistroPaciente')}>
                <Text style={{color:"white", fontSize:25, fontWeight:"bold"}}>Pepe Perez</Text>
                <Text style={{color:"white", fontWeight:"300", fontSize:15}}>turno mas reciente: 19/10/2023</Text>
                </TouchableOpacity>
            </View>
            <View style={{backgroundColor:"#52B69A",borderRadius:10, padding:20, margin:15}}><TouchableOpacity onPress={()=>props.navigation.navigate('RegistroPaciente')}>
                <Text style={{color:"white", fontSize:25, fontWeight:"bold"}}>Pepe Perez</Text>
                <Text style={{color:"white", fontWeight:"300", fontSize:15}}>turno mas reciente: 19/10/2023</Text>
                </TouchableOpacity>
            </View>
            <View style={{backgroundColor:"#52B69A",borderRadius:10, padding:20, margin:15}}><TouchableOpacity onPress={()=>props.navigation.navigate('RegistroPaciente')}>
                <Text style={{color:"white", fontSize:25, fontWeight:"bold"}}>Pepe Perez</Text>
                <Text style={{color:"white", fontWeight:"300", fontSize:15}}>turno mas reciente: 19/10/2023</Text>
                </TouchableOpacity>
            </View>
            <View style={{backgroundColor:"#52B69A",borderRadius:10, padding:20, margin:15}}><TouchableOpacity onPress={()=>props.navigation.navigate('RegistroPaciente')}>
                <Text style={{color:"white", fontSize:25, fontWeight:"bold"}}>Pepe Perez</Text>
                <Text style={{color:"white", fontWeight:"300", fontSize:15}}>turno mas reciente: 19/10/2023</Text>
                </TouchableOpacity>
            </View>
             
            </ScrollView>
            </View>  
          
            
        </View>
        );
}


const styles=StyleSheet.create({
  fondoVerde:{
    backgroundColor:"#99D98C", 
    flex:1,
    justifyContent:"center"
  },
 
  fondoVerdeClaro:{
    backgroundColor:"#D9ED92",
    flex:3,borderTopLeftRadius:120,
    borderTopRightRadius:120,
    justifyContent:"center"
    
  },
  botonTipo:{
    justifyContent:"center",
    margin:5,
  },
  textoTipo:{
    textAlign:"center", 
    fontSize:25,
    fontFamily:"Serif-Sans", 
    color:"white", 
    fontWeight:'bold', 
    backgroundColor:"#99D98C", 
    borderRadius:20, 
    margin:5,
    padding:15
  }
})