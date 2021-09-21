import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import AddProfile from '../screens/AddProfile';
import ProfileScreen from '../screens/ProfileScreen';
import colors from '../constants/colors';
import UpdateProfile from '../screens/UpdateProfile';

const Stack = createStackNavigator();

const ProfileScreenNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="AddProfile"
                component={AddProfile}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="UpdateProfile"
                component={UpdateProfile}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    );
};

export default ProfileScreenNavigator;
