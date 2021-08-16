import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CheckListScreen from '../screens/CheckListScreen';
import PreviewScreen from '../screens/PreviewScreen';
import SelectVaccine from '../screens/SelectVaccine';

const Stack = createStackNavigator;

const AddVaccineNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="CheckList"
                component={CheckListScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SelectVaccine"
                component={SelectVaccine}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="PreviewScreen"
                component={PreviewScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};

export default AddVaccineNavigator;
