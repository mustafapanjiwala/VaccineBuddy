import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import logo from '../assets/logo.png';

const LandingScreen = ({ navigation }) => {
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
