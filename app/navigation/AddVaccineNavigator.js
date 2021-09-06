import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import colors from '../constants/colors';
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
                name="SelectVaccine"
                component={SelectVaccine}
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
                name="Editable"
                component={EditableVaccine}
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
        </Stack.Navigator>
    );
};

export default AddVaccineNavigator;
