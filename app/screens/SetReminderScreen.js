import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    KeyboardAvoidingView,
    TouchableOpacity
} from 'react-native';
import Screen from '../components/Screen';
import DatePicker from '../components/DatePicker';

import CardHeading from '../components/CardHeading';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';

import ParaText from '../components/ParaText';
import img from '../assets/calendar.png';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import colors from '../constants/colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome5 } from '@expo/vector-icons';
import moment from 'moment';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

const SetReminderScreen = () => {

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  global.daterem = date;

  const onChange = (event, selectedDate) => {
    const currentDate = moment(selectedDate).format("DD/MM/YYYY") || moment(date).format("DD/MM/YYYY");
  setShow(Platform.OS === 'ios');
    setDate(selectedDate ?? date);
    props.datecb(currentDate)
};

const showMode = (currentMode) => {
  setShow(true);
  setMode(currentMode);
};

const showDatepicker = () => {
  showMode('date');
};

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
                        Select your vaccination date:
                    </ParaText>
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
        title: "Vaccine Reminder 💉",
        body: 'Tomorrow is your vaccination date.',
        data: { data: 'goes here' },
      },
      trigger: { 
        date : moment(daterem).subtract(1, 'day'),
        // seconds: 2
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

export default SetReminderScreen;