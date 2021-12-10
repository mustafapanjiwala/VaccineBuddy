import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import ParaText from './ParaText';
import loader from '../assets/loader.gif'
const LoadingScreen = () => {
    return (
        <View style={styles.container}>
            <Image
                style={{ width: 400, height: 300 }}
                source={require('../assets/loader.gif')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    }
});

export default LoadingScreen;
