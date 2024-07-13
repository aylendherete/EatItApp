import React ,{useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,Modal,
  Animated, Easing,Image
} from 'react-native';

export const EditarObjetivo=(props)=>{

  const { paciente } = props.route.params;
  const [showAlert, setShowAlert] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;

  const [objetivo,setObjetivo]=React.useState("");


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
    return(props.navigation.navigate('PerfilPaciente',{paciente}))
  };

  const handleShowAlert=()=>{
    setShowAlert(true);
    fadeIn();
    
  }
    
  const handleSave = async() => {

    try{
      const response = await fetch(`http://localhost:3000/paciente/updateObjetivo?id=${paciente.id}&objetivo=${objetivo}`, {
        method: 'POST',
      });
      if (response.ok) {
        const data = await response.json();
        console.log("SE ACTUALIZÓ PACIENTE",paciente.id)
        fadeOut();
        return(props.navigation.navigate('PerfilPaciente',{paciente}))
    
      }

    }catch(e){
      console.log(e);
    }
  };
    console.log("PACIENTEEEEEEEEEE",paciente)
  return(
      <View style={styles.fondoVerde}>
          <View>
          <Text style={styles.bannerNutricionista}>Nutricionista</Text>
          </View>
          <View style={{flex:4}}>
            <Image style={{width:135, height:135, alignSelf:"center",margin:20}}source={{uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAQCUlEQVR4nO1dCbAcRRmegKCoeIH3haiIForlfXEIiJQEst3riiJXRIOiCHiUnHlguBQiRQV47//3JeGIWixojrfd+zBiNAlyhSvgAUjCIRASCOFI8giSZ/0985Kdnpndv2dm9+2+en/VVD3C9nRP/93/+fXfnjdO4zRO4zRO4zRG6ehFs18lBnv3LFbxG7KKZwiNv5UKbpIalwsND0qNa4WGF4WG//l/43+lwv9IhUuExquEwrNlDY+ZVMWP77Oo5xWj/T1dR1OWwXYFDV+SGqYKBYukwiGpcTiPRyh4QShYLBVcIKt9e5cqlW1H+3s7knp6erYp6r79pYYrpYbn8mIA41kjFF4hanBwnswRCs7yupEmDc56t9B4nlTwSBuZMBz7KHiEJpLGlOWb6B30Pq+bqDRY/oBQ0E+ynzdZuFIqrAqNFxUUfq+gYR8x0L9H6Xp838HVy99IYo5WOP1dGuh9Z0HhbrIGB9BvhcLzpYZ5QuMTzL5eEgpmFzS8Py0zuoYhNIGklAMF3Gi1PkYKmZRxaQG8J6/+J9V6d5EKDpcK5kgNz3AYw+2/nhkdz5CD9CWvDCykDckKF5838lzhfqRTWj0m2lW0i0yfDcYlNa6XCk4tVSrbc5nR0Qyhj5Ya7kv+YLivqOE7R1x/1WtGa4wk6oTGk4SCBxpYaP8my4zDjI5kCNn8NFih8eWEj1wuFB7VSaZnT0/PNqIGJaHx/gRRulkqvGRktyQxo+MYIqv97xUab07YEatkFY70hocneB1KU5bBdkLhDxP1DDmmCn/TSAd5nUKi2ncQecyRLU+KXOFlk+bOfoPXJVSqXvo23wDI18Rum59S1OUjhMJNMcx4SGj8nNelJGpwsFCwuquYITSeEKsvFM4vDZbf5HU5iesvf4vUWMvIkJ62DFZq/GWciBIaTu5kXZFG6XfBzoCTY3bFkFRQzH2FKijSKpMKfy8V3i4UrDARXoWbAlFJkd+HpMJbhYLf0UIpVHHSxAWwc17j6HidYUzBUOf4rKzCl3N5v+r7lG/NwD12P06Pgs1C4T8obkah/Cxj6lhmkDVlK3BiBk1ilvceOq9/R6nwJzSBeVs3dZN0r6jBcRMXwKtdx9eRzCA/I2LakpjKsDOMt6zgLKHg6VYxIka0PiUUnlaqTN+B9d2qfFjHMcM4TZbT5/sYKXXG8PAEocqTm5mVwhgJeDNFfIWC7xZruFd9tJciA/S3WSzVvr0pHCMVXEz6hAKFTUTaoyR+mzKj2XvazQwimpCYyTo5zbsoxE2p1gZMeFFonEvMPkhf8rq0Y6a2FOWldzUM+SusHvqn/nd0DTNMoNBW4hrnpjFthcavC4XrkkUJnJmndbSl3xq8XSiYRtnChAl9Wury1xoyg/5blQ/zRj2EbkdtFa4kMeH0ouHhCVLhhQmT8YKR6Ysufa3XYiothNcbqysm9E4OrtD4C6Hhm1mYQX1Q6IXmLvcPoHyGLdMLtb7Puwft4OqEXTGf5L/XZpLVmbsaMAXPCHBixhZdW8UzWpHpC68khZelYMaCmF2xUWg43htNGh6eYBzcRnoiLTP8Z32uiy3weusGCKucorbGkorZGZSqrcEnvA6hgoZ94iLVrjqjsHDGTvZ7KB2cHyDBzoFTPsOB4nQGJYFo53kdRDJHBS4VnBh5z0DvBzMPktAh1ovvcrGqyJqKY8Yh88tv9TqIZM7WVOCvhTKPBNzIATcVttsJ0uniZ0RMWwWPddrOEDUo2cwIHNFvZ3qvKk8Oiy3cRDCl9C8kEFtYd9zHzoH75u2SiALPqDMKxGQNx5NeEwruCMIfFFNb7+O34CZCkpDnTRm/PHeGscholTMlRGDIrMglJ2Ji/xaikMIRaVdHsOpSWVOlSmXbYg2/JTTeyDJPw1HehUUNB+bEjIf9hVWezJ4HjSfZEiIV6NvH2oa22/NcqE4QKAzHphTOdx6ER+OAAw0Ex4UR8Wbr7ULDp9MwIzD7H6773ZNc59XE12j3hhd27AJpSD7wOcSQK7htY+AxznZ4qTJ9B6kBMzPCmnATNqnCkS4KnKyjKFYApvLnA6+w5nKmq4jY3kahE6KQm8+wQ+gUDnHqX898s9B4W6PVThNSrJX3lYOwO+1cym0Q7NP3JWCq0LDUhVHNrCmhcYbFkGe4u0TW8KtWn2sbISEj5J/PCMs9LryTkkvWxz7lEpsqETMU/itOH0gF15Zq/R/ivouyg8YhbZRtZJq2wbieDS00jSc4KPdwnicGBZlItMLS2s92po+iti5iSsTsDLJUssCIKHEWi3539DOEwnOsXfJPdlsCj4elxtnsD4gE22p4DDsHHmIkvOgSQpcxOkNo/FvWMHxeTh9ZWvZuK1TLn2S1reEx1twsZZ/ps4+RcSH5NrzS5EqYRJaHjGGGk6xtgwceWawKL3RIe9e3GyJR1rzDwd49rYYruYM16JCw3C9y/QzbtBUKVnTKzqgnAohbC2c5uy0dSK1rO0nBR5s2Mqddw3JywAE3tXU7K3yJwtCctuT02QpcZISeuvoZXIAGoTDD3wmbKQvJaSsUqPrxNMvjjzQ60xIbF3E6C0Bs9ZN6C6ed6dP2wBVcy22blwcuFP6ZPV7LCiQwHrPd+dbcnsf4mDDam87pcToziMKw0prOBzqEV1zJwbTNKxxi+mUG/qSGWWmADdFgI1ztvFrJ0UqTxCKoDqudhuOtybvda5POkBp1msVHv7P6qKQxXMhAaP5RGpeHGg3078HpTGpYFpKPNdwrZTZyqud2rPq6IKqw1lWBmyoPKbJ69G2W6LmZ066kez9itbu/aSMTwq7/KGYMyoCc6y2IWu8urHYUQg8xsrwvmxmNUI4Ma4oUubUYlnH6NkZAWOc9yj4AFGbIE00bUagjtI0XztiJ01lu7RTuxmnn74z0zNiiv8IMWcWG94R2Fq5jA/bC7Z5lfGg4Q8h1zPJqd+i8/h057ZqU4FjLeQfF2CyRtZF9pDo8sZta1m4sMEQwV6xB2od31hAfNNimdl0ksuYmMkTDNZx3kHlt7ZDVnHYUQbD6XNOydqOt1CXXY/YnMw5D9ZTQ+C5e37hfHkqdwjwta9d2s5cKkmUwe6XCCilH82i4hsuMuMwmy1HbCqirXwS3ctoVdfljVn93Nx+klWlrtWMoNfwgL8fQlaSGO8OLoTyF1648JTxmmMNqZ5vZCpc0bxQ5KM8dpJ3U4oVOIjkGlS10wqVCtfxha1I3c8WzOQgUErM8MHVB4fedE3/R4CJzYjMFF8O7Umi8zmsxSQV/tHb0Ym5bO6spNIpUjNRwunv4XWGV0xnlnOtXOiH/uOF3cw7DWq3FKnzBaxFJVf5ixDKrQYlfOWgr1pnOkrAtSit2RjBbZ8XjlqCyDAJOh0GCivLT0uqXmOzlTD6iJWwRUmKND+IIH/wkK5HbdwjbxTWYTFlWBRtTmr7TrQ+d51ZXC3NP4dYTvctUJbV3IzN+RmSfcREaf8XWleF2G9gnq4TGv4RXAQ86SbjdjCCH3lim5LBTfBiPxQz//TO476CsaORsPrMQgdR4bHhO+QmxqGJn2uexeXUHv+JoA7CAWyKTpmBFFp1COiMqpoxY/LvL+b+YcP3d7LaWv+UEHowoPYWPc2VspPaJI1BuogkvWPpkxCxV8AcyV51MW8uaqpvMe7nKuC5SaxVLgBMddOQqa2fyMQN+VNIK3tXgAHYE1YpPuR56nLgAdk6uSGd23Z1+1Qfcj6Ck1KfpdxB2p3/zPXDb6QvvDBdmJHj1q7ng82imENc5I+Ape2ZNwpVpRR6BrbmxrbBxgZcnMyXF46NZZrgeU/YPHlmGjoJTue1tZ5tOpXmuZAfeXI4j0IFQguyn8Wds8ld8HoVo4B4Xayp08MguXKbwcW6agHYunb9PE46KVui07GayFDIAytjg5PjDQwbAsMSpTJM5sAOLyelLWws4cuDGf+/h3PbRuBeuTF3UTWo415rQ+12OtJHJag1mKGv5phIdnqnBcUF16mV+uN1cV0GJrjX0b/4R7PIUVzFpU2Gw/JlobRS4gdue9IS5OiMsrqalHhCFsu0BUZiD254wwdGzIrCam4QaTQowWzZifq0Lk83BIGtBZjr0mYBIX+54LFpEq87BA512LNpGh0SqXJtv6DvEc6rPaJvv0OtlpaCEUgjvVNRwtMs7bAjlCFNoFXodRgX/e0NiJo2ooXyQZRRtyipC618eLouh8EmnKkCmtEb4nN2ItZJVp+RJxSp81nbggsmc6SIVgtIaa1pSWqPubMP6LNvPKDgN82KYMpTW+sqNfAPkpLjiZgSmcHXibDFvbn5wSC3zOlFwqjXQl13jS36B/pidEvgppVGo8BCA5RIKJMMsV2YQliBSULqGP8994H7oOgzDJz/FuWq1L77Oj/MnhCkBBVO5TlcWothUcHvDhgT/ZZqrv2DicAoetUTVvayTUmnIeO9Ri2lBGkdHKijEwnj0SJk97GlFgioIoZ/duG++NWWVoAodyDE7xeW0bRqihEx0ZcPP0l9BhH+NFxdoLBNiOKWVs9yqYKopmEwfDMRdFlAnom5Ie8WS1HBKzPvO9VpNQdmhGyM1Cpk56QgND08wtyo0ubRL+NV5bvOBAuUpBhtVnbkriUwSp+ah42bVmbuaggIUslBwMbVpfucVPu4SDrGJnGVbb1DIpm0XWcZ54CYsovv2T/1OQpRXTV3H2GqhrXgoakCJoiw6y9xjFbXO1uRuVTUjocpfiYnzPFdf4CUNlSg66gf0lreQEXdTcinrvVcU64qUIKG4GrMMSe4UlEyy7gyB57LslHqi+2uFgl+bhFTyXVbNGUAiVcEdpP+yFuO3LjuzmIEvj3o9X1GDH8fI5CGXynMOWUQxckFxoBseJNE5Eu0N/n4w0DVzgt8K1+wgT2fEVMhW8COvEyjutjKzWsghGkMXungmWQWnxO1Wl5oubSFaHfFiBQbyXqGjQSY+pbCaAL74qdeJ5OuU2HjQw4Rk8bqUinTq1vLARxT4qOsMjvUVQZ1sUXjY100XhBVM1BYwwaBYM2rWVMryskuTbf/y5Hbcd5uWDJ6A8hkxCyv4hsVt9zNaffWquXZI4VFt82Zdrl5NQrkEV6+2LFjYDvLDGDFIxK2MeYBWYzuuqEgi6tuUy4jJFNYvoJYHCttFBglpaqE3OsoMG+m8IEVa27FraDdQbUmhACiB1MCxXE87PU8UfscQxcBM+dkm1wcJCjQqmEOFm3PLQ289BXusD3yOpmpjIs2zu05XpMZWKQC7lKBMZhAB9jSVECRMFolBc7AoIdprquJR4UuD3zJlB2sxoL/4x4wJevNcCF1DBvel8Bz2ZOnWPeYCZQXTMuOmxgKRPA+U/yy7Nm5LmaBwHSFKDNZ2LIV48qRSpbItlV41l3IpXBib8069C3CD8Y8UXEDR2jGpqFtNpUple9IX/sUwcDqd7fYnFe9KivYG/2+p+a3C06gtVQAdZ8A4jdM4jdM4eWOY/g/X4eAtEZBLvgAAAABJRU5ErkJggg=="}}></Image>
            <View>
                
                <TextInput  style ={styles.botonCambiarPaciente} onChangeText={setObjetivo}  placeholder={`Objetivo actual: ${paciente.objetivo}`} placeholderTextColor={"black"}></TextInput>
                
            </View>
          <TouchableOpacity onPress={handleShowAlert} style={{backgroundColor:"#52B69A",borderRadius:30, padding:15, margin:25}}><Text style={{fontSize:25,textAlign:"center", fontWeight:"bold", color:"white"}}>Guardar cambios</Text></TouchableOpacity>
          <Modal visible={showAlert} transparent animationType="none">
            <View style={{flex:1, justifyContent:"center", alignContent:"center",alignItems: 'center', backgroundColor: 'rgba(0, 0, 0)'}}>
              <Animated.View
              style={{
              backgroundColor:"#76C893",
              padding: 25,
              borderRadius: 15,
              opacity: opacity,
              } }
              >
                <Text  style={{fontSize:25, color:"white", margin:10}}>¿Deseas guardar cambios?</Text>
                <TouchableOpacity onPress={handleSave}>
                  <Text style={{fontSize:20, color:"white", backgroundColor:"#52B69A", textAlign:"center", padding:10, borderRadius:15, margin:10}}>Guardar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={fadeOut}>
                  <Text style={{fontSize:20, color:"white", backgroundColor:"#52B69A", textAlign:"center", padding:10, borderRadius:15, margin:10}}>Cancelar</Text>
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
    textoNombreApellidoPaciente:{
      color:"#99D98C", 
      fontWeight:"400",
      margin:20, 
      textAlign:"left", 
      fontSize:40,
      borderRadius:10
    },
    textoTipoRegistroComida:{ 
      color:"#99D98C", 
      fontWeight:"400",
      margin:20, 
      textAlign:"left", 
      fontSize:50, 
      borderRadius:10
    },
    botonCambiarPaciente:{
      backgroundColor:"white", 
      margin:35, 
      padding:10, 
      borderRadius:30,
      color:"black", 
      textAlign:"center",
      fontSize:20, 
      fontWeight:"600"
    }
  })