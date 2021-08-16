import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from './app/constants/colors';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import Home from '../screens/Home';
import ProfileScreen from '../screens/ProfileScreen';
import SetReminderScreen from '../screens/SetReminderScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: '#00858D',
                inactiveTintColor: colors.white
            }}
            barStyle={{ backgroundColor: colors.primary }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <AntDesign name="home" size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen
                name="Setreminder"
                component={SetReminderScreen}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <MaterialCommunityIcons
                            name="notifications-none"
                            size={size}
                            color={color}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <AntDesign name="user" size={size} color={color} />
                    )
                }}
            />
        </Tab.Navigator>
    );
};

export default AppNavigator;
