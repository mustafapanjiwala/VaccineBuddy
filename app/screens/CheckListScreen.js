import React, {useState} from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Button } from 'react-native';
import AppHeading from '../components/AppHeading';
import Screen from '../components/Screen';
import DatePicker from '../components/DatePicker';
import CheckBox from '../components/CheckBox';
import AppButton from '../components/AppButton';
import CardPara from '../components/CardPara';
import SelectVaccine from './SelectVaccine';
import { RadioButton } from 'react-native-paper';
import ToggleButton from '../components/ToggleButton';
import colors from '../constants/colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome5 } from '@expo/vector-icons';
import moment from 'moment';


const CheckListScreen = ({ navigation }) => {

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = moment(selectedDate).format("DD/MM/YYYY") ?? moment(date).format("DD/MM/YYYY");
      setShow(Platform.OS === 'ios');
        setDate(selectedDate ?? moment(date).format("DD/MM/YYYY"));
        setGivenOnDate(currentDate);
    };
  
    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };
  
    const showDatepicker = () => {
      showMode('date');
    };


    const [checked, setChecked] = React.useState('');
    const [givenOnDate, setGivenOnDate] = React.useState(moment(date).format("DD/MM/YYYY"))

    return (
        <Screen>
            <View style={styles.container}>
                <View style={styles.selectFlex}>
                    <AppHeading>Select Your Vaccination</AppHeading>
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
                </View>
                <View style={styles.cont}>
                    <View style={styles.checkboxContain}>
                            <View style={styles.radio}>
                                <RadioButton
                                    value="Birth"
                                status={checked === 0 ? 'checked' : 'unchecked'}
                                    color="#79D1D7"
                                onPress={() => setChecked(0)}
                                />
                                <CardPara>Birth</CardPara>
                            </View>
                            <View style={styles.radio}>
                                <RadioButton
                                    value="6 weeks"
                                status={checked === 6 ? 'checked' : 'unchecked'}
                                    color="#79D1D7"
                                onPress={() => setChecked(6)}
                                />
                                <CardPara>6 weeks</CardPara>
                            </View>
                            <View style={styles.radio}>
                                <RadioButton
                                    value="10 weeks"
                                status={checked === 10 ? 'checked' : 'unchecked'}
                                    color="#79D1D7"
                                onPress={() => setChecked(10)}
                                />
                                <CardPara>10 weeks</CardPara>
                            </View>
                            <View style={styles.radio}>
                                <RadioButton
                                    value="14 weeks"
                                status={checked === 14 ? 'checked' : 'unchecked'}
                                    color="#79D1D7"
                                onPress={() => setChecked(14)}
                                />
                                <CardPara>14 weeks</CardPara>
                            </View>
                            <View style={styles.radio}>
                                <RadioButton
                                    value="6 months"
                                status={checked === 24 ? 'checked' : 'unchecked'}
                                    color="#79D1D7"
                                onPress={() => setChecked(24)}
                                />
                                <CardPara>6 months</CardPara>
                            </View>
                            <View style={styles.radio}>
                                <RadioButton
                                value="9 months"
                                status={checked === 36 ? 'checked' : 'unchecked'}
                                    color="#79D1D7"
                                onPress={() => setChecked(36)}
                                />
                            <CardPara>9 months</CardPara>
                            </View>
                            <View style={styles.radio}>
                                <RadioButton
                                value="10 months"
                                status={checked === 40 ? 'checked' : 'unchecked'}
                                    color="#79D1D7"
                                onPress={() => setChecked(40)}
                                />
                            <CardPara>9-12 months</CardPara>
                            </View>
                    </View>
                    <View style={styles.checkboxContain}>
                            <View style={styles.radio}>
                                <RadioButton
                                    value="12 months"
                                status={checked === 48 ? 'checked' : 'unchecked'}
                                    color="#79D1D7"
                                onPress={() => setChecked(48)}
                                />
                                <CardPara>12 months</CardPara>
                            </View>
                            <View style={styles.radio}>
                                <RadioButton
                                    value="15 months"
                                status={checked === 60 ? 'checked' : 'unchecked'}
                                    color="#79D1D7"
                                onPress={() => setChecked(60)}
                                />
                                <CardPara>15 months</CardPara>
                            </View>
                            <View style={styles.radio}>
                                <RadioButton
                                    value="16-18 months"
                                status={checked === 64 ? 'checked' : 'unchecked'}
                                color="#79D1D7"
                                onPress={() => setChecked(64)}
                            />
                            <CardPara>16-18 months</CardPara>
                        </View>
                        <View style={styles.radio}>
                            <RadioButton
                                value="18 months"
                                status={checked === 72 ? 'checked' : 'unchecked'}
                                color="#79D1D7"
                                onPress={() => setChecked(72)}
                            />
                            <CardPara>18 months</CardPara>
                        </View>
                        <View style={styles.radio}>
                            <RadioButton
                                    value="2 years"
                                status={checked === 96 ? 'checked' : 'unchecked'}
                                    color="#79D1D7"
                                onPress={() => setChecked(96)}
                                />
                                <CardPara>2 years</CardPara>
                            </View>
                            <View style={styles.radio}>
                            <RadioButton
                                    color="#79D1D7"
                                onPress={() => setChecked(192)}
                                />
                            <CardPara>4-6 years</CardPara>
                            </View>
                        <View style={styles.radio}>
                                <RadioButton
                                    value="10 years"
                                status={checked === 480 ? 'checked' : 'unchecked'}
                                    color="#79D1D7"
                                onPress={() => setChecked(480)}
                                />
                            <CardPara>10-12 years</CardPara>
                            </View>
                    </View>
                </View>
                <AppButton
                    onPress={() => {
                        navigation.navigate('SelectVaccine', { age: checked, givenOnDate: givenOnDate });
                    }}
                />
            </View>
        </Screen>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        justifyContent: 'space-between'
    },
    selectFlex: {
        display: 'flex',
        // flexDirection: 'row',
        // width: 800,
        height: 10,
        justifyContent: 'space-between',
        marginBottom: 28
    },
    cont: {
        display: 'flex',
        flexDirection: 'row',
        height: '60%',
        // justifyContent:'space-between'
        paddingRight: 60,
        justifyContent: 'space-between'
    },
    checkboxContain: {
        height: '100%',
        justifyContent: 'space-between'
    },
    radio: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    datePicker:{
        width:'55%',
        borderRadius: 5,
        backgroundColor: '#f4f4f4',
        display:'flex',
        flexDirection: 'row',
        justifyContent:'space-between',
        paddingHorizontal:12,
        paddingVertical:12,
    },
    selectedDate:{
        fontFamily: 'PublicSans-Light',
        color: colors.textGrey
    }
});

export default CheckListScreen;
