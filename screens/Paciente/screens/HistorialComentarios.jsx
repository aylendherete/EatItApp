import React , {useEffect, useState, useContext}from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,FlatList,ScrollView
} from 'react-native';

import { format } from 'date-fns';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import UserContext from '../../../context/userContext';

const Tab = createMaterialTopTabNavigator();

export const  HistorialComentarios=(props)=>{
  
  const { user } = useContext(UserContext);
  const [comentariosNutricionista,setComentarioNutricionista]=useState([])

  
  const obtenerComentarios=async()=>{
    try{
        let response= await fetch("http://localhost:3000/comentario/getHistorialComentarios?idUsuario="+user.id)
        if(response.ok){
            let data=await response.json();
            setComentarioNutricionista(data);
        }
    }catch(e){
      console.log(e)
    }
}



  useEffect(() => {
    obtenerComentarios();
    
  }, []);



return(
  <View style={styles.fondoVerde}>
      
    <View style={{flex:3}}>
      
      <View style={styles.container}>
        <Text style={{ color: "white", fontWeight: "200", fontSize: 25, margin: 10 }}>Historial comentarios</Text>
        
        <FlatList
            data={comentariosNutricionista}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <ScrollView style={{ flex: 1 }}>
                {(
                    <View >
                        <Text style={{backgroundColor: 'white',borderRadius: 10,padding: 15,marginVertical: 5,color:"black", fontWeight:"300", fontSize:15}}>{item.stringComentario} </Text>
                    </View>
                )}
                
                </ScrollView>
            )}
        />
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
      
  }, itemContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
  },
})
