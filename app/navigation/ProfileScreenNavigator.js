import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import AddProfile from '../screens/AddProfile';
import ProfileScreen from '../screens/ProfileScreen';
import colors from '../constants/colors';

const Stack = createStackNavigator();

const ProfileScreenNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ProfileScreen"
                component={ProfileScreen}
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
                name="AddProfile"
                component={AddProfile}
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

export default ProfileScreenNavigator;
