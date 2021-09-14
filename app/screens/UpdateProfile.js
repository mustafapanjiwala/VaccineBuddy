import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { Formik, useField } from 'formik';
import * as yup from 'yup';
import DatePicker from '../components/DatePicker';
import { TextInput, RadioButton } from 'react-native-paper';
import AppButton from '../components/AppButton';
import AppHeading from '../components/AppHeading';
import CardPara from '../components/CardPara';

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

const UpdateProfile = () => {

    const [gender, setGender] = React.useState('male');
    const [firstChild, setFirstChild] = React.useState('');
    const [deliveryMode, setDeliveryMode] = React.useState('');


    return (

            <Formik
                initialValues={{ mothersName: 'ayushi', childsName: '', fathersName: '' , address: '', dob: '', birthWeight: '', gender: gender, firstChild: firstChild, deliveryMode: deliveryMode }}
                validationSchema={profileSchema}
                onSubmit={async values => {
                    await new Promise(resolve => setTimeout(resolve, 500));
                    console.log(values);
                  }}
            >
                {(props) => (
                    <View style={styles.container}>
                    
                        <View style={styles.details}>
                            <AppHeading>Update Profile</AppHeading>
                        </View>
                        <ScrollView showsVerticalScrollIndicator>
                        <View style={styles.inputs}>
                            <Text style={{fontSize: 9, color: 'crimson'}}>
                                {props.touched.mothersName &&
                                    props.errors.mothersName}
                            </Text>
                            <TextInput
                                label="Mother's Name"
                                mode={'outlined'}
                                outlineColor={'#E2E2E2'}
                                onChangeText={props.handleChange(
                                    'mothersName'
                                )}
                                value={props.values.mothersName}
                                onBlur={props.handleBlur('mothersName')}
                            />
                            <TextInput
                                label="Child's Name"
                                mode={'outlined'}
                                outlineColor={'#E2E2E2'}
                                onChangeText={props.handleChange(
                                    'childsName'
                                )}
                                value={props.values.childsName}
                                onBlur={props.handleBlur('childsName')}
                            />
                            <TextInput
                                label="Father's Name"
                                mode={'outlined'}
                                outlineColor={'#E2E2E2'}
                                onChangeText={props.handleChange(
                                    'fathersName'
                                )}
                                value={props.values.fathersName}
                                onBlur={props.handleBlur('fathersName')}
                            />
                            <TextInput
                                label="Address"
                                mode={'outlined'}
                                outlineColor={'#E2E2E2'}
                                onChangeText={props.handleChange(
                                    'address'
                                )}
                                value={props.values.address}
                                onBlur={props.handleBlur('address')}
                            />
                            <TextInput
                                label="Birth Weight"
                                mode={'outlined'}
                                outlineColor={'#E2E2E2'}
                                onChangeText={props.handleChange(
                                    'birthWeight'
                                )}
                                value={props.values.birthWeight}
                                onBlur={props.handleBlur('birthWeight')}
                            />
                            <View>
                            <DatePicker />
                            <Text style={styles.stepText}>D.O.B</Text>
                            </View>
                            <View>
                            <CardPara
                                style={{
                                    fontSize: 14,
                                    fontFamily: 'PublicSans-Regular'
                                }}
                            >
                                Gender
                            </CardPara>
                            <RadioButton.Group
                                onValueChange={props.handleChange('gender')}
                                value={props.values.gender}
                                >
                            <View style={styles.radio}>
                                <RadioButton
                                    value="male"
                                    color="#79D1D7"
                                />
                                <CardPara>Male</CardPara>
                            </View>
                            <View style={styles.radio}>
                                <RadioButton
                                    value="female"
                                    color="#79D1D7"
                                />
                                <CardPara>Female</CardPara>
                            </View>
                            </RadioButton.Group>
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
                            <RadioButton.Group
                                onValueChange={props.handleChange('firstChild')}
                                value={props.values.firstChild}
                                >
                            <View style={styles.radio}>
                                <RadioButton
                                    value="yes"
                                    color="#79D1D7"
                                />
                                <CardPara>Yes</CardPara>
                            </View>
                            <View style={styles.radio}>
                                <RadioButton
                                    value="no"
                                    color="#79D1D7"
                                />
                                <CardPara>No</CardPara>
                            </View>
                            </RadioButton.Group>
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
                            <RadioButton.Group
                                onValueChange={props.handleChange('deliveryMode')}
                                value={props.values.deliveryMode}
                                >
                            <View style={styles.radio}>
                                <RadioButton
                                    value="lscs"
                                    color="#79D1D7"
                                />
                                <CardPara>LSCS Delivery</CardPara>
                            </View>
                            <View style={styles.radio}>
                                <RadioButton
                                    value="vaginal"
                                    color="#79D1D7"
                                />
                                <CardPara>Vaginal Delivery</CardPara>
                            </View>
                            </RadioButton.Group>
                            </View>
                        </View>
                        </ScrollView>
                    
                    <AppButton
                        onPress={props.handleSubmit}
                        loading={props.isSubmitting}
                        disabled={props.isSubmitting}
                    />
                       
                    </View>
                )}
                </Formik>
        
    )
}

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
        height: 800,
        display: 'flex',
        justifyContent: 'space-around',
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
    details: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    radio: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});

export default UpdateProfile
