import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView
} from 'react-native';

export const HistorialComentarios=(props)=>{
    return(
        <View style={styles.fondoVerde}>
            <View>
            <Text style={styles.bannerNutricionista}>Nutricionista</Text>
            </View>
            <View style={{flex:4, justifyContent:"center"}}>
                
                <ScrollView>

                    <Text style={{color:"white", fontWeight:"200", fontSize:25, margin:10}}>Historial Comentarios</Text>
                    <TouchableOpacity><Text style={{fontSize:20, backgroundColor:"#52B69A", color:"white", fontWeight:"500", padding:20, borderRadius:10,margin:5, textAlign:"center"}}>Añadir comentario</Text></TouchableOpacity>
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