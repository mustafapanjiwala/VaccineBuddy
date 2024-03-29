import React, { useContext } from 'react';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Button } from 'react-native';
import Screen from '../components/Screen';
import DatePicker from '../components/DatePicker';
import { TextInput, RadioButton } from 'react-native-paper';
import AppButton from '../components/AppButton';
import AppHeading from '../components/AppHeading';
import { Formik } from 'formik';
import * as yup from 'yup';
import CardPara from '../components/CardPara';
import { AppContext } from "../context/AppContext"
import { useAddChild } from "../queries/Child/addChild"
import moment from 'moment';
import LoadingScreen from '../components/LoadingScreen';
import colors from '../constants/colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome5 } from '@expo/vector-icons';
// import { withTheme } from 'react-native-paper';
// import colors from '../constants/colors';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { FontAwesome5 } from '@expo/vector-icons';
// import moment from 'moment';


//TODO
// -[x] Store date in Firestore timestamp formate

const AddProfile = ({ navigation, setAddProfile, setIsUpdate }) => {
    const ctx = useContext(AppContext)
    const addChild = useAddChild();

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

    const [mothersName, setMothersName] = React.useState('');
    const [childsName, setChildsName] = React.useState('');
    const [fathersName, setFathersName] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [firstChild, setFirstChild] = React.useState('');
    const [deliveryMode, setDeliveryMode] = React.useState('');
    const [childName, setChildName] = React.useState('')
    const [dob, setDob] = React.useState(moment(date).format("DD/MM/YYYY"))

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = moment(selectedDate).format("DD/MM/YYYY") || moment(date).format("DD/MM/YYYY");
      setShow(Platform.OS === 'ios');
        setDate(selectedDate ?? date);
        setDob(currentDate);
    };
  
    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };
  
    const showDatepicker = () => {
      showMode('date');
    };

    if (addChild.isLoading) return <LoadingScreen />

    return (
        <Screen>
            <Formik
                initialValues={{
                    childsName: '',
                    gender: '',
                    deliveryMode: '',
                    firstChild: ''
                }}
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
                                onChangeText={setChildName}
                                value={childName}
                            />
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
                            <View style={{ height: 15 }}></View>
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
                        <AppButton
                            // onPress={props.handleSubmit}
                            onPress={() => {
                                addChild.mutateAsync({
                                    user: ctx.user, child: {
                                        childsName: childName,
                                        gender: gender,
                                        firstChild: firstChild,
                                        deliveryMode: deliveryMode,
                                        dob: dob.toString() ?? ""
                                    }
                                }).then((res) => {
                                    ctx.setIsUpdated(true)
                                    navigation.navigate("ProfileScreen")

                                }).catch(err => {
                                    console.error("🚀 ~ file: AddProfile.js ~ line 202 ~ onPress={ ~ err", err)
                                    alert("Failed to Add Child")
                                })
                                // navigation.navigate('UserDetails2');

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

    },
    inputs: {
        // marginTop: 10,
        height: 480,
        display: 'flex',
        justifyContent: 'space-evenly',
        marginBottom: 70
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

export default AddProfile;
