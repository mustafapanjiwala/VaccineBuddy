import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CheckListScreen from '../screens/CheckListScreen';
import EditableVaccine from '../screens/EditableTableScreen';
import Home from '../screens/Home';
import PreviewScreen from '../screens/PreviewScreen';
import SelectVaccine from '../screens/SelectVaccine';

const Stack = createStackNavigator();

const AddVaccineNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="CheckList"
                component={CheckListScreen}
                options={{ headerShown: true }}
            />
            <Stack.Screen
                name="SelectVaccine"
                component={SelectVaccine}
                options={{ headerShown: true }}
            />
            <Stack.Screen
                name="Editable"
                component={EditableVaccine}
                options={{ headerShown: true }}
            />
        </Stack.Navigator>
    );
};

export default AddVaccineNavigator;
