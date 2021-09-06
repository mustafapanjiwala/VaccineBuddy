import React, { useState, useContext } from 'react';
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
import { useAddUser } from "../queries/Users/addUser"
import { useAddChild } from "../queries/Child/addChild"
import { AppContext } from '../context/AppContext';
import LoadingScreen from '../components/LoadingScreen';
import ErrorScreen from '../components/ErrorScreen';
import moment from 'moment';

const UserDetails2 = ({ navigation }) => {
    const [birthWeight, setBirthWeight] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [firstChild, setFirstChild] = React.useState('');
    const [deliveryMode, setDeliveryMode] = React.useState('');
    const [error, setError] = useState()

    const addUser = useAddUser();
    const addChild = useAddChild();

    const ctx = useContext(AppContext)

    function setData() {
        global.userData.birthWeight = birthWeight;
        global.userData.gender = gender;
        global.userData.firstChild = firstChild;
        global.userData.deliveryMode = deliveryMode;
    }

    if (addUser.isLoading || addChild.isLoading) return <LoadingScreen />
    if (error) return <ErrorScreen />
    return (
        <Screen>
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
                            onChangeText={setBirthWeight}
                            value={birthWeight}
                            style={{ width: '60%' }}
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
                                        gender === 'male'
                                            ? 'checked'
                                            : 'unchecked'
                                    }
                                    onPress={() => setGender('male')}
                                    color="#79D1D7"
                                />
                                <CardPara>Male</CardPara>
                            </View>
                            <View style={styles.radio}>
                                <RadioButton
                                    value="female"
                                    status={
                                        gender === 'female'
                                            ? 'checked'
                                            : 'unchecked'
                                    }
                                    onPress={() => setGender('female')}
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
                                Is this your first child?
                            </CardPara>
                            <View style={styles.radio}>
                                <RadioButton
                                    value="yes"
                                    status={
                                        firstChild === 'yes'
                                            ? 'checked'
                                            : 'unchecked'
                                    }
                                    onPress={() => setFirstChild('yes')}
                                    color="#79D1D7"
                                />
                                <CardPara>Yes</CardPara>
                            </View>
                            <View style={styles.radio}>
                                <RadioButton
                                    value="no"
                                    status={
                                        firstChild === 'no'
                                            ? 'checked'
                                            : 'unchecked'
                                    }
                                    onPress={() => setFirstChild('no')}
                                    color="#79D1D7"
                                />
                                <CardPara>No</CardPara>
                            </View>
                        </View>
                        <View>
                            <CardPara
                                style={{
                                    fontSize: 14,
                                    fontFamily: 'PublicSans-Regular'
                                }}
                            >
                                Mode Of Delivery
                            </CardPara>
                            <View style={styles.radio}>
                                <RadioButton
                                    value="lscs"
                                    status={
                                        deliveryMode === 'lscs'
                                            ? 'checked'
                                            : 'unchecked'
                                    }
                                    onPress={() => setDeliveryMode('lscs')}
                                    color="#79D1D7"
                                />
                                <CardPara>LSCS Delivery</CardPara>
                            </View>
                            <View style={styles.radio}>
                                <RadioButton
                                    value="vaginal"
                                    status={
                                        deliveryMode === 'vaginal'
                                            ? 'checked'
                                            : 'unchecked'
                                    }
                                    onPress={() => setDeliveryMode('vaginal')}
                                    color="#79D1D7"
                                />
                                <CardPara>Vaginal Delivery</CardPara>
                            </View>
                        </View>
                    </View>
                </View>
                <AppButton
                    onPress={() => {
                        setData();
                        console.log("GONIG TO UPDATE USER ", global.userData, ctx)
                        addUser.mutateAsync({
                            uid: ctx.uid ?? "wYQA7c8yPCXOFX0BOdLPTu0jrA63", userData: userData
                        })
                            .then(res => {
                                console.log("ADDING CHILD ")
                                addChild.mutateAsync({
                                    user: { id: ctx.uid ?? "wYQA7c8yPCXOFX0BOdLPTu0jrA63" }, child: {
                                        childsName: userData.childsName ?? '',
                                        dob: userData.dob ?? '',
                                        birthWeight: userData.birthWeight ?? '',
                                        gender: userData.gender ?? '',
                                        firstChild: userData.firstChild ?? '',
                                        deliveryMode: userData.deliveryMode ?? ''
                                    }
                                }).then(res => {
                                    navigation.navigate('Home');
                                });
                            }).catch(err => {
                                console.error("Could not add userdetails to database UserDetils2.js")
                                setError("Could not add connect")
                            })
                    }}
                />
            </View>
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
        height: 460,
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
