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
import CardHeading from '../components/CardHeading';
import {
    Button,
    Paragraph,
    Dialog,
    Portal,
    TextInput
} from 'react-native-paper';

import ParaText from '../components/ParaText';
import img from '../assets/calendar.png';

const Test = () => {
    const [visible, setVisible] = React.useState(false);

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

    return (
        <View>
            <TouchableOpacity activeOpacity={0.8} onPress={showDialog}>
                <View style={styles.button}>
                    <Text style={styles.btnTitle}>set reminder</Text>
                </View>
            </TouchableOpacity>
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Reminder Set!</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>
                            You’re an awesome parent, we’ll remind you for the
                            vaccine.
                        </Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog}>Done</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
};

const SetReminderScreen = () => {
    return (
        <Screen>
            <KeyboardAvoidingView
                behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS == 'ios' ? 0 : 20}
                enabled={Platform.OS === 'ios'}
                style={styles.container}
            >
                <View style={styles.mid}>
                    <CardHeading style={{ position: 'relative', bottom: 50 }}>
                        Set Reminder For Your Next Vaccine
                    </CardHeading>

                    <ParaText style={{ marginBottom: 30, fontSize: 22 }}>
                        Your child’s next vaccine will be on:
                    </ParaText>
                    <TextInput
                        label="Phone Number"
                        value={5}
                        mode={'outlined'}
                        keyboardType={'numeric'}
                        style={styles.input}
                    />
                    <Test />
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
        display: 'flex',
        justifyContent: 'center'
    },
    mid: {
        flex: 6,
        justifyContent: 'center'
    },
    label: {
        fontSize: 14,
        fontFamily: 'OpenSans-Bold'
    },
    button: {
        width: '40%',
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
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        alignItems: 'flex-end'
    },
    img: {
        width: '60%',
        resizeMode: 'contain',
        position: 'absolute',
        right: 0
    },
    input: {
        fontSize: 14,
        backgroundColor: '#ECECEC',
        zIndex: 2,
        marginBottom: 30
    }
});

export default SetReminderScreen;
