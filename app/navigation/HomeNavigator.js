import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import EditableVaccine from '../screens/EditableTableScreen';
import FaqScreen from '../screens/FaqScreen';
import Home from '../screens/Home';
import KnowYourVaccines from '../screens/KnowYourVaccines';
import NationalVaccineScreen from '../screens/NationalVaccineScreen';
import SetReminderScreen from '../screens/SetReminderScreen';
import AddVaccineNavigator from './AddVaccineNavigator';
import UserDetails1 from '../screens/UserDetails1';
import UserDetails2 from '../screens/UserDetails2';
import ErrorScreen from '../components/ErrorScreen';

const Stack = createStackNavigator();

const HomeNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="UserDetails"
                component={UserDetails1}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="UserDetails2"
                component={UserDetails2}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="AddVaccine"
                component={AddVaccineNavigator}
                options={{ headerShown: true }}
            />
            <Stack.Screen
                name="Reminder"
                component={SetReminderScreen}
                options={{ headerShown: true }}
            />
            <Stack.Screen
                name="EditableTable"
                component={EditableVaccine}
                options={{ headerShown: true }}
            />
            <Stack.Screen
                name="NationalVaccine"
                component={NationalVaccineScreen}
                options={{ headerShown: true }}
            />
            <Stack.Screen
                name="KnowYourVaccine"
                component={KnowYourVaccines}
                options={{ headerShown: true }}
            />
            <Stack.Screen
                name="Faq"
                component={FaqScreen}
                options={{ headerShown: true }}
            />
            <Stack.Screen
                name="Error"
                component={ErrorScreen}
                options={{ headerShown: true }}
            />
        </Stack.Navigator>
    );
};

export default HomeNavigator;
