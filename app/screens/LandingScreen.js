import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import logo from '../assets/logo.png';
import { useEffect } from 'react';
import { useState, useContext } from 'react';
import { AppContext } from "../context/AppContext"
import { useGetUserMutate } from "../queries/Users/getUsersMutate"
import { useGetChildMutate } from "../queries/Child/getChildMutate"

const LandingScreen = ({ navigation }) => {
    const { isAuthenticated, setIsAuthenticated, user, setUser, child, setChild } = useContext(AppContext)

    const getUser = useGetUserMutate();
    const getChild = useGetChildMutate();

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        //for testing
        //START
        try {
            (async function () {
                const userFetched = await getUser.mutateAsync("wYQA7c8yPCXOFX0BOdLPTu0jrA63");
                const childFetched = await getChild.mutateAsync(userFetched.chidren[0])
                console.log("FETCHED CHILD ==> ", childFetched)
                setChild(childFetched)
                setUser(userFetched)
                setIsAuthenticated(true)
            })();
        }
        catch (e) { }
        //END
        // firebase.auth().onAuthStateChanged(async function (user) {
        //     setIsLoading(false)
        //     if (user) {
        //         setIsAuthenticated(true)
        //         try {
        //             const userFetched = await getUser.mutateAsync(user.uid);
        //             const childFetched = await getChild.mutateAsync(userFetched.children[0])
        //             setChild(childFetched)
        //             setUser(userFetched)
        //         }
        //         catch (e) { }
        //     }
        // })
    }, [])
    if (!isAuthenticated) {
        //     handle what to do when user is not signed in
        //     generally return login page
        //     return <LoginScreen />
    }
    if (isLoading) {
        //what to do when is Loading
        //show loading screen
    }
    return (
        <View style={styles.containers}>
            <Image
                fadeDuration={1200}
                source={logo}
                style={styles.logo}
                onLoad={() => {
                    setTimeout(() => {
                        navigation.navigate('PhoneNumber');
                    }, 1400);
                }}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    containers: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: '#79D1D7'
    },
    logo: {
        flex: 1,
        width: '60%',
        resizeMode: 'contain'
    }
});
export default LandingScreen;
