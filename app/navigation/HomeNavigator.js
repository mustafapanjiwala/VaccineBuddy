import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import EditableVaccine from '../screens/EditableTableScreen';
import FaqScreen from '../screens/FaqScreen';
import Home from '../screens/Home';
import KnowYourVaccines from '../screens/KnowYourVaccines';
import NationalVaccineScreen from '../screens/NationalVaccineScreen';
import SetReminderScreen from '../screens/SetReminderScreen';
import AddVaccineNavigator from './AddVaccineNavigator';

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
                name="AddVacine"
                component={AddVaccineNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Reminder"
                component={SetReminderScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="EditableTable"
                component={EditableVaccine}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="NationalVaccine"
                component={NationalVaccineScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="knowYourVaccine"
                component={KnowYourVaccines}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Faq"
                component={FaqScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};

export default HomeNavigator;
