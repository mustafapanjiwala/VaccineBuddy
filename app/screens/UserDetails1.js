import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Button } from 'react-native';
import Screen from '../components/Screen';
import DatePicker from '../components/DatePicker';
import { TextInput } from 'react-native-paper';
import AppButton from '../components/AppButton';
import AppHeading from '../components/AppHeading';
// import { withTheme } from 'react-native-paper';
// import colors from '../constants/colors';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { FontAwesome5 } from '@expo/vector-icons';
// import moment from 'moment';

const UserDetails1 = () => {
    const [mothersName, setMothersName] = React.useState('');
    const [childsName, setChildsName] = React.useState('');
    const [fathersName, setFathersName] = React.useState('');

    return (
        <Screen>
            <View style={styles.container}>
                <View style={styles.details}>
                    <AppHeading>Enter Details</AppHeading>
                    <Text style={styles.stepText}>Step: 1/2</Text>
                </View>
                <View style={styles.inputs}>
                    <TextInput
                        label="Mother's Name"
                        value={mothersName}
                        mode={'outlined'}
                        outlineColor={'#E2E2E2'}
                        // selectionColor={'#E2E2E2'}
                        onChangeText={setMothersName}
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
                </View>
                <DatePicker />

                <AppButton />
            </View>
        </Screen>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 100,
        padding: 20
    },
    inputs: {
        height: 250,
        display: 'flex',
        justifyContent: 'space-evenly'
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
    }
});

export default UserDetails1;
