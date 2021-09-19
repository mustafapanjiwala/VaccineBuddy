import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import UserDetails1 from '../screens/UserDetails1';
import UserDetails2 from '../screens/UserDetails2';
import colors from '../constants/colors';
const Stack = createStackNavigator();

const UserDetailsNavigator = () => {
    return <Stack.Navigator>
        <Stack.Screen
            name="UserDetails"
            component={UserDetails1}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="UserDetails2"
            component={UserDetails2}
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
}

export default UserDetailsNavigator