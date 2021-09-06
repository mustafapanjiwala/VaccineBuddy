import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import AddProfile from '../screens/AddProfile';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator();

const ProfileScreenNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={{ headerShown: true }}
            />
            <Stack.Screen
                name="AddProfile"
                component={AddProfile}
                options={{ headerShown: true }}
            />
        </Stack.Navigator>
    );
};

export default ProfileScreenNavigator;
