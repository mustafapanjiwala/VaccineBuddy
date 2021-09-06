import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from '../screens/LandingScreen';
import PhoneNumberScreen from '../screens/PhoneNumberScreen';
import UserDetails1 from '../screens/UserDetails1';
import UserDetails2 from '../screens/UserDetails2';
import Home from '../screens/Home';
import HomeNavigator from './HomeNavigator';
import AppNavigator from './AppNavigator';
import OTPVerification from '../screens/OTPVerification';
const Stack = createStackNavigator();
import colors from '../constants/colors';
const AuthNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Landing"
                component={LandingScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="PhoneNumber"
                component={PhoneNumberScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="OTPVerification"
                component={OTPVerification}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: colors.primary
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold'
                    }
                }}
            />
            <Stack.Screen
                name="UserDetails"
                component={UserDetails1}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="UserDetails2"
                component={UserDetails2}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: colors.primary
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold'
                    }
                }}
            />
            <Stack.Screen
                name="Home"
                component={AppNavigator}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};

export default AuthNavigator;
