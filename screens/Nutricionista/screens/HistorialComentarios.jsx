import React ,{useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView, Modal,Animated,Easing, TextInput,FlatList
} from 'react-native';


export const HistorialComentarios=({paciente})=>{

    const [showAlert, setShowAlert] = useState(false);
    const opacity = useRef(new Animated.Value(0)).current;
    const [comentariosNutricionista,setComentarioNutricionista]=useState([])
    

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



    const obtenerComentarios=async()=>{
        try{
            let idUsuario= paciente.id
            let response= await fetch("http://localhost:3000/comentario/getHistorialComentarios?idUsuario="+idUsuario)
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
            <View>
            <Text style={styles.bannerNutricionista}>Nutricionista</Text>
            </View>
            <View style={{flex:4, justifyContent:"center"}}>
                
     

            <Text style={{color:"white", fontWeight:"200", fontSize:25, margin:10}}>Historial Comentarios</Text>
            <TouchableOpacity onPress={handleShowAlert}><Text style={{fontSize:20, backgroundColor:"#52B69A", color:"white", fontWeight:"500", padding:20, borderRadius:10,margin:5, textAlign:"center"}}>Añadir comentario</Text></TouchableOpacity>
            
            <FlatList
                data={comentariosNutricionista}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <ScrollView style={{ flex: 1 }}>
                    {(
                        <View >
                            <Text style={{color:"black", fontWeight:"500", margin:10, fontSize:15, backgroundColor:"white", borderRadius:10, padding:15, }}>{item.stringComentario} </Text>
                        </View>
                    )}
                    
                    </ScrollView>
                )}
            />
                <Modal visible={showAlert} transparent animationType="none">
                    <View style={{flex:1, justifyContent:"center", alignContent:"center",alignItems: 'center', backgroundColor: 'rgba(0, 0, 0)', borderColor:"#52B69A"}}>
                        <Animated.View
                        style={{
                        backgroundColor:"#76C893",
                        padding: 25,
                        borderRadius: 15,
                        opacity: opacity,
                        } }
                        >
                        <Text  style={{fontSize:20, color:"white", margin:10, fontWeight:"400"}}>¿Deseas guardar cambios?</Text>
                        <View style={{fontSize:20, color:"white", backgroundColor:"#52B69A", textAlign:"center", padding:10, borderRadius:15, margin:10, fontWeight:"600"}}>
                            <TextInput placeholder="Escribe aqui tu comentario ..." placeholderTextColor={"white"}></TextInput>
                         </View>
                        <TouchableOpacity onPress={fadeOut}>
                            <Text style={{fontSize:20, color:"white", backgroundColor:"#52B69A", textAlign:"center", padding:10, borderRadius:15, margin:10, fontWeight:"600"}}>Añadir Comentario</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={fadeOut}>
                            <Text style={{fontSize:20, color:"white", backgroundColor:"#52B69A", textAlign:"center", padding:10, borderRadius:15, margin:10, fontWeight:"600"}}>Cancelar</Text>
                        </TouchableOpacity>
                        </Animated.View>
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
    
  })