import React, { useState, useEffect } from 'react';
import { View, KeyboardAvoidingView, StyleSheet, Text } from 'react-native';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell
} from 'react-native-confirmation-code-field';
import * as firebase from "firebase";

import AppButton from '../components/AppButton';
import AppHeading from '../components/AppHeading';
import Screen from '../components/Screen';
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from "expo-firebase-recaptcha";
import CardPara from '../components/CardPara';
import colors from '../constants/colors';


// try {
//     firebase.initializeApp({
//     apiKey: "AIzaSyCpme7Etn65aolZB-gCkP03YEuYEzxil9M",
//     authDomain: "muniversiti-connect-1.firebaseapp.com",
//     projectId: "muniversiti-connect-1",
//     storageBucket: "muniversiti-connect-1.appspot.com",
//     messagingSenderId: "668245427283",
//     appId: "1:668245427283:web:cb1947ebb29e5ae321f2a6",
//     measurementId: "G-P2L2B1H3HB"
//     });
// } catch (err) {
//     // ignore app already initialized error in snack
// }

const CELL_COUNT = 6;


const OTPVerification = ({ route, navigation }) => {
    const phoneNumber = "+919039004566";
    const recaptchaVerifier = React.useRef(null);
    const firebaseConfig = firebase.apps.length ? firebase.app().options : undefined;
    const [message, showMessage] = React.useState((!firebaseConfig || Platform.OS === 'web')
        ? { text: "To get started, provide a valid firebase config in App.js and open this snack on an iOS or Android device." }
        : undefined);
    const [verificationId, setVerificationId] = React.useState();
    const [verificationCode, setVerificationCode] = React.useState();
    // const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ verificationCode, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        verificationCode,
        setVerificationCode
    });
    

    useEffect(() => {
        async function callOTP() {
            
            const phoneProvider = new firebase.auth.PhoneAuthProvider();
            const verificationId = await phoneProvider.verifyPhoneNumber(
                phoneNumber,
                recaptchaVerifier.current
            );
            console.log('calling otp...')
            setVerificationId(verificationId);
        }
        callOTP()
    }, [])

    return (
        <Screen>
            <KeyboardAvoidingView style={styles.container}>
                <View>
                    <FirebaseRecaptchaVerifierModal
                        ref={recaptchaVerifier}
                        firebaseConfig={firebaseConfig}
                    />
                    <AppHeading style={styles.heading}>Verification</AppHeading>
                    <CardPara>Enter the OTP sent to {phoneNumber}</CardPara>
                    <CodeField
                        ref={ref}
                        {...props}
                        value={verificationCode}
                        onChangeText={setVerificationCode}
                        cellCount={CELL_COUNT}
                        rootStyle={styles.codeFiledRoot}
                        keyboardType="number-pad"
                        textContentType="oneTimeCode"
                        renderCell={({ index, symbol, isFocused }) => (
                            <View
                                onLayout={getCellOnLayoutHandler(index)}
                                key={index}
                                style={[
                                    styles.cellRoot,
                                    isFocused && styles.focusCell
                                ]}
                            >
                                <Text style={styles.cellText}>
                                    {symbol || (isFocused ? <Cursor /> : null)}
                                </Text>
                            </View>
                        )}
                    />
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 30
                        }}
                    >
                    </View>
                </View>

                <AppButton
                    title="Confirm OTP"
                    bgColor={colors.primary}
                    onPress={async () => {
                        try {
                            const credential = firebase.auth.PhoneAuthProvider.credential(
                                verificationId,
                                verificationCode
                            );
                            await firebase.auth().signInWithCredential(credential);
                            // navigation.navigate('CompleteProfile', phoneNumber)
                            console.log(credential);
                        } catch (err) {
                            console.log(err)
                        }
                    }
                    }
                />
            </KeyboardAvoidingView>
        </Screen>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'space-between',
        padding: 20
    },
    heading: {
        marginBottom: 25
    },
    input: {
        borderBottomWidth: 1,
        borderColor: '#B9B9B9',
        fontSize: 14,
        marginTop: 15,
        marginBottom: 35,
        paddingBottom: 10
    },
    codeFiledRoot: {
        marginTop: 20,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    cellRoot: {
        flex: 1,
        height: 60,
        marginHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: colors.black,
        borderBottomWidth: 1
    },
    cellText: {
        color: colors.black,
        fontSize: 24,
        textAlign: 'center'
    },
    focusCell: {
        borderBottomColor: colors.primary,
        borderBottomWidth: 2
    }
});

export default OTPVerification;
