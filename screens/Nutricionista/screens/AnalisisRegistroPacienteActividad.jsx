import React, {useState,useRef,useEffect} from 'react';
import {StyleSheet,Text,View,TouchableOpacity,Modal,Animated, Easing,ScrollView,TextInput, Image, FlatList} from 'react-native';
import { format } from 'date-fns';


export const AnalisisRegistroPacienteActividad=(props)=>{
  const  idRegistro  = props.route.params.idRegistro;
  const [showAlert, setShowAlert] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;
  const [registro, setRegistro] = useState({});
  const[comentario,setComentario]=useState("");
  const[dateTime,setDateTime]=useState(null)
  const [comentariosNutricionista,setComentarioNutricionista]=useState([])

  const obtenerComentariosNutricionista=async()=>{
    try{
      let response= await fetch("http://localhost:3000/comentario/getComentariosRegistroActividad?idRegistro="+idRegistro)
      if(response.ok){
        let data=await response.json();
        setComentarioNutricionista(data);
      }
    }catch(e){
      console.log(e)
    }
  }


  const obtenerRegistro = async () => {
    try {
      console.log("ID REGISTROOOOOO", idRegistro);
      const response = await fetch(`http://localhost:3000/registroActividad/getRegistro?id=${idRegistro}`);
      if (response.ok) {
        const data = await response.json();
        console.log("Datos del registro:", data);
        setRegistro(data);

        setDateTime(format(data.horaInicio,'dd/MM/yyyy HH:mm'))
      } else {
        console.error('Error al obtener registro:', response.statusText);
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  useEffect(() => {
    obtenerRegistro();
    obtenerComentariosNutricionista();
  }, []);

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

  const handleShowAlert = () => {
    setShowAlert(true);
    fadeIn();
  };

  const handleSave = async() => {

    try{
      let response= await fetch( "http://localhost:3000/comentario/createComentarioRegistroActividad",{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          comentario:comentario,
          idRegistro:idRegistro,
          idUsuario:(registro.pacienteId)
          
        })
      });

      console.log("//////"+registro.pacienteId)
      obtenerComentariosNutricionista()
      if (response.ok){
        console.log("se comentó registro")
        fadeOut();
      }
    }catch(e){
      console.log(e)
    }
  };

  return (
    <View style={styles.fondoVerde}>
      <View>
        <Text style={styles.bannerNutricionista}>Nutricionista</Text>
      </View>
      <View style={{ flex: 4 }}>
 
        <View>
          <View  style={{backgroundColor:"white", margin:15,borderRadius:10,padding:15, alignItems: "center", justifyContent: "center",alignItems:"stretch", borderRadius:40}}>
            <View style={{flexDirection: "row",alignItems: "center",justifyContent: "space-between",}}>
              <Text style={styles.textoFechaRegistro}>{dateTime}</Text>
          
              <Image style={{width:50, height:50}}source={{uri: "data:image/png;base64,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"}}></Image>
            </View>
          </View>
        </View>

        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View>
            
            <View style={{ backgroundColor: "#52B69A", padding: 25, textAlign: 'center', margin: 20, borderRadius: 5 }}>
              <Text style={styles.textoRegistroPaciente}>Descripcion: {registro.descripcion} </Text>
              <Text style={styles.textoRegistroPaciente}>Tiempo total (minutos): {registro.tiempoTotal} </Text>
            </View>
          </View>
          <FlatList
                  data={comentariosNutricionista}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                   <View>
                      {item.idRegistroActividad && (
                        <View  style={{backgroundColor:"white",borderColor:"#76C893",padding:15,margin:20,borderRadius:15,borderWidth:2,padding:15, marginVertical: 5, alignItems: "center", justifyContent: "center",alignItems:"stretch", borderRadius:25}}>
                         <View style={{flexDirection: "row",alignItems: "center",}}>
                           <Image style={{width:50, height:50,}}source={{uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAANs0lEQVR4nO1dCZBcRRnugCcqeFLihSKiljd4lAqiAhoFk+keRxC5PAAPwLIoRUVYqgCJAmIAk/17NkQCiq4iVpjutzFAsERB5RAPEOUIKhCEJBDOJJK1vp6B7Pvfm51587p7dpf5q7Yqld33d7/X3f/5/X8LMaABDWhAAxrQDKXa6OjT5MUjb1SGqsrQN6TRP5RW/1oZfY20dIsy+m5p6EH8uH/j/yxdjb/B3+IZPAse4NXv95l2VBsd3bLSqO8irT5GGr1cWv2wsnrcxw94SUtXKEPzVEJ7DhaoDQ0NDW1RTervl4YWS6Pv97UAHRfI6Puk0YsqlnYX4+OzxJOdahcvfKk0+iRpaWWsRVBtTw+tlIZOxJzEk41UY9EO0hApox/tUtTcrqxOlKEzKkZ/Xhr9QZnQzo7PsgXbHrBsybPwg3+7/0toZ/wN/hbP4NkWj86LgzkZPVxbpl8lZjrNTRa+Uho6Txm9scNHuVNavUSa+qfxjM/xq5Y+05rDnR3msFFZOre2lF4hZhoddjU9VRn6sjT6gckUrjJ6VNnhj+2+YugpMfRWxdKu7qRaWjfJ4jwkDZ0w285/upgJ5MSL0Te2V6z0d+xaiBzRJ8LYmIOydFP7haEbYHiI6UrY5dhZ0urH2rzkn6XRB8HMFVOEhoaGtsAJlVb/MV+M0SZl9HyceDGdCHJXGf27NqLpLmn1p6a0mTk+Pks16EBlaVUbi+yKuWPnvFxMB6pa+pA0tDrnJf6nDJ1ZW07biGlCcy9a/Fxp9Vlu7lmlfy+cSzGVSRnaXxq9IWcxbpGW3iGmKVXG6u+Uhm7Nea/10tJ+YiqSs6Jy9IW0+ue+TkXF0qthCkurvy+tvqxpLNAqbAJYcM65s/oq/L7S0HP3WUpbCY+nRRm6MOf9HpNWHymmEkF559nxPiZas4teJA0dByOguAdOq5Sho2ujpz/Tm25xGy9HhFk9JKYCYYJ5PgV2aBm+teW0jbR0uovilg2LGPorPHiP71yRhh7JjJPQUb7G6HVi+2fFFK1VjeH3leFbtcN7dB3q6PbH0L8RQa6a4bf7MLXxju5dM+KrTzpFJfrDWQVOa+c29FvL8K0itJEvErDTVyujL5CWvgJrTl288DUQaQijz/nlyHMQGkHkVjX0t5ATab84+maZ0OFlvW+8a3ZRaH1060s1Rrbnpi3EVDXRu5XhW4W3DOcrKwJ/KxOaU3RnV5K6QuhjEh1zXS0ZeW3Zk5IRX0bfG81PacWlruQKvKzOQFJKsegvciOwqsrwhRPaQfGvQ3S4tE5hpxrOY4yYnFBGn5ojn48oH2ZJx7twArFIpSc8Pj6rNlbf0Z2WZij+njxrTFr9Mt/GDTKTIiRB2WZEiqGfleVbMfpQrhyrdngPEYBgAruFYe8hLf3Eg0mc9lMwRoM+IEIQFCAis1w5lnb63Ivom9mCnCUCk7J0fFZXlYsmuFBLxqOnG4Lk7pWlY7negAlZli9yEtw4qDXOfrEITc0dndaFVtfLsq026F1ZK5G+LnwS0pkc/YHwhA/e0urT2EJfICKRsvWPcrPdh4+CE8704YNeM4/S6h+xj3bnbDt/ax+8sxYbVUUkwsfnSr5qR97mJe6VCd3TuX4mPVbfkR/BaqI/6S0hxE3dhLYTEUlafRETW5/1wbeZT0mLeC/hG8hVdvyu9ZVcAuSGfYx7RGQC9Ie934leGI+Pz5KGrme8qRRPeJsuFJDWHR/3mWfgnrOITA4qlN7Jw754K1Pfl/F+tBTuS1r9bW7CQcz4mrCLO6X5Xyoik7L1w9gctE8dxV0FAANLyHf6V2qyiT5EeCRp6nuxyS7zyb+rOSR0OBMrIz75N9EsKV9nZU+b2nnlLK7kMwPnxkj0buxjrBCRSVn6AnvPRT75O0Qlw6P1BCeCmRZy54BgYnKRKPqc7YSY9j1G9lsWXHS4+hzNFwIkBqOBLfpqEZmAuGcf60u+x8iTNoWwXTycgWybT2Wecswm4nwNbYpdswExOfFdy6YRJvG3UljiaoPe03PgDZVIIhA1K542j1WLDG4GcC+1+cbodUHGAcA7LZ6P7fphZfTlbEEOCjHJ5ljpkLVMaE6osTJjN0a2Zx9pXQhJkGttGX1JVw8evGLxM3g4I2Q6Uhr9zSCechcEJ5c5bpeLSIuPtG9XOX05tvAt7MFbQ03SjdcYnt0vX0QZOtOL09Yl8UqxuYbe1PGhakN/gi3I0pCT3GcpvTBjaY3HAWJLQ/9MnZCS8KUuxjOFI9stlOBEu/y0kJNsAuLSuZaK0TuJwATlzT7OJkCKgo5p9PcKK3Zl6Hz2cQ4NOklLZ6cnqXFKPhdyTDduor/Kx4UIixqmsXpJ54dQxz1xQVAyHIhgQGQykUafhP8PNebEsZWlk9miPBSydA2AB2ZE/KbzQwzUjA4IoSboKmnTi3FjqLHazoFFY31kDNtR1dbfzCTB9R0fUkbfllZ0I9uHmmBOPuRqEZk45BRzCjUWsAmFLVgOEa2N1Z8ftPSN2ea1iKET10eFwUDLAuaKWJRdZUi5Uxj0AwGKY/UaprN2FZGoiWCPF9yEfmI65NGOD/GUbegd26xNT+mR5UBtiMDUBLXpS7yiF7uKoqfGW9/xIVfMOHHHLj/rBSEnKRPau12RjQg1Jgp48sZsDM8WAQnfkp2Qe6eUUn8CnYH+V5kPROuCeOxOTOZ0bkAcK3CEAPUrhZW6svSXlBmY6DeIwAQsljL0C47/CtEABoWjOeXaF8aAryJ2VdjsRXFMLMcwZ+zvsI/1Rd9joHQiaslAWceQw0ZDh04mnbCl67yKkRzwWsz+JTkIl/OKw/SNPjXKbNvk8iseU6rSasn1VEy/B1XFPQQX02i70OH37Ph6mJ8SH6Vh4AFejPdCEZGU0Y3Ut02o1mVlaUFLwCOpxqIdchqclS7KB48g4Ocic2AWLGJbXZZ8xUvhdoNjUu7j9V4aBj2RXWRP5QElUrhdR7W5XxAS5NDWgTJ0B5vDA8hhFOWFZzKd7AzdEdrhzZnHIWkLUl9WoncJnRN0trlzqO+VKcw0ekNxPqy5gaFNFUMfEZEpBwl6XM+Y21BAuR5KBTYW5cFFFXiKyNQCrqdOvDL19xYMS3sACJekGvQZ86qL8uDef4xspHcoKQj53pCo8N4WRD9WlAcXe/1oL57FD9NiH7Ub93vrO1Uo762n9YLgm/H26ejU2gOj0S2l1f9JMyrXd6Qozbbzt2YL8nBRHjwjiK5BIiJxCCmKoHrWx5lgn9E3xlTuElHg9FH/b1EevOw5SlOCFuFb5ZS0nTJliz67KclWJaMG3DtG+F1EoiwKVG8onV+CD8JMz2tiQT0Vc6aQqynMg+V3ojm5zcjytb5bd8AX2CnTu6NBB3qZdEeIEK0tjPTrYC0CVBGjZW3V0sHch/J2OtF/hH2Yu0I1RN4dUVkkkfhVFkZv7KX7W6VRf31mQ7krKeiIUA3G8lprdJX7KNQvl189ZOgM353qJHryckT65vG+1itvdOPJ56lvhhXk2xTmZQ6AqPq8dqNd4mojWhGV5Ysd7LrUGX137kd7HIFfRm81e3Ix5HnaesPvfcBmK8nwu3m4BkVJIhAw+h/c6ukFQ4VIK6pdc/pVjTMlvg472Nc7oLFMh7tCHJzVNUtetmDbovz3bix4Hi/KgdkbDMDtWrNmWvzp0a470lkt0X2Hm9LZE0HrpdELQuRhABVVRv+g43VL2OXI8Jn6vt1GKNBWnYnZTaFaFT5BrUaSXKQcOWnHH6NPzbsxIWd3roX8jZEQw8KgCRuHsuaLNH0f7g2ZzIdo0+E7aLHTZiCCod/nYJsqWaQ3ndP5NKAzNl1atfUDYsfKNoti2g+1je0aOKdPDZ2PBs4TeaDjadaSoyujXfwC1HqmkbKhRwCU7ua+qdYirnQXPEbOa09Gc3418pLm3DMOHT8xGzB3iGEYNtlmzbQ2+i1vrl9hxpqg1dLov0129KEbYImIKU6VZmPn+RzrzBV2dmPqDaExwpN7ozmtwdv0Wj8qdqTVB6EDUjNzOdmFYZuVeIwoRvHiyYknxupjZsKds0MucqsPyrTiSC/I0WIqULbzXA/9PKYJSdZ5YsK7niymw5VHQLVPp4vA2lFtxdnP5jG9x8UUpICYitTUKdlrVZHYCllMGZpct2reZv2J/EafdUZ33aLTYfMJvsoZ/bzRs5dT0byALNc/WdM3a6ooOafQ6D+0sbhuQyPmfuC8CuKo9m93rThugvMevQ1NrbzGvHZmMer8HPp7it34qRLas61j2Lp6dVpbja2bP/NzHM0T8ycUBfnueFqEIEbRv5cX8zAr6iZAo8RMoFZfkeMzSS4mk5XR8wFjjSHOXL9H1Km7ZFJW500QTw/jkrEZc313puDS3bLW9gbp8dZuXIU+6UBtlGrNzQi8wNPdoT5JQuxxIwTlfdFjUv0gB5wwtDjv3lyVv0tvl5Z+ik5BSFgBZwyIEDBWExNkrhlAQtvhd/gbdwWf0Se5Z7u8F7F1jesiHtF9UhAsFWnouxlkuI3/A5SmAwaGrsufDgR53lL+5/m4arXrRXAXGuslUNZT2Qzvu7lcadR3QTgCfU86plqL/LgogsuZz4N5OyMVdWjaZylthUZnzawendAyCq5C3qWlF9Y0/QPn76xx+qb5u6ukoR+j2NM9m9DO/chIDmhAAxrQgAYkItH/ATXc/ukFoqfQAAAAAElFTkSuQmCC"}}></Image>
   
                           <Text style={styles.comentarioRegistro}> {item.stringComentario}</Text>
                         </View>
                       </View>  
                      )}
                    </View>
                  )}
            />
          <View>
            <TextInput onChangeText={setComentario} style={styles.inputComentarioRegistro} placeholderTextColor="black" placeholder='Añadir comentario'></TextInput>
          </View>
          <TouchableOpacity onPress={handleShowAlert} style={{ backgroundColor: "#52B69A", borderRadius: 30, padding: 20, margin: 25 }}>
            <Text style={{ fontSize: 25, textAlign: "center", fontWeight: "bold", color: "white" }}>Guardar cambios</Text>
          </TouchableOpacity>
        </ScrollView>
        <Modal visible={showAlert} transparent animationType="none">
          <View style={{ flex: 1, justifyContent: "center", alignContent: "center", alignItems: 'center', backgroundColor: 'rgba(0, 0, 0)' }}>
            <Animated.View
              style={{
                backgroundColor: "#76C893",
                padding: 25,
                borderRadius: 15,
                opacity: opacity,
              }}
            >
              <Text style={{ fontSize: 25, color: "white", margin: 10 }}>¿Deseas guardar cambios?</Text>
              <TouchableOpacity onPress={handleSave}>
                <Text style={{ fontSize: 20, color: "white", backgroundColor: "#52B69A", textAlign: "center", padding: 10, borderRadius: 15, margin: 10 }}>Guardar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={fadeOut}>
                <Text style={{ fontSize: 20, color: "white", backgroundColor: "#52B69A", textAlign: "center", padding: 10, borderRadius: 15, margin: 10 }}>Cancelar</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fondoVerde: {
    backgroundColor: "#D9ED92",
    flex: 1
  },
  bannerNutricionista: {
    backgroundColor: "#76C893",
    textAlign: 'center',
    fontSize: 35,
    color: "white",
    fontFamily: "Serif-Sans",
    fontWeight: "600",
    padding: 30
  },
  textoNombreApellidoPaciente: {
    color: "white",
    fontWeight: "300",
    margin: 15,
    textAlign: "left",
    fontSize: 40,
    borderRadius: 10,
    textAlign: "center"
  },
  textoFechaRegistro: {
    color: "black",
    fontSize: 20,
    textAlign: "left",
    margin: 15,
    fontWeight: "600"
  },
  textoTipoRegistroPaciente: {
    fontSize: 40,
    textAlign: "left",
    color: "#99D98C",
    margin: 8
  },
  textoRegistroPaciente: {
    backgroundColor: "#52B69A",
    color: "black",
    fontWeight: "600",
    textAlign: 'center',
    fontSize: 18,
    margin: 10,
    borderRadius: 5
  },
  inputComentarioRegistro: {
    backgroundColor: "white",
    color: "black",
    fontSize: 15,
    margin: 15,
    borderRadius: 15,
    textAlign: "center",
    fontWeight: "500"
  },
  comentarioRegistro:{
    color:"black",
    fontSize:15,
    margin:5,
    textAlign:"center",
    fontWeight:"500"
  }
  })