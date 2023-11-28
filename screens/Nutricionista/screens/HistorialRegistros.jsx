import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView
} from 'react-native';

export const HistorialRegistros=(props)=>{
    return(
        <View style={styles.fondoVerde}>
            <View>
            <Text style={styles.bannerNutricionista}>Nutricionista</Text>
            </View>
            <View style={{flex:4, justifyContent:"center"}}>
                <Text style={{color:"white", fontWeight:"200", fontSize:25, margin:10}}>Historial Registros</Text>
                  <ScrollView>
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
    
  })