import React ,{useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView, Modal,Animated,Easing, TextInput,FlatList,Image
} from 'react-native';


export const HistorialComentarios=({paciente})=>{

    const [showAlert, setShowAlert] = useState(false);
    const opacity = useRef(new Animated.Value(0)).current;
    const [comentariosNutricionista,setComentarioNutricionista]=useState([])
    const [comentario,setComentario]= useState("");

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

    const createComentario=async()=>{
        let idUsuario= paciente.id
        let response= await fetch ('http://localhost:3000/comentario/createComentario',{
            method:'POST',
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify({
              comentario:comentario,
              idUsuario:idUsuario,
            })
        })
        if (response.ok){
            console.log("SE COMENTOOOO")
            setShowAlert(false);
            fadeOut()
            obtenerComentarios()
        }
    }

    const obtenerComentarios=async()=>{
        try{
            let idUsuario= paciente.id
            let response= await fetch("http://localhost:3000/comentario/getHistorialComentarios?idUsuario="+idUsuario)
            if(response.ok){
                let data=await response.json();
                setComentarioNutricionista(data);
                console.log("comentariosss"+data)
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
                
     

            <View style={{alignItems: "center",justifyContent: "center",alignSelf:"center", margin:10}}>
                <View style={{flexDirection: "row",alignItems: "center",justifyContent: "space-between"}}>
                <Text style={{ color: "white", fontWeight: "400", fontSize: 25, margin: 5 }}>Historial comentarios</Text>
                <Image style={{width:35, height:35, margin:5,alignSelf:"center"}} source={{uri:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAf0lEQVR4nO2SQQ6AIAwE+wmN/v9HcvA5Y0iMEuIBoYKQzokL7bCLiGEYAVRCfi8gH2EC5FaAUtf9CmjRrwCtK6C1gBb9CpAZ+TgCWpgAqRUksANrcG8CNhLRELgk3i73lH6kGXDnLBed56LhqTy82qexSE24Jeovj+qoE7uMygGGBQc7d6JY6AAAAABJRU5ErkJggg=="}}></Image>
                </View>
            </View>

            <View style={{alignItems: 'center',justifyContent: 'center',alignSelf: 'center',margin: 5,}}>

                <TouchableOpacity style={{borderWidth:2,borderColor:"#76C893",flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between',backgroundColor: '#52B69A',padding: 20,borderRadius: 15,margin: 5,}} onPress={handleShowAlert}>
                    <View style={{flexDirection: 'row',alignItems: 'center',}}>
                    <Text style={{fontSize:20, color:"white", fontWeight:"500",marginRight: 10}}>Añadir comentario</Text>
                    <Image style={{width:
                        25, height:25, }} source={{uri:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAABqUlEQVR4nO3awUoDMRRA0awUsX6vS7/JlUsX1u+6UkwQim0zmZSQvHugIMy0DO/2qVOakiRJkiRJmgTwcHqMvo6QgEfgHfgAnkZfTyjAAfjkz+nnw+jrCgF4Pht+8Q28jL6+qMMvjDBw+IURBg6/MMLA4RdGGDj8wggDh18YYeDwCyMMHH5hhMo73C+uu3a85rneMe945x9Pd7tXjte8hpuwZ/jp9/x/bXgtI7QO/1aAfNwI9xp+TYB8jhHuMfzaAPk8I/Qe/pYA+Vwj9Bz+1gD5fCP0Gn5LgPyc2BF6Db81QOgIPYe/J0DICPmrI10/ImBHgI0feazxlRfgtcc7v1eAyk14Syu5EOHYsuo9AtyIsNbwL0Q4tv6e7RXgQoQ1h38WoXn4vQOcRVh7+MXeP250DtDjmkLhDgG0gQEGww0wQGi4AQYIDTfAAKHhBhggNNwAA4SGG2CA0HADDBAaboABQsMNMEBouAEGCA03wACh4QYYIDTcAAOEhhtggNBwAwwQGm6AJEmS6v9NnF2aBYtKs2BRaRYsKs2CRaVZsKgkSZIkSZIkpXY/zpuc50yXVGUAAAAASUVORK5CYII="}}></Image>
                    </View>
                </TouchableOpacity>
     
            </View>

            
            <FlatList
                data={comentariosNutricionista}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
             
                  
                        <View  style={{backgroundColor:"white",borderColor:"#76C893",padding:15,margin:20,borderRadius:15,borderWidth:2,padding:15, marginVertical: 5, alignItems: "center", justifyContent: "center",alignItems:"stretch", borderRadius:25}}>
                          <View style={{flexDirection: "row",alignItems: "center",}}>
                            <Image style={{width:50, height:50,}}source={{uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAANs0lEQVR4nO1dCZBcRRnugCcqeFLihSKiljd4lAqiAhoFk+keRxC5PAAPwLIoRUVYqgCJAmIAk/17NkQCiq4iVpjutzFAsERB5RAPEOUIKhCEJBDOJJK1vp6B7Pvfm51587p7dpf5q7Yqld33d7/X3f/5/X8LMaABDWhAAxrQDKXa6OjT5MUjb1SGqsrQN6TRP5RW/1oZfY20dIsy+m5p6EH8uH/j/yxdjb/B3+IZPAse4NXv95l2VBsd3bLSqO8irT5GGr1cWv2wsnrcxw94SUtXKEPzVEJ7DhaoDQ0NDW1RTervl4YWS6Pv97UAHRfI6Puk0YsqlnYX4+OzxJOdahcvfKk0+iRpaWWsRVBtTw+tlIZOxJzEk41UY9EO0hApox/tUtTcrqxOlKEzKkZ/Xhr9QZnQzo7PsgXbHrBsybPwg3+7/0toZ/wN/hbP4NkWj86LgzkZPVxbpl8lZjrNTRa+Uho6Txm9scNHuVNavUSa+qfxjM/xq5Y+05rDnR3msFFZOre2lF4hZhoddjU9VRn6sjT6gckUrjJ6VNnhj+2+YugpMfRWxdKu7qRaWjfJ4jwkDZ0w285/upgJ5MSL0Te2V6z0d+xaiBzRJ8LYmIOydFP7haEbYHiI6UrY5dhZ0urH2rzkn6XRB8HMFVOEhoaGtsAJlVb/MV+M0SZl9HyceDGdCHJXGf27NqLpLmn1p6a0mTk+Pks16EBlaVUbi+yKuWPnvFxMB6pa+pA0tDrnJf6nDJ1ZW07biGlCcy9a/Fxp9Vlu7lmlfy+cSzGVSRnaXxq9IWcxbpGW3iGmKVXG6u+Uhm7Nea/10tJ+YiqSs6Jy9IW0+ue+TkXF0qthCkurvy+tvqxpLNAqbAJYcM65s/oq/L7S0HP3WUpbCY+nRRm6MOf9HpNWHymmEkF559nxPiZas4teJA0dByOguAdOq5Sho2ujpz/Tm25xGy9HhFk9JKYCYYJ5PgV2aBm+teW0jbR0uovilg2LGPorPHiP71yRhh7JjJPQUb7G6HVi+2fFFK1VjeH3leFbtcN7dB3q6PbH0L8RQa6a4bf7MLXxju5dM+KrTzpFJfrDWQVOa+c29FvL8K0itJEvErDTVyujL5CWvgJrTl288DUQaQijz/nlyHMQGkHkVjX0t5ATab84+maZ0OFlvW+8a3ZRaH1060s1Rrbnpi3EVDXRu5XhW4W3DOcrKwJ/KxOaU3RnV5K6QuhjEh1zXS0ZeW3Zk5IRX0bfG81PacWlruQKvKzOQFJKsegvciOwqsrwhRPaQfGvQ3S4tE5hpxrOY4yYnFBGn5ojn48oH2ZJx7twArFIpSc8Pj6rNlbf0Z2WZij+njxrTFr9Mt/GDTKTIiRB2WZEiqGfleVbMfpQrhyrdngPEYBgAruFYe8hLf3Eg0mc9lMwRoM+IEIQFCAis1w5lnb63Ivom9mCnCUCk7J0fFZXlYsmuFBLxqOnG4Lk7pWlY7negAlZli9yEtw4qDXOfrEITc0dndaFVtfLsq026F1ZK5G+LnwS0pkc/YHwhA/e0urT2EJfICKRsvWPcrPdh4+CE8704YNeM4/S6h+xj3bnbDt/ax+8sxYbVUUkwsfnSr5qR97mJe6VCd3TuX4mPVbfkR/BaqI/6S0hxE3dhLYTEUlafRETW5/1wbeZT0mLeC/hG8hVdvyu9ZVcAuSGfYx7RGQC9Ie934leGI+Pz5KGrme8qRRPeJsuFJDWHR/3mWfgnrOITA4qlN7Jw754K1Pfl/F+tBTuS1r9bW7CQcz4mrCLO6X5Xyoik7L1w9gctE8dxV0FAANLyHf6V2qyiT5EeCRp6nuxyS7zyb+rOSR0OBMrIz75N9EsKV9nZU+b2nnlLK7kMwPnxkj0buxjrBCRSVn6AnvPRT75O0Qlw6P1BCeCmRZy54BgYnKRKPqc7YSY9j1G9lsWXHS4+hzNFwIkBqOBLfpqEZmAuGcf60u+x8iTNoWwXTycgWybT2Wecswm4nwNbYpdswExOfFdy6YRJvG3UljiaoPe03PgDZVIIhA1K542j1WLDG4GcC+1+cbodUHGAcA7LZ6P7fphZfTlbEEOCjHJ5ljpkLVMaE6osTJjN0a2Zx9pXQhJkGttGX1JVw8evGLxM3g4I2Q6Uhr9zSCechcEJ5c5bpeLSIuPtG9XOX05tvAt7MFbQ03SjdcYnt0vX0QZOtOL09Yl8UqxuYbe1PGhakN/gi3I0pCT3GcpvTBjaY3HAWJLQ/9MnZCS8KUuxjOFI9stlOBEu/y0kJNsAuLSuZaK0TuJwATlzT7OJkCKgo5p9PcKK3Zl6Hz2cQ4NOklLZ6cnqXFKPhdyTDduor/Kx4UIixqmsXpJ54dQxz1xQVAyHIhgQGQykUafhP8PNebEsZWlk9miPBSydA2AB2ZE/KbzQwzUjA4IoSboKmnTi3FjqLHazoFFY31kDNtR1dbfzCTB9R0fUkbfllZ0I9uHmmBOPuRqEZk45BRzCjUWsAmFLVgOEa2N1Z8ftPSN2ea1iKET10eFwUDLAuaKWJRdZUi5Uxj0AwGKY/UaprN2FZGoiWCPF9yEfmI65NGOD/GUbegd26xNT+mR5UBtiMDUBLXpS7yiF7uKoqfGW9/xIVfMOHHHLj/rBSEnKRPau12RjQg1Jgp48sZsDM8WAQnfkp2Qe6eUUn8CnYH+V5kPROuCeOxOTOZ0bkAcK3CEAPUrhZW6svSXlBmY6DeIwAQsljL0C47/CtEABoWjOeXaF8aAryJ2VdjsRXFMLMcwZ+zvsI/1Rd9joHQiaslAWceQw0ZDh04mnbCl67yKkRzwWsz+JTkIl/OKw/SNPjXKbNvk8iseU6rSasn1VEy/B1XFPQQX02i70OH37Ph6mJ8SH6Vh4AFejPdCEZGU0Y3Ut02o1mVlaUFLwCOpxqIdchqclS7KB48g4Ocic2AWLGJbXZZ8xUvhdoNjUu7j9V4aBj2RXWRP5QElUrhdR7W5XxAS5NDWgTJ0B5vDA8hhFOWFZzKd7AzdEdrhzZnHIWkLUl9WoncJnRN0trlzqO+VKcw0ekNxPqy5gaFNFUMfEZEpBwl6XM+Y21BAuR5KBTYW5cFFFXiKyNQCrqdOvDL19xYMS3sACJekGvQZ86qL8uDef4xspHcoKQj53pCo8N4WRD9WlAcXe/1oL57FD9NiH7Ub93vrO1Uo762n9YLgm/H26ejU2gOj0S2l1f9JMyrXd6Qozbbzt2YL8nBRHjwjiK5BIiJxCCmKoHrWx5lgn9E3xlTuElHg9FH/b1EevOw5SlOCFuFb5ZS0nTJliz67KclWJaMG3DtG+F1EoiwKVG8onV+CD8JMz2tiQT0Vc6aQqynMg+V3ojm5zcjytb5bd8AX2CnTu6NBB3qZdEeIEK0tjPTrYC0CVBGjZW3V0sHch/J2OtF/hH2Yu0I1RN4dUVkkkfhVFkZv7KX7W6VRf31mQ7krKeiIUA3G8lprdJX7KNQvl189ZOgM353qJHryckT65vG+1itvdOPJ56lvhhXk2xTmZQ6AqPq8dqNd4mojWhGV5Ysd7LrUGX137kd7HIFfRm81e3Ix5HnaesPvfcBmK8nwu3m4BkVJIhAw+h/c6ukFQ4VIK6pdc/pVjTMlvg472Nc7oLFMh7tCHJzVNUtetmDbovz3bix4Hi/KgdkbDMDtWrNmWvzp0a470lkt0X2Hm9LZE0HrpdELQuRhABVVRv+g43VL2OXI8Jn6vt1GKNBWnYnZTaFaFT5BrUaSXKQcOWnHH6NPzbsxIWd3roX8jZEQw8KgCRuHsuaLNH0f7g2ZzIdo0+E7aLHTZiCCod/nYJsqWaQ3ndP5NKAzNl1atfUDYsfKNoti2g+1je0aOKdPDZ2PBs4TeaDjadaSoyujXfwC1HqmkbKhRwCU7ua+qdYirnQXPEbOa09Gc3418pLm3DMOHT8xGzB3iGEYNtlmzbQ2+i1vrl9hxpqg1dLov0129KEbYImIKU6VZmPn+RzrzBV2dmPqDaExwpN7ozmtwdv0Wj8qdqTVB6EDUjNzOdmFYZuVeIwoRvHiyYknxupjZsKds0MucqsPyrTiSC/I0WIqULbzXA/9PKYJSdZ5YsK7niymw5VHQLVPp4vA2lFtxdnP5jG9x8UUpICYitTUKdlrVZHYCllMGZpct2reZv2J/EafdUZ33aLTYfMJvsoZ/bzRs5dT0byALNc/WdM3a6ooOafQ6D+0sbhuQyPmfuC8CuKo9m93rThugvMevQ1NrbzGvHZmMer8HPp7it34qRLas61j2Lp6dVpbja2bP/NzHM0T8ycUBfnueFqEIEbRv5cX8zAr6iZAo8RMoFZfkeMzSS4mk5XR8wFjjSHOXL9H1Km7ZFJW500QTw/jkrEZc313puDS3bLW9gbp8dZuXIU+6UBtlGrNzQi8wNPdoT5JQuxxIwTlfdFjUv0gB5wwtDjv3lyVv0tvl5Z+ik5BSFgBZwyIEDBWExNkrhlAQtvhd/gbdwWf0Se5Z7u8F7F1jesiHtF9UhAsFWnouxlkuI3/A5SmAwaGrsufDgR53lL+5/m4arXrRXAXGuslUNZT2Qzvu7lcadR3QTgCfU86plqL/LgogsuZz4N5OyMVdWjaZylthUZnzawendAyCq5C3qWlF9Y0/QPn76xx+qb5u6ukoR+j2NM9m9DO/chIDmhAAxrQgAYkItH/ATXc/ukFoqfQAAAAAElFTkSuQmCC"}}></Image>
    
                            <Text style={styles.comentarioRegistro}> {item.stringComentario}</Text>
                          </View>
                        </View>
                    
       
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
                            <TextInput onChangeText={setComentario} placeholder="Escribe aqui tu comentario ..." placeholderTextColor={"white"}></TextInput>
                         </View>
                        <TouchableOpacity onPress={createComentario}>
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
    },comentarioRegistro:{
        
        color:"black",
        fontSize:15,
        margin:5,
        textAlign:"center",
        fontWeight:"500"
      }
    
  })