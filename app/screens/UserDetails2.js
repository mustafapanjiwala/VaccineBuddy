import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Button } from 'react-native';
import Screen from '../components/Screen';
// import DatePicker from '../components/DatePicker';
import { TextInput, RadioButton } from 'react-native-paper';
import AppButton from '../components/AppButton';
import AppHeading from '../components/AppHeading';
import { Formik } from 'formik';
import CardPara from '../components/CardPara';
// import * as yup from 'yup';
// import { withTheme } from 'react-native-paper';
// import colors from '../constants/colors';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { FontAwesome5 } from '@expo/vector-icons';
// import moment from 'moment';

const UserDetails2 = ({ navigation }) => {
    const [checked, setChecked] = React.useState('yes');

    return (
        <Screen>
            <Formik initialValues={{ birthWeight: '' }}>
                {(props) => (
                    <View style={styles.container}>
                        <View>
                            <View style={styles.details}>
                                <AppHeading>Enter Details</AppHeading>
                                <Text style={styles.stepText}>Step: 2/2</Text>
                            </View>
                            <View style={styles.inputs}>
                                <TextInput
                                    label="Birth Weight"
                                    mode={'outlined'}
                                    outlineColor={'#E2E2E2'}
                                    onChangeText={props.handleChange(
                                        'birthWeight'
                                    )}
                                    value={props.values.birthWeight}
                                    onBlur={props.handleBlur('birthWeight')}
                                    style={{ width: '70%' }}
                                />

                                <View>
                                    <CardPara
                                        style={{
                                            fontSize: 14,
                                            fontFamily: 'PublicSans-Regular'
                                        }}
                                    >
                                        Gender
                                    </CardPara>
                                    <View style={styles.radio}>
                                        <RadioButton
                                            value="male"
                                            status={
                                                checked === 'male'
                                                    ? 'checked'
                                                    : 'unchecked'
                                            }
                                            onPress={() => setChecked('male')}
                                            color="#79D1D7"
                                        />
                                        <CardPara>Male</CardPara>
                                    </View>
                                    <View style={styles.radio}>
                                        <RadioButton
                                            value="female"
                                            status={
                                                checked === 'female'
                                                    ? 'checked'
                                                    : 'unchecked'
                                            }
                                            onPress={() => setChecked('female')}
                                            color="#79D1D7"
                                        />
                                        <CardPara>Female</CardPara>
                                    </View>
                                </View>
                                <View>
                                    <CardPara
                                        style={{
                                            fontSize: 14,
                                            fontFamily: 'PublicSans-Regular'
                                        }}
                                    >
                                        first child?
                                    </CardPara>
                                    <View style={styles.radio}>
                                        <RadioButton
                                            value="yes"
                                            status={
                                                checked === 'yes'
                                                    ? 'checked'
                                                    : 'unchecked'
                                            }
                                            onPress={() => setChecked('yes')}
                                            color="#79D1D7"
                                        />
                                        <CardPara>Yes</CardPara>
                                    </View>
                                    <View style={styles.radio}>
                                        <RadioButton
                                            value="no"
                                            status={
                                                checked === 'no'
                                                    ? 'checked'
                                                    : 'unchecked'
                                            }
                                            onPress={() => setChecked('no')}
                                            color="#79D1D7"
                                        />
                                        <CardPara>No</CardPara>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <AppButton
                            onPress={() => {
                                navigation.navigate('Home');
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
    radio: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});

export default UserDetails2;
