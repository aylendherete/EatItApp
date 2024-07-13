import React, { useState, useRef, useContext } from 'react';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  StyleSheet, Text,
  View,
  TouchableOpacity,
  ScrollView,
  Modal,
  Animated,
  Easing,
  Image,
  Platform,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { format } from 'date-fns';
LocaleConfig.locales['es'] = {
  monthNames: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ],
  monthNamesShort: [
    'Ene.',
    'Feb.',
    'Mar.',
    'Abr.',
    'Mayo',
    'Jun.',
    'Jul.',
    'Ago.',
    'Sept.',
    'Oct.',
    'Nov.',
    'Dic.',
  ],
  dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
};
LocaleConfig.defaultLocale = 'es';

import UserContext from '../../../context/userContext';

export const TurnosPaciente = (props) => {
  const { user } = useContext(UserContext);
  const [selectedDate, setSelectedDate] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertTurno, setShowAlertTurno] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [selectedDateTime, setSelectedDateTime] = useState('');

  const opacity = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 350,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const onDayPress = (day) => {
    console.log(day)
    setSelectedDate(day);
    setShowDatePicker(true);
  };

  const onTurnoPress = () => {
    setShowAlertTurno(true);
    fadeIn();
  };

  const fadeOutTurno = () => {
    fadeOut();
    Animated.timing(opacity, {
      toValue: 0,
      duration: 350,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => setShowAlertTurno(false));
    setShowDatePicker(false)
  };

  const fadeOutReservarTurno = () => {
    fadeOut();
    Animated.timing(opacity, {
      toValue: 0,
      duration: 150,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => setShowAlert(false));
  };

  const fadeOut = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 350,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => setShowAlert(false));
  };

  const [showTick, setShowTick] = useState(false);

  const handleButtonClick = async () => {


    let combinedDateTime = new Date(
      selectedDate.year,
      (selectedDate.month - 1),
      selectedDate.day,
      format(selectedTime, 'HH'),
      format(selectedTime, 'mm')
    );


    console.log("fecha completa" + combinedDateTime)
    try {
      const turno = await fetch('http://localhost:3000/turno/createTurno', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({

          fecha: combinedDateTime,
          idPaciente: user.id,
          mnNutricionista: user.matriculaNacionalNutricionista

          ,


        })
      });
      if (turno.ok) {
        console.log("turno creado");
        setShowTick(true);
        setShowAlert(false);
        fadeOutTurno();
        setTimeout(() => {
          setShowTick(false);
        }, 1500);
        setShowDatePicker(false)

      }
    } catch (e) {
      console.log(e)
    }

  };

  const handleDatePickerChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'android' ? false : showPicker);
    if (selectedDate) {
      setSelectedTime(selectedDate);
      console.log("HORA", format(selectedTime, 'HH:MM'))
      setShowAlert(true);
      fadeIn();
    }
  };

  return (
    <View style={styles.fondoVerde}>
      <View style={{ flex: 4 }}>
        <View style={styles.container}>

          <View style={{alignItems: "center",justifyContent: "center",alignSelf:"center", margin:10}}>
            <View style={{flexDirection: "row",alignItems: "center",justifyContent: "space-between", backgroundColor:'#52B69A82',borderRadius:30, padding:5 }}>
              <Text style={{color:"white", fontWeight:"200", fontSize:28, margin:10}}>Reservar turnos</Text>
              <Image style={{width:35, height:35, margin:10,alignSelf:"center"}} source={{uri:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFJ0lEQVR4nO2dX6tVRRjGx8gTnhNEUQqFdRVBEZQnNTW67zb6CP6DuowOSkEXdZN350NoHYkgtPwKdVdGCmEWUSpiVMfSbvzF5FwsZ89ea2atmXfP2vv9wYGj22fed57nrD+z9ni2MQUAngY+Bf5iEvt3nwBPmEph5P2HJnODbq7XOClG3v8E7icrlo9NZTDy/ieYcphP4w9TGYy8/wn8jlNfnzVj73/uJsTI+5+7CTHy/uduQtTYP7ALOAfcZCBdE6odk79/6+mX1uOUMP4hExrIVP4GXowJxB4Z2dBAWjkbE8jg01QTDaSVzZhAsqKBtKOBJCL9A6tHSAcaSGXMXSBKOxpIZWgglaGBVIYGUhkaSGVoIJWhgVSGBlIZGsjYAlEURVGUvsz6IrdoaCCVoYFUhgZSGRpIZWgglaGBVIYGUhkaSGVoIJWhgVSGBrLogfR9hmZGoivuj3jBzAYZYV1xf8QLZjbICOuK+yNeMLNBRlhX3B/xgpkNMsK64v6IF8xskBHWFfdHvGBmg4ywrrg/4gUzG2SEdcX9ES+Y2SAjrCvuj3jBzAYZYV1xf3IXVNrRQCpDA6kMDaQy6rtoTalrRqIr7o94wcwGGWFdcX/EC2Y2yAjrivsjXjCzQUZYV9wf8YKZDTKFdMDzwNvi/ogX7GmQhA7YDrwP/JLbl+h+xQsKGJuqAx4C1oFbuf1I7le8YIRBkjrgdeBXhEhutHjBQsZ2EWj1PuCjlqnYX9J/EjgE7AYeA7a6L/v9HvfaqZRf6N+n0UF0FpxS1wjrWj6m4jfgKLCcMPYycBD4YbA/sUYvALeB94CV2CACXtqjZ82NFUQDicN+es6rfYMIBLMPuBIqpIF0cx7YGWHyS8AX9rdTA6sR//5JN7bPa13CReZKTBjOp4sN3cVIjQ3lqlfzcutpMfcMYxoN1TXCOrfm2Jegv9PQ3knQHQhcU06kNDqIhEbFdMAOX2cv4LE1h/TrtMcCn5TwSFShoZSeID10wLuBW9uku6m+/TrtEnDJG+KdqEJDKT1BEnXAFuAnT3Y0tt7Qfhv6w94QtqctnYWGUnqCJOqAFzzJJvBgbL2h/Tb0K652k2c7Cw2l9ARJ1LmFWpOTsbVy9OuNYT/CtcmbnYWGUnqCJOrcs6Ymh2Jr5ejXG+OIN8xGZ6GhlJ4giTrgO0+yO7ZWjn69MfZ6w3zdWWgopSdIog645kkeDazAL+T2wY25GngDrMnlzgkOpZSxfXWBRdmS97p9HFKKM16tB7zXb4YaXjSWvPnbZ1OzCuS2BsLEKWu10Cnre//DJAOnrOsaCOzpOs1NOfXdQ88xXvaG+VYDoarb3tMaCJyaYSAb3jBrGgj/b0hYlg7EPq4JfKrq5JqIxeRgBQ8Xf7Y7XzSQu9jdIVulAnG3uz96Q3wYVWiBWBMM5Hjg3crHNZB7sSv4/QJv4b4C/OvVXm8TLDJX7UaESGObi8cLkZqnAs/S7J8f1kCmcz4mFLeiP+O+dkXuOPGfNFve6BJG70ud8yPlgMmEO035R0b7qaoh/mwGBtR6TTnmP3zssZnheOCaYfkcuD9mkGeA32dgQK1ccmuGlcRF3+HArW0zjG0pye50y/o/hSdfM5vuPfAj7p2+7e4IWHLf73W75DcCK/Am61FHhnIXu9fWbe/MzbXOC7jSukXnhNtROJRb7qiYfmurxGG3d9odhYGNdTHYZ1MfTF2BK2YQwHPAW+4a8ZULyR5B9g7qBvCNfT/D7fuy/+Vt8kFhBP8BEFGjxDEZHw8AAAAASUVORK5CYII="}}></Image>
            </View>
          </View>
            
          <Calendar
            onDayPress={onDayPress}
            markedDates={{
              [selectedDate]: { selected: true, selectedColor: '#52B69A' },
            }}
            hideExtraDays={true}
          />
        </View>
      </View>
      {showDatePicker && (
        <DateTimePicker
          value={selectedTime}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={handleDatePickerChange}
        />
      )}
      <Modal visible={showAlert} transparent animationType="slide">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Animated.View
            style={{
              backgroundColor: '#76C893',
              padding: 30,
              margin: 10,
              borderRadius: 15,
              opacity: opacity,
              width: '90%',
              height: '100%',
              flex: 0.35,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View style={{ alignItems: 'center' }}>

              <Image style={{width:55, height:55,}} source={{uri:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAACoElEQVR4nO2dwWobMRCG9Rztuee8SUEDeTYj0QdoDsGBsEPoA9UtodAG99wihwTcza7lrnc10n4f6BKjMDOffi22D3ZuBuR+80G6cCsankTjn+MVnryGm+v7zXtnFKm8/l4zvgs/+o301qPFpqTy+ns8n6yTzRyW1/DZGUMqr7/H2zEfaKiLP50xpPL6e/xb9Lmvl6b2+ptrSCqvv7mGpPL6m2tILNbvHzZXouFONHzLfcANrVMNWV/uwvV7jbs02zTjbBm+C3urDUnlQl7FdGGfJeU5GfYbksqFHKRo3OYImXxNISTmzaeL3zOEjA906v6p/39u5q7/7P0IiQixhCDEFtKaEN/FXzV/OOdnrn95IRpuav742s9c/+JC0pc26cubjIYeP3759M4Z43rm+hcXkkiFptPzVvzT39JrFmUsUX8RITAMQoyBEGMgxBgIMQZCWhPCirPOACFq65AhRMtLQIg2JOQiTzJ4BSHGQIgxEGIMhBgDIcZAiDEQsnYhpd9oibU3dgiJCCEh+XBlKVfWf92xre8zkxD2HYOQAUjIypP1AgkZACGNnHQhIeMgpJEBCQmxNSBBiK0ByVqFtL4cQmJxCQjR8oNHiJYfdpNClt4nMw8WISdAyJkDWnqfkBCEnAPPEOUZwpU1AglREkJCRiAhSkJIiOWEtL7cxPkgRBFS/BQLCSk/KEHItGdQ6/vMPEPYdwxCBiAhK0/WCyRkAIQ0ctKFhIyDkEYGJCTE1oAEIbYGJGsV0vpyCInFJSBEyw8eIVp+2E0IgXEQYgyEGAMhxkCIMRBiDIQYAyH1C7nsD9yz4vAMuvg1R8gdQ4yLHCSvcXtSiH/YXPku7JES5xbyO8066547SNG49Rp3iImXTsXuMNtcGQAAAC6Pv4lhWRIcsg0fAAAAAElFTkSuQmCC"}}></Image>
 

              <Text style={{color:"white", fontWeight:"300", fontSize:28}}>Turno a reservar</Text>
                  
              <Text style={{ fontSize: 24, color: 'white', margin: 5, textAlign: 'center', fontWeight: '500', margin: 10 }}>
                {selectedDate.dateString} a las {format(selectedTime, 'HH:mm')}
              </Text>
              <TouchableOpacity onPress={onTurnoPress}>
                <Text style={styles.registroDiario}>Confirmar reserva</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={fadeOut}>
                <Text style={{ fontSize: 20, color: 'white', backgroundColor: '#52B69A', textAlign: 'center', padding: 10, borderRadius: 15, margin: 15 }}>Cerrar</Text>
              </TouchableOpacity>

            </View>
          </Animated.View>
          <Modal visible={showAlertTurno} transparent animationType="slide">
            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
              <Animated.View
                style={{
                  backgroundColor: '#76C893',
                  padding: 30,
                  margin: 10,
                  borderRadius: 15,
                  opacity: opacity,
                  flex: 0.3,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <View style={{ alignItems: 'center' }}>

                  <Text style={{ fontSize: 24, color: 'white', margin: 5, textAlign: 'center', fontWeight: '500', margin: 10 }}>
                    ¿Deseas reservar ese turno para una cita con tu nutricionista?
                  </Text>
                </View>
                <TouchableOpacity onPress={handleButtonClick}>
                  <Text style={{ fontSize: 20, color: 'white', backgroundColor: '#52B69A', textAlign: 'center', padding: 10, borderRadius: 15, margin: 15 }}>Reservar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={fadeOutTurno}>
                  <Text style={{ fontSize: 20, color: 'white', backgroundColor: '#52B69A', textAlign: 'center', padding: 10, borderRadius: 15, margin: 15 }}>Cancelar</Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </Modal>
        </View>
      </Modal>
      <Modal visible={showTick} transparent >
        <View style={{ backgroundColor: "#01981F", }} >
          <Animatable.View animation="zoomIn" duration={1000} >
            <View style={{ bwidth: "100%", height: "100%", justifyContent: "center" }}>
              <Image style={{ flex: 0.5, justifyContent: "center", alignItems: "center" }} source={{ uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAYAAAB5fY51AAAACXBIWXMAAAsTAAALEwEAmpwYAAAYqklEQVR4nO3debSfRX3H8YclkLAKtAVCWArUhUDYPUgRqW0BMSwJIEc9YBWILCKgEBCxFcti2QRk30UplYIsYQ+oLGErWLQFjBD2HcJOCFvePdPOPb2Em+Qu33m+88x8XufkDyO59zfrb555vvOdphEREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREWkZsACwEvBZYBywO3AIcBxwPjAJmAzcDNwT/zwITIt/Huz19zfH/3ZS/LfHAt+LP3Nc/B0rAvOroUVkjoBVgG3iBHIWcCPwMPAu7XsHeChObmfFz7R1+IxqQpGKhNULsCYwATgVuBV4le4In/UW4JS4Mgtl0YpMpATAIsBmwKHANcArlCeU6Wrg+8DnQpm9611E+glYNa6gwl7RTOrzHnAbcBCwPjCfOo9IJoCFgC8CpwOPec8WGXoUOA3YChjm3V4itb692wQ4EXjBe0bo2OPjBXETX5OXSErAxsAZwIveI78AL8aV10bqtSJGgCXjntR93iO8YA/GPa8/U8cVGYT4yPdz4G3v0VyRGfGRcWN1WpH+xUmF/ZXbvUeucC+wC7CgOq5IL8Bi8bFvqiaK7DwSHxeXVKeVqgGLAz8AXvYelTJP0+M5ysW8+42IRwT6vsBzmig656W44lJEvZQNWFgTVTGeAfYJgbve/UrEXNxMDxkQpCwhs8SOGjJSBOBTwLXeo0qSuwkY493fRAYFWCZGUr+vyaKqg9cnA0tr2EhnAF+p8Izf6/Ft5/ReGUenx78L/19NwsuUnbz7ochcxXTCITdTCWYBTwNTgAuBI4A9YjrjTYHRwHIDOUQc/tv4b0bHnzEu/swj4u+YEjezS3ElMErDRnKMUP9Wh1cSzwI3AMfE6O51geGO9TkcWA/4Wsz9fkP8jF30GrCXMqNKFuKKoUub6mFP7f6Y9SFMTqObjgBGxretP45J+kL+9y5tymu1JX6AHeI+Te6mxTzoW5cUqR1PCmwT89OHRH1dCDod711vUpk4UM4lXx/Eyxr2Az7RVAL4JLB/XH2FOshVuA1oUe/6kgoA68RgwRw3yafEIz8rNJULj19x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Uu5zERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERFp3f8A7xgEoERKflEAAAAASUVORK5CYII=" }}></Image>
            </View>
          </Animatable.View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  fondoVerde: {
    backgroundColor: '#D9ED92',
    flex: 1
  },
  registroDiario: {
    fontSize: 20,
    color: 'white',
    backgroundColor: '#52B69A',
    textAlign: 'center',
    padding: 10,
    borderRadius: 15,
    margin: 10,
  },
});