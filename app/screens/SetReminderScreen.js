import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    KeyboardAvoidingView,
    TouchableOpacity
} from 'react-native';
import moment from 'moment';
import Screen from '../components/Screen';
import DatePicker from '../components/DatePicker';

import CardHeading from '../components/CardHeading';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';

import ParaText from '../components/ParaText';
import img from '../assets/calendar.png';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

const SetReminderScreen = () => {

    const [visible, setVisible] = React.useState(false);

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);
    
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
  
    useEffect(() => {
      registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
  
      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });
  
      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });
  
      return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    }, []);

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

                    <ParaText style={{ marginBottom: 30, fontSize: 12 }}>
                        Your child’s next vaccine will be on:
                    </ParaText>
                    <DatePicker />
                    {/* <Button onPress={async () => {
                    await schedulePushNotification();
                  }}>sned</Button> */}

                <View>
                        <TouchableOpacity activeOpacity={0.8} onPress={async () => {
                                await schedulePushNotification();
                                showDialog();
                                }} >
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
                </View>

                <View style={styles.bottom}>
                    <Image source={img} style={styles.img} />
                </View>
            </KeyboardAvoidingView>
        </Screen>
    );
};

async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        body: 'Here is the notification body',
        data: { data: 'goes here' },
      },
      trigger: { 
        date: Date.now() + 3000,
       },
       trigger: { 
        date: Date.now() + 7000,
       },
    });
  }
  console.log(Date.now())
  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }

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
        flex: 2,
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
        height: 40,
        marginTop: 30
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
    }
});

export default SetReminderScreen;