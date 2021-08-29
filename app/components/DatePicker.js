import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Button } from 'react-native';
import colors from '../constants/colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome5 } from '@expo/vector-icons';
import moment from 'moment';

const DatePicker = (props) => {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    global.userData.dob = moment(date).format("DD/MM/YYYY");

    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
        props.datecb(currentDate)
    };
  
    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };
  
    const showDatepicker = () => {
      showMode('date');
    };
  
    return(
        <View>
            <View>

                <TouchableOpacity
                activeOpacity={0.8}
                onPress={showDatepicker}
                style={styles.datePicker}
                >
                    <Text style={styles.selectedDate}>{moment(date).format("DD/MM/YYYY")}</Text>
                    <FontAwesome5 name="calendar-alt" size={24} color="#515151" />
                </TouchableOpacity>
            </View>
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={date}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    />
                )}
            </View>
    )
}

const styles = StyleSheet.create({
    datePicker:{
        width:'55%',
        borderRadius: 5,
        backgroundColor: '#f4f4f4',
        display:'flex',
        flexDirection: 'row',
        justifyContent:'space-between',
        paddingHorizontal:14,
        paddingVertical:12,
    },
    selectedDate:{
        fontFamily: 'PublicSans-Light',
        color: colors.textGrey
    }
})

export default DatePicker;