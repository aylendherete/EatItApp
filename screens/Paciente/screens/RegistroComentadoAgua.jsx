import React,{useState,useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,FlatList
} from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';

import { format } from 'date-fns';


export const RegistroComentadoAgua =(props)=>{

  const [comentarios, setComentarios] = useState([]);
  const { registro } = props.route.params;

  const obtenerComentarios = async () => {
    try {
      let response = await fetch(`http://localhost:3000/comentario/getComentariosRegistroAgua?idRegistro=${registro.id}`);
      if (response.ok) {
        let data = await response.json();
        setComentarios(data);
      }

    } catch (error) {
      console.error('Error de red:', error);
    }
  };
  useEffect(() => {
    obtenerComentarios();
  }, []);

  console.log(registro)
    return(
        <View style={styles.fondoVerde}>
            <View>
            <Text style={styles.bannerPaciente}>Paciente</Text>
            </View>
            <View style={{flex:4}}>
              <View>
                <View>
                  <View  style={{backgroundColor:"white", margin:15,borderRadius:10,padding:15, alignItems: "center", justifyContent: "center",alignItems:"stretch", borderRadius:40}}>
                    <View style={{flexDirection: "row",alignItems: "center",justifyContent: "space-between",}}>
                      <Text style={styles.textoFechaRegistro}>{format(registro.hora, 'dd/MM/yyyy HH:mm')}</Text>
                      <Image style={{width:50, height:50,margin:20}}source={{uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGXElEQVR4nO2caWxVRRTH/7XQWsSlLojRCBVQKxowLii2iMsHt6AoYGKIBquxaFyJcY3GXVCsEDSuiDEu1CgaoyFRAQMqhsYFRUXFCBpUkKCiVbHwzElOTTPvTHvvfXfmzn09v2Q+QO+bOe/Ou/975sw5AyiKoiiKoiiKoiiKoiiKoiiKoiiKoiiKoiiRGATgVQCfAbgFwA5637KjP4A1AApd2u06IdnxsDEZBQD/AjhKJ8U/JwLYLkxIAcDnAHbUSfHHTgC+sUxGgdudOiH+eKSHySiodPnjJItUrRX+71MA1R5t65VSZXpV1JYB2BvAz8Lf7sra6HLmUeGG/wlgKP/9XJWu7L2qy4zrXlSvyz27WN4RiwFUGNfuaZGuuz3Y2Wt4XLjBf3SRKpNJwvUdAI72bHev8qou7eFzrcJnvtAFoxupWiRIFQTp+kn47L1FVyqRecIiVUMifn6S8PltAI7TOYjPyQmlKqp01RRdqTiRqqjSNb3oSsXKkyVKlcmZFulqKLpSiSxVU0u8V61Cn1+qdHXPrgDWpSRVUaVrRtGVyv88lbJUmah0xeBUy75GqVJlMt+RdNETXIUyYTcAPwg36u0UpMpkL0us634kZxyADQD+AjAXQB+UoVT9DmCwo/HOscS6Rifoa2cAW4y+bkKOOd0iVc2Ox31BGHN1AukaKvTzN4BDUUZS9ZYDqULEMP1MxIPs/EjoZ0Uepetpi1d1gKfxx1kWjI0x+zkcwFahrxuRI86wSNUlnu14XrBhDWdFxuGePEsXSdX3nryqntjDsmBsQTyqOb/Y7OdDAH0ROM9kLFVRpWsM4jGKvTWzr+sRMKcFIlVRpGt1gryu6UI/tD6pR4BU85cMQaok6fpRsO1mpCNdywFUIjCusywAqcYjBMYL9rUD2CdmP8dapOtaBEQ/i99/JcLilRRe8MR9Fq/rEATCVEvubWiLpzoA/whPSW3Mfmo4aGl+5/dCka42wThK/QyRx1LYyyeOsUjXNGTMwYJRa0P5pQgcJOxa0ks5CTMt76UDkSHXCEbdhrBZKqxLKMMeCaTrK0vGfmYFqm8IBo1A2Fwt2Dw5YV8NPKFmfzRGJmw0DFkfwLqjJ+qFGzgbyWmxlFIMg2f2EwxZgPCpAPCrYTfJWClu/9fCvVjqW7oacvj+6GSZYTft3ZTCGIt0eV2LSfm1TcgHzxl2d6SwbpptkS5X29VFXCgYMAH5YJZgO+WOuSjppgi4F5pztCA0mSHYPgClM1aQLvr3SGT0hCR1H33zoGB73BCKjblC35Tu6pyzhYFpkvKantQnpb735XeHuYKPu3Ucm9E5LsBcZNj9S8r9P5SFnA8QBn0d+WB9SvEsG43CvSEpc86GlP15HwzycLNoQbjJGONdZLTp483vTsgUweaL4X7xmbYsRg7UXYWweU2wmcLyaTNPGMf5gTmDhf2FTxAuA4VMRErO8FW+52WfaIUwcNy8J1/cKth6h6OxzCdku69IeJPwJcmtDI1aAJuFGJarzJglxlg0thf6Cd5WgbMGQ49fLXA0VoUw+e/AI9OEL7suhYBdWowSkhK2OdzdPFK4H/SD8AbtL38nGPFSADuItQC+9RyFnRVCJNxW3Ekv0qyoAvCmYNOmhIkNUdhdWBRuzup4WyloR+2KDGzpa6nMdR2Vljaq6FywTKAX/ErLTfB5VHh/AAstdlCynCvG8gncXcejfw9HhgyxZJtTeznFfQcbhwFYZRl/iUPpqBOycKjNQQCMFNy+rt4XlS+nTTXX/rVbxv3Yodc33OLUbORyiCAYIYS5zYMu6UCaNCaiyXLub9eUHBdPJnmQFwH4TRiTQjQnIDDqOBO+0E1byaVhtoMvJSq5VqOlG3nsbPMdHGpWycWty7sZN+vKMSs1Ec9079xPaeVTq5s51WgigPMAXA7gAX5ZS79Is7UnOKSA9jHO5/MbqczieJbfet50msLfpbsnn2JWNyAHnGIpe3PRFiYMqUt1hHHaFv7x5IYq3i+Rzs5Ko33AUpIUKSYXtS3OuhSh1EXbZD5qoyOFX+WzvAYolfcTjN/GNYxlw0DW5nlcb2EurApCKXIb51aN58VoWgzjH8nWHt4Rq9ihoKBl2VPFj34jv3cmsHtMXtX+noKV5EofAeAsABewazuRS9lcL2wVRVEURVEURVEQAv8B/e1DFepaicEAAAAASUVORK5CYII="}}></Image>

                    </View>
                  </View>
                </View>
                  
              </View>

              <ScrollView>
                <View > 
                  
                  <View style={{ backgroundColor:"#52B69A", padding:10,textAlign:'center', margin:10, borderRadius:5}}>
                    <Text style={styles.textoRegistroPaciente}> Cantidad vasos: {registro.cantidadVasos}</Text> 
                  
                  </View>
    
                </View>
                <View>
                <FlatList
                  data={comentarios}
                  keyExtractor={(item) => item.id.toString()}
                 
                  renderItem={({ item }) => (
                    <ScrollView style={{ flex: 1 }}>
                      {item && (
                          <Text style={styles.comentarioRegistro}> {item.stringComentario}</Text>
                      )}
                      
                    </ScrollView>
                  )}
                />
                </View>
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
  bannerPaciente:{
    backgroundColor:"#76C893",
    textAlign:'center', 
    fontSize:35, 
    color:"white",
    fontFamily:"Serif-Sans", 
    fontWeight:"600", 
    padding:30
  },
  textoFechaRegistro:{
    color:"black",
    fontSize:20,
    textAlign:"left",
    fontWeight:"600"
  },
  textoTipoRegistroPaciente:{
    fontSize:35,
    textAlign:"left",
    color:"#99D98C",
    margin:10
  },
  textoRegistroPaciente:{
    backgroundColor:"#52B69A",
    color:"white",
    fontWeight:"600",
    padding:15,
    textAlign:'center',
    fontSize:20,
    margin:10,
  },
  comentarioRegistro:{
      backgroundColor:"white",
      borderColor:"#76C893",
      borderWidth:2,
      color:"black",
      fontSize:15,
      padding:15,
      margin:20,
      borderRadius:15,
      textAlign:"center",
      fontWeight:"500"
  }
  })