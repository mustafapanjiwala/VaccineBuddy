import React from 'react';
import { Text, StyleSheet } from 'react-native';
import colors from '../constants/colors';

const ParaText = ({ fontColor = colors.ParaText, style, children }) => {
    return (
        <Text style={[styles.text, { ...style }, { color: fontColor }]}>
            {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 22,
        fontFamily: 'PublicSans-Regular'
    }
});

export default ParaText;