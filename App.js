import React, { useContext, useState, useEffect } from 'react';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import AuthNavigator from './app/navigation/AuthNavigator';
import {
    DefaultTheme,
    configureFonts,
    Provider as PaperProvider
} from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import firebase from 'firebase/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useGetUserMutate } from "./app/queries/Users/getUsersMutate"
import { useGetChildMutate } from "./app/queries/Child/getChildMutate"
import { AppContext, AppProvider } from './app/context/AppContext';
import OTPSCREEN from "./app/screens/OTPVerification"
import EDITABLETABLE from "./app/screens/EditableTableScreen"
import HomeNavigator from './app/navigation/HomeNavigator';
import ProfileScreen from './app/screens/ProfileScreen';
import CheckListScreen from './app/screens/CheckListScreen';
import AppNavigator from './app/navigation/AppNavigator';
import SetReminderScreen from './app/screens/SetReminderScreen';
import FaqScreen from './app/screens/FaqScreen';
import KnowYourVaccines from './app/screens/KnowYourVaccines';
import SelectVaccine from './app/screens/SelectVaccine';
import LoadingScreen from './app/components/LoadingScreen';
import ErrorScreen from './app/components/ErrorScreen'

const fontConfig = {
    web: {
        regular: {
            fontFamily: 'PublicSans-Regular'
        },
        light: {
            fontFamily: 'PublicSans-Light'
        }
    }
};

const theme = {
    ...DefaultTheme,
    fonts: configureFonts(fontConfig),
    roundness: 10,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0A8C94',
        accent: '#ECECEC'
    }
};

const firebaseConfig = {
    apiKey: 'AIzaSyDq38i04UZjDTi-WImzGUmI3JImbKRsGmQ',
    authDomain: 'vaccinebuddy.firebaseapp.com',
    projectId: 'vaccinebuddy',
    storageBucket: 'vaccinebuddy.appspot.com',
    messagingSenderId: '151343793466',
    appId: '1:151343793466:web:a01eb512c9c455a3cdbc03'
};

try {
    firebase.initializeApp(firebaseConfig);
} catch (Error) {
    console.error('FIREBASE INIT FAILED!!!');
}


const queryClient = new QueryClient();


export default function App() {



    let [fontsLoaded] = useFonts({
        'OpenSans-Bold': require('./assets/fonts/OpenSans-Bold.ttf'),
        'OpenSans-SemiBold': require('./assets/fonts/OpenSans-SemiBold.ttf'),
        'PublicSans-ExtraLight': require('./assets/fonts/PublicSans-ExtraLight.ttf'),
        'PublicSans-Light': require('./assets/fonts/PublicSans-Light.ttf'),
        'PublicSans-Regular': require('./assets/fonts/PublicSans-Regular.ttf'),
        'PublicSans-SemiBold': require('./assets/fonts/PublicSans-SemiBold.ttf')
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <QueryClientProvider client={queryClient}>
                <AppProvider>
                    < Main />
                </AppProvider>
            </QueryClientProvider>
        )
    }
}

const Main = props => {
    const getUser = useGetUserMutate();
    const getChild = useGetChildMutate();
    const { setUid, setIsAuthenticated, isAuthenticated } = useContext(AppContext)

    firebase.auth().onAuthStateChanged(async function (user) {
        try {
            console.log("USER UID", user.uid)
            setUid(user.uid)
            if (user) {
                setIsAuthenticated(true)
                try {
                    // const userFetched = await getUser.mutateAsync(user.uid);
                    // const childFetched = await getChild.mutateAsync(userFetched.children[0])
                    // console.log("HERE", userFetched)
                    // setChild(childFetched)
                    // setUser(userFetched)
                    // console.log("SETTING USER ID ----> ", user.displayName, userFetched)
                    setUid(user.uid)
                }
                catch (e) {
                    console.error("CATCHEDI IN ", e)
                }
            }
        } catch (e) {
            console.error("CATCHED ", e)
        }
    })
    console.log("isAuthenticated", isAuthenticated)
    return (
        <NavigationContainer>
            <PaperProvider theme={theme}>
                {!isAuthenticated ? <AuthNavigator /> : <AppNavigator />}
                {/* <ProfileScreen /> */}
                {/* <AppNavigator /> */}
                {/* <ProfileScreen /> */}
            </PaperProvider>
        </NavigationContainer>
    );
}