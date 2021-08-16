import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Button } from 'react-native';
import Screen from '../components/Screen';
import DatePicker from '../components/DatePicker';
import { TextInput, RadioButton } from 'react-native-paper';
import AppButton from '../components/AppButton';
import AppHeading from '../components/AppHeading';
import { Formik } from 'formik';
import * as yup from 'yup';
import CardPara from '../components/CardPara';

// import { withTheme } from 'react-native-paper';
// import colors from '../constants/colors';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { FontAwesome5 } from '@expo/vector-icons';
// import moment from 'moment';

const profileSchema = yup.object({
    childsName: yup
        .string()
        .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
        .required('Mothers Name is a required field.')
        .min(4, 'Mothers Name must be at least 4 characters')
        .max(30)
    // email: yup.string().email().required(),
    // phoneNumber: yup.string().matches(phoneRegExp, 'Phone number is not valid').required(),
    // country: yup.string().required().min(4).max(30)
});

const UserDetails1 = ({ navigation }) => {
    const [mothersName, setMothersName] = React.useState('');
    const [childsName, setChildsName] = React.useState('');
    const [fathersName, setFathersName] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [firstChild, setFirstChild] = React.useState('');
    const [deliveryMode, setDeliveryMode] = React.useState('');

    return (
        <Screen>
            <Formik
                initialValues={{ childsName: '', gender: '', deliveryMode: '', firstChild: '' }}
                validationSchema={profileSchema}
            >
                {(props) => (
                    <View style={styles.container}>
                            <View style={styles.details}>
                                <AppHeading>Add Profile</AppHeading>
                            </View>
                            <View style={styles.inputs}>
                                <Text>
                                    {props.touched.mothersName &&
                                        props.errors.mothersName}
                                </Text>
                                <TextInput
                                    label="Child's Name*"
                                    mode={'outlined'}
                                    outlineColor={'#E2E2E2'}
                                    onChangeText={props.handleChange(
                                        'childsName'
                                    )}
                                    value={props.values.childsName}
                                    onBlur={props.handleBlur('childsName')}
                                />
                                <CardPara style={{fontSize: 14, fontFamily: 'PublicSans-Regular'}}>Gender</CardPara>
                                <View style={styles.radio}>
                                    <RadioButton
                                        value="male"
                                        status={ gender === 'male' ? 'checked' : 'unchecked' }
                                        onPress={() => setGender('male')}
                                        color="#79D1D7"
                                    />
                                    <CardPara>Male</CardPara>
                                </View>
                                <View style={styles.radio}>
                                    <RadioButton
                                        value="female"
                                        status={ gender === 'female' ? 'checked' : 'unchecked' }
                                        onPress={() => setGender('female')}
                                        color="#79D1D7"
                                    />
                                    <CardPara>Female</CardPara>
                                </View>
                            
                                <CardPara style={{fontSize: 14, fontFamily: 'PublicSans-Regular'}}>Is this your first child?</CardPara>
                                <View style={styles.radio}>
                                    <RadioButton
                                        value="yes"
                                        status={ firstChild === 'yes' ? 'checked' : 'unchecked' }
                                        onPress={() => setFirstChild('yes')}
                                        color="#79D1D7"
                                    />
                                    <CardPara>Yes</CardPara>
                                </View>
                                <View style={styles.radio}>
                                    <RadioButton
                                        value="no"
                                        status={ firstChild === 'no' ? 'checked' : 'unchecked' }
                                        onPress={() => setFirstChild('no')}
                                        color="#79D1D7"
                                    />
                                    <CardPara>No</CardPara>
                                </View>

                                <CardPara style={{fontSize: 14, fontFamily: 'PublicSans-Regular'}}>Mode Of Delivery</CardPara>
                                <View style={styles.radio}>
                                    <RadioButton
                                        value="lscs"
                                        status={ deliveryMode === 'lscs' ? 'checked' : 'unchecked' }
                                        onPress={() => setDeliveryMode('lscs')}
                                        color="#79D1D7"
                                    />
                                    <CardPara>LSCS Delivery</CardPara>
                                </View>
                                <View style={styles.radio}>
                                    <RadioButton
                                        value="vaginal"
                                        status={ gender === 'vaginal' ? 'checked' : 'unchecked' }
                                        onPress={() => setDeliveryMode('vaginal')}
                                        color="#79D1D7"
                                    />
                                    <CardPara>Vaginal Delivery</CardPara>
                                </View>
                                <View style={{height: 15}}></View>
                            <DatePicker />
                        </View>
                        <AppButton
                            // onPress={props.handleSubmit}
                            onPress={() => {
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
        // marginTop: 10,
        height: 460,
        display: 'flex',
        justifyContent: 'space-evenly',
        marginBottom: 70,
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
    radio:{
        flexDirection: 'row',
        alignItems: 'center'
    }
});

export default UserDetails1;
