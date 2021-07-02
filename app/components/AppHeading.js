import React from 'react';
import { Text, StyleSheet } from 'react-native';
import colors from '../constants/colors';

const AppHeading = ({ fontColor = colors.black, style, children }) => {
    return (
        <Text style={[styles.text, { ...style }, { color: fontColor }]}>
            {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 22,
        fontFamily: 'OpenSans-Bold'
    }
});

export default AppHeading;