import React, { useEffect, useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity, FlatList, ScrollView, Image
} from 'react-native';

import { format } from 'date-fns';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import UserContext from '../../../context/userContext';

const Tab = createMaterialTopTabNavigator();

export const HistorialComentarios = (props) => {

  const { user } = useContext(UserContext);
  const [comentariosNutricionista, setComentarioNutricionista] = useState([])

  const obtenerComentarios = async () => {
    try {
      let response = await fetch("http://localhost:3000/comentario/getHistorialComentarios?idUsuario=" + user.id)
      if (response.ok) {
        let data = await response.json();
        setComentarioNutricionista(data);
      }
    } catch (e) {
      console.log(e)
    }
  }



  useEffect(() => {
    obtenerComentarios();

  }, []);



  return (
    <View style={styles.fondoVerde}>

      <View style={{ flex: 3 }}>

        <View style={styles.container}>
          <View style={{alignItems: "center",justifyContent: "center",alignSelf:"center", margin:10}}>
            <View style={{flexDirection: "row",alignItems: "center",justifyContent: "space-between"}}>
              <Text style={{ color: "white", fontWeight: "400", fontSize: 25, margin: 10 }}>Historial comentarios</Text>
              <Image style={{width:35, height:35, margin:10,alignSelf:"center"}} source={{uri:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAf0lEQVR4nO2SQQ6AIAwE+wmN/v9HcvA5Y0iMEuIBoYKQzokL7bCLiGEYAVRCfi8gH2EC5FaAUtf9CmjRrwCtK6C1gBb9CpAZ+TgCWpgAqRUksANrcG8CNhLRELgk3i73lH6kGXDnLBed56LhqTy82qexSE24Jeovj+qoE7uMygGGBQc7d6JY6AAAAABJRU5ErkJggg=="}}></Image>
            </View>
          </View>

          <FlatList
            data={comentariosNutricionista}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ScrollView style={{ flex: 1 }}>
                {(
                  <View >
                    <Text style={{borderColor:"#76C893",borderWidth:0.5, backgroundColor: 'white', borderRadius: 10, padding: 15, marginVertical: 5, color: "black", fontWeight: "300", fontSize: 15 }}>{item.stringComentario} </Text>
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

const styles = StyleSheet.create({
  fondoVerde: {
    backgroundColor: "#D9ED92",
    flex: 1
  },
  bannerPaciente: {
    backgroundColor: "#76C893",
    textAlign: 'center',
    fontSize: 35,
    color: "white",
    fontFamily: "Serif-Sans",
    fontWeight: "600",
    padding: 30
  },

  container: {
    flex: 1,

    justifyContent: "center"
  },
  registroDiario: {
    fontSize: 15,
    color: "black",
    textAlign: "center",
    borderRadius: 10,
    backgroundColor: "white",
    padding: 15,
    margin: 5,

  }, itemContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
  },
})
