import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import AddProfile from '../screens/AddProfile';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator;

const ProfileScreenNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ProfileScr"
                component={ProfileScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="AddPrf"
                component={AddProfile}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};

export default ProfileScreenNavigator;
