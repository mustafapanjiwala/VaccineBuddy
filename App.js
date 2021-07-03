import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import AuthNavigator from './app/navigation/AuthNavigator';
import AppNavigator from './app/navigation/AppNavigator';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Test from './app/screens/Test';
import { NavigationContainer } from '@react-navigation/native';
import SetReminderScreen from './app/screens/SetReminderScreen';

export default function App() {
    let [fontsLoaded] = useFonts({
        'OpenSans-Bold': require('./assets/fonts/OpenSans-Bold.ttf'),
        'OpenSans-SemiBold': require('./assets/fonts/OpenSans-SemiBold.ttf'),
        'PublicSans-ExtraLight': require('./assets/fonts/PublicSans-ExtraLight.ttf'),
        'PublicSans-Light': require('./assets/fonts/PublicSans-Light.ttf'),
        'PublicSans-Regular': require('./assets/fonts/PublicSans-Regular.ttf'),
        'PublicSans-SemiBold': require('./assets/fonts/PublicSans-SemiBold.ttf')
    });
    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            // <NavigationContainer>
            <PaperProvider theme={DefaultTheme}>
                {/* <AuthNavigator /> */}
                <SetReminderScreen />
            </PaperProvider>
            // </NavigationContainer>
        );
    }
}
