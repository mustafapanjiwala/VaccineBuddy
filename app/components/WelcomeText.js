import React from 'react';
import { Text, StyleSheet } from 'react-native';
import colors from '../constants/colors';

const WelcomeText = ({ fontColor = colors.black, style, children }) => {
    return (
        <Text style={[styles.text, { ...style }, { color: fontColor }]}>
            {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 32,
        fontFamily: 'OpenSans-Bold'
    }
});

export default WelcomeText;
