import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,ScrollView
} from 'react-native';


import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


const Tab = createMaterialTopTabNavigator();

export const  DatosPaciente=(props)=>{
    return(
        <View style={styles.fondoVerde}>
            
            <View style={{flex:3}}>
            
                <View style={styles.container}>
                    
                <View style={{flex:4, justifyContent:"center"}}>
                
                <ScrollView>

                    <Text style={{color:"white", fontWeight:"200", fontSize:25, margin:10}}>Historial Comentarios</Text>
                    
                    <Text style={{color:"black", fontWeight:"500", margin:10, fontSize:15, backgroundColor:"white", borderRadius:10, padding:10, }}>2023-10-2 {'\n'}Comentario nutricionista</Text>
                    <Text style={{color:"black", fontWeight:"500", margin:10, fontSize:15, backgroundColor:"white", borderRadius:10, padding:10, }}>2023-10-2 {'\n'}Comentario nutricionista</Text>
                    <Text style={{color:"black", fontWeight:"500", margin:10, fontSize:15, backgroundColor:"white", borderRadius:10, padding:10, }}>2023-10-2 {'\n'}Comentario nutricionista</Text>
                    <Text style={{color:"black", fontWeight:"500", margin:10, fontSize:15, backgroundColor:"white", borderRadius:10, padding:10, }}>2023-10-2 {'\n'}Comentario nutricionista</Text>
                    <Text style={{color:"black", fontWeight:"500", margin:10, fontSize:15, backgroundColor:"white", borderRadius:10, padding:10, }}>2023-10-2 {'\n'}Comentario nutricionista</Text>
                    <Text style={{color:"black", fontWeight:"500", margin:10, fontSize:15, backgroundColor:"white", borderRadius:10, padding:10, }}>2023-10-2 {'\n'}Comentario nutricionista</Text>
                    <Text style={{color:"black", fontWeight:"500", margin:10, fontSize:15, backgroundColor:"white", borderRadius:10, padding:10, }}>2023-10-2 {'\n'}Comentario nutricionista</Text>
                    <Text style={{color:"black", fontWeight:"500", margin:10, fontSize:15, backgroundColor:"white", borderRadius:10, padding:10, }}>2023-10-2 {'\n'}Comentario nutricionista</Text>
                    <Text style={{color:"black", fontWeight:"500", margin:10, fontSize:15, backgroundColor:"white", borderRadius:10, padding:10, }}>2023-10-2 {'\n'}Comentario nutricionista</Text>
                    
                </ScrollView>
                
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
   
    container: {
      flex: 1,
      
      justifyContent:"center"
    },
    registroDiario:{
      fontSize:15, 
      color:"black",
      textAlign:"center",
      borderRadius:10,
      backgroundColor:"white",
      padding:15,
      margin:5,
      
  }
})
