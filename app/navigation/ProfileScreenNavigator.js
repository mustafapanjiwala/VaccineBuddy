import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import AddProfile from '../screens/AddProfile';
import Home from '../screens/Home';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator();

const ProfileScreenNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="AdProfile"
                component={AddProfile}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};

export default ProfileScreenNavigator;
