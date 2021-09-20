import React, { useState, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Button } from 'react-native';
import Screen from '../components/Screen';
import DatePicker from '../components/DatePicker';
import { TextInput } from 'react-native-paper';
import AppButton from '../components/AppButton';
import AppHeading from '../components/AppHeading';
import { Formik } from 'formik';
import * as yup from 'yup';
import colors from '../constants/colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome5 } from '@expo/vector-icons';
import moment from 'moment';
// import { withTheme } from 'react-native-paper';
// import colors from '../constants/colors';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { FontAwesome5 } from '@expo/vector-icons';
// import moment from 'moment';

const profileSchema = yup.object({
    mothersName: yup
        .string()
        .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
        .required('Mothers Name is a required field.')
        .min(4, 'Mothers Name must be at least 4 characters')
        .max(30)
    // email: yup.string().email().required(),
    // phoneNumber: yup.string().matches(phoneRegExp, 'Phone number is not valid').required(),
    // country: yup.string().required().min(4).max(30)
});
const userData = {mothersName: '', childsName: '', fathersName: '' , address: '', dob: '', birthWeight: '', gender: '', firstChild: '', deliveryMode: ''};
global.userData = userData;


const UserDetails1 = ({ navigation }) => {
    const ref = useRef(null);
    const [mothersName, setMothersName] = React.useState('');
    const [childsName, setChildsName] = React.useState('');
    const [fathersName, setFathersName] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [dob, setDob] = React.useState('');
    
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = moment(selectedDate).format("DD/MM/YYYY") || moment(date).format("DD/MM/YYYY");
      setShow(Platform.OS === 'ios');
        setDate(selectedDate ?? date);
        props.datecb(currentDate)
    };
  
    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };
  
    const showDatepicker = () => {
      showMode('date');
    };
    

    function setData() {
        global.userData.mothersName = ref.current.values.mothersName;
        global.userData.childsName = childsName;
        global.userData.fathersName = fathersName;
        global.userData.address = address;
        global.userData.dob = moment(date).format("DD/MM/YYYY");
    }

    return (
        <Screen>
            <Formik
                innerRef={ref}
                initialValues={{ mothersName: '' }}
                validationSchema={profileSchema}
            >
                {(props) => (
                    <View style={styles.container}>
                        <View>
                            <View style={styles.details}>
                                <AppHeading>Enter Details</AppHeading>
                                <Text style={styles.stepText}>Step: 1/2</Text>
                            </View>
                            <View style={styles.inputs}>
                                <Text style={{fontSize: 9, color: 'crimson'}}>
                                    {props.touched.mothersName &&
                                        props.errors.mothersName}
                                </Text>
                                <TextInput
                                    label="Mother's Name*"
                                    mode={'outlined'}
                                    outlineColor={'#E2E2E2'}
                                    onChangeText={props.handleChange(
                                        'mothersName'
                                    )}
                                    value={props.values.mothersName}
                                    mothersName={props.values.mothersName}
                                    onBlur={props.handleBlur('mothersName')}
                                />
                                <TextInput
                                    label="Child's Name"
                                    value={childsName}
                                    mode={'outlined'}
                                    outlineColor={'#E2E2E2'}
                                    // selectionColor={'#E2E2E2'}
                                    onChangeText={setChildsName}
                                />

                                <TextInput
                                    label="Father's Name"
                                    value={fathersName}
                                    mode={'outlined'}
                                    outlineColor={'#E2E2E2'}
                                    // selectionColor={'#E2E2E2'}
                                    onChangeText={setFathersName}
                                />
                                <TextInput
                                    label="Address"
                                    value={address}
                                    mode={'outlined'}
                                    outlineColor={'#E2E2E2'}
                                    // selectionColor={'#E2E2E2'}
                                    onChangeText={setAddress}
                                />
                            </View>
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
                            <Text style={styles.stepText}>Enter D.O.B*</Text>

                        </View>
                        {/* <Button title="hi"onPress={() => {
                            setData();
                            console.log(userData);
                        }} /> */}
                        <AppButton
                            // onPress={props.handleSubmit}
                            onPress={() => {
                                setData()
                                navigation.navigate('UserDetails2');
                                {
                                    props.handleSubmit;
                                }
                            }}
                        />
                    </View>
                )}
            </Formik>
        </Screen>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginTop: 50,
        padding: 20,
        // backgroundColor: 'green',
        justifyContent: 'space-between',
        paddingBottom: Platform.OS === 'ios' ? 40 : 20,
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'ios' ? 40 : 50
    },
    inputs: {
        marginTop: 20,
        height: 360,
        display: 'flex',
        justifyContent: 'space-evenly',
        marginBottom: 10
    },
    details: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    stepText: {
        marginTop: 12,
        fontFamily: 'PublicSans-Regular',
        fontSize: 13,
        color: '#676767'
    },
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
});

export default UserDetails1;
