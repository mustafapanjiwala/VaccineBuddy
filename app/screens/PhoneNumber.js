import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    KeyboardAvoidingView,
    TextInput,
    Button
} from 'react-native';

import img from '../assets/MobNumber.png';

const PhoneNumber = () => {
    const [phoneNumber, setPhoneNumber] = React.useState();

    return (
        <KeyboardAvoidingView
            // behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            // keyboardVerticalOffset={Platform.OS == 'ios' ? 0 : 20}
            // enabled={Platform.OS === 'ios'}
            style={styles.container}
        >
            <View style={styles.top}>
                <Text>Welcome!</Text>
                <Text>
                    Here, you’ll find every information about your child’s due
                    vaccination.
                </Text>
                <Text>Set reminder for the next vaccine!</Text>
            </View>
            <View style={styles.mid}>
                <Text>Continue by registering your mobile number.</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setPhoneNumber}
                    value={phoneNumber}
                    placeholder="Eg. 9876543210"
                    keyboardType="phone-pad"
                    returnKeyType={'done'}
                    placeholderTextColor={'#A1A1A1'}
                    onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
                />
                <View style={styles.button}>
                    <Text style={styles.btnTitle}>Continue</Text>
                </View>
            </View>
            <View style={styles.bottom}>
                <Image source={img} style={styles.img} />
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-evenly'
    },
    top: {
        flex: 3,
        justifyContent: 'center'
    },
    mid: {
        flex: 3,
        justifyContent: 'center'
    },
    input: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#B9B9B9',
        fontSize: 14,
        marginTop: 15,
        marginBottom: 15,
        padding: 10,
        color: '#fff',
        backgroundColor: '#ECECEC'
    },
    button: {
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#79D1D7',
        borderRadius: 7,
        flexDirection: 'row',
        height: 40
    },
    btnTitle: {
        color: '#fff',
        fontSize: 12,
        textTransform: 'uppercase'
    },
    bottom: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%'
    },
    img: {
        width: '100%',
        resizeMode: 'contain'
    }
});

export default PhoneNumber;
