import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import MyFadeInComponent from '../components/FadeInView';
import FadeIn from 'react-native-fade-in-image';
import logo from '../assets/logo.png';

const LandingScreen = () => {
    return (
        <View style={styles.containers}>
            <Image
                fadeDuration={2000}
                source={logo}
                style={styles.logo}
                // onLoad={() => {
                //     setTimeout(() => {
                //         navigation.navigate('Welcome');
                //     }, 1400);
                // }}
            />
            {/* <MyFadeInComponent /> */}
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
        width: '80%',
        resizeMode: 'contain'
    }
});
export default LandingScreen;
