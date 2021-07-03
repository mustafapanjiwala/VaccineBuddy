import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    KeyboardAvoidingView,
    TouchableOpacity
} from 'react-native';

import Screen from '../components/Screen';
import { TextInput } from 'react-native-paper';
import WelcomeText from '../components/WelcomeText';
import ParaText from '../components/ParaText';
import img from '../assets/MobNumber.png';

const PhoneNumberScreen = ({ navigation }) => {
    const [phoneNumber, setPhoneNumber] = React.useState('');

    return (
        <Screen>
            <KeyboardAvoidingView
                behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS == 'ios' ? 0 : 20}
                enabled={Platform.OS === 'ios'}
                style={styles.container}
            >
                <View style={styles.top}>
                    <WelcomeText style={{ marginBottom: 30 }}>
                        Welcome!
                    </WelcomeText>
                    <ParaText style={{ marginBottom: 10 }}>
                        Here, you’ll find every information about your child’s
                        due vaccination.
                    </ParaText>
                    <ParaText>Set reminder for the next vaccine!</ParaText>
                </View>
                <View style={styles.mid}>
                    <ParaText style={styles.label}>
                        Continue by registering your mobile number.
                    </ParaText>
                    <TextInput
                        label="Phone Number"
                        value={phoneNumber}
                        mode={'outlined'}
                        onChangeText={(phoneNumber) =>
                            setPhoneNumber(phoneNumber)
                        }
                        keyboardType={'numeric'}
                        style={styles.input}
                    />
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                            navigation.navigate('PhoneNumber');
                        }}
                    >
                        <View style={styles.button}>
                            <Text style={styles.btnTitle}>Continue</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.bottom}>
                    <Image source={img} style={styles.img} />
                </View>
            </KeyboardAvoidingView>
        </Screen>
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
    label: {
        fontSize: 14,
        fontFamily: 'OpenSans-Bold'
    },
    input: {
        fontSize: 14,
        marginTop: 15,
        marginBottom: 15,
        backgroundColor: '#ECECEC',
        zIndex: 2
    },
    button: {
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#79D1D7',
        borderRadius: 3,
        height: 40
    },
    btnTitle: {
        color: '#fff',
        fontSize: 12,
        textTransform: 'uppercase',
        fontFamily: 'OpenSans-Bold'
    },
    bottom: {
        flex: 3,
        flexDirection: 'row',
        width: '100%',
        alignItems: 'flex-end'
    },
    img: {
        width: '60%',
        resizeMode: 'contain',
        position: 'absolute',
        right: 0
    }
});

export default PhoneNumberScreen;
