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
import { QueryClient, QueryClientProvider, useMutation } from 'react-query';
// import { useGetUserMutate } from './app/queries/Users/getUsersMutate';
// import { useGetChildMutate } from './app/queries/Child/getChildMutate';
import { AppContext, AppProvider } from './app/context/AppContext';
// import OTPSCREEN from './app/screens/OTPVerification';
// import EditableTable from './app/screens/EditableTableScreen';
// import HomeNavigator from './app/navigation/HomeNavigator';
// import ProfileScreen from './app/screens/ProfileScreen';
// import CheckListScreen from './app/screens/CheckListScreen';
import AppNavigator from './app/navigation/AppNavigator';
// import SetReminderScreen from './app/screens/SetReminderScreen';
// import FaqScreen from './app/screens/FaqScreen';
// import KnowYourVaccines from './app/screens/KnowYourVaccines';
// import SelectVaccine from './app/screens/SelectVaccine';
import { LogBox, YellowBox } from 'react-native';
// import UpdateProfile from './app/screens/UpdateProfile';
// import Home from './app/screens/Home';
// import UserDetails2 from './app/screens/UserDetails2';
// import UserDetails1 from './app/screens/UserDetails1';
import ErrorScreen from './app/components/ErrorScreen';
import "firebase/firestore"
import { COLLECTIONS } from './app/constants/collections';
import { vaccineInfo } from "./app/constants/VaccineInfo"
// import LoadingScreen from './app/components/LoadingScreen';
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
//ANAND
// const firebaseConfig = {
//     apiKey: 'AIzaSyDq38i04UZjDTi-WImzGUmI3JImbKRsGmQ',
//     authDomain: 'vaccinebuddy.firebaseapp.com',
//     projectId: 'vaccinebuddy',
//     storageBucket: 'vaccinebuddy.appspot.com',
//     messagingSenderId: '151343793466',
//     appId: '1:151343793466:web:a01eb512c9c455a3cdbc03'
// };
//PROD
const firebaseConfig = {
    apiKey: "AIzaSyBdr_7Oi85DJrP6Xx6o3V12REYedBT_x8c",
    authDomain: "vacseen-1ffe9.firebaseapp.com",
    projectId: "vacseen-1ffe9",
    storageBucket: "vacseen-1ffe9.appspot.com",
    messagingSenderId: "285369646875",
    appId: "1:285369646875:web:be10274fe7fdffde219dbe",
    measurementId: "G-Z4R2SV08RZ"
};

try {
    firebase.initializeApp(firebaseConfig);
} catch (Error) {
    console.error('FIREBASE INIT FAILED!!!');
}

const queryClient = new QueryClient();

const useImport = () => {
    return useMutation(async () => {
        const promises = vaccineInfo.map(e => firebase.firestore().collection(COLLECTIONS.VACCINES).add(e))
        return await Promise.all(promises)
    })
}

export default function App() {
    // console.disableYellowBox = true;
    LogBox.ignoreLogs([
        'Setting a timer for a long period of time, i.e. multiple minutes, is a performance and correctness issue on Android as it keeps the timer module awake, and timers can only be called when the app is in the foreground. See https://github.com/facebook/react-native/issues/12981 for more info.(Saw setTimeout with duration 300000ms)'
    ]);

    // useEffect(() => firebase.auth().signOut(), [])

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
                    <NavigationContainer>
                        <PaperProvider theme={theme}>
                            <Main />
                        </PaperProvider>
                    </NavigationContainer>
                </AppProvider>
            </QueryClientProvider>
        );
    }
}

const Main = (props) => {
    const [t, setT] = useState(false)
    // const importData = useImport();
    const { setUid, setIsAuthenticated, isAuthenticated } =
        useContext(AppContext);
    // useEffect(() => {
    //     console.log("t", t, importData)
    //     if (!t) { importData.mutateAsync(); setT(true) }
    // }, [importData])
    console.log('IS AUTHENTICATED ', isAuthenticated);
    firebase.auth().onAuthStateChanged(async function (user) {
        if (user) {
            try {
                console.log('SIGNING IN');
                setIsAuthenticated(true);
                setUid(user.uid);
            } catch (e) {
                console.error('CATCHED IN ', e);
            }
        }
    });
    // if (importData.isLoading) return <LoadingScreen />e
    if (isAuthenticated) return <AppNavigator />;
    else return <AuthNavigator />;
};
