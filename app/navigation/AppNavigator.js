import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from '../constants/colors';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import Home from '../screens/Home';
import ProfileScreen from '../screens/ProfileScreen';
import AddProfile from '../screens/AddProfile';
import SetReminderScreen from '../screens/SetReminderScreen';
import EditableVaccine from '../screens/EditableTableScreen';
import KnowYourVaccines from '../screens/KnowYourVaccines';
import CheckListScreen from '../screens/CheckListScreen';
// import HomeNavigator from './HomeNavigator';
// import ProfileScreenNavigator from './ProfileScreenNavigator';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: '#00858D',
                inactiveTintColor: colors.white,
                style: {
                    backgroundColor: '#79d1d7',
                    height: 60,
                    paddingBottom: 5
                }
            }}
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
                name="Reminder"
                component={SetReminderScreen}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <MaterialCommunityIcons
                            name="bell-outline"
                            size={size}
                            color={color}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="Profile"
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