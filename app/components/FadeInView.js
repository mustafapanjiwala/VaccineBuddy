import React from 'react';
import { Text, StyleSheet, Image } from 'react-native';
import FadeInView from 'react-native-fade-in-view';

import logo from '../assets/logo.png';

const MyFadeInComponent = () => (
    <FadeInView duration={1200} style={{ alignItems: 'center' }}>
        <Image source={logo} style={styles.logo} />
    </FadeInView>
);

const styles = StyleSheet.create({
    logo: {
        flex: 1,
        width: '80%',
        resizeMode: 'contain'
    }
});
export default MyFadeInComponent;
