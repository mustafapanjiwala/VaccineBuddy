import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import colors from '../constants/colors';

const AppButton = ({ onPress }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.btnContainer}
            onPress={onPress}
        >
            <Text style={styles.btnTitle}>Continue</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    btnContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
        paddingVertical: 16,
        // flexDirection: 'row',
        backgroundColor: colors.primary,
        shadowOffset: {width: 0, height: 8},
        shadowColor: '#AAD2D4',
        shadowOpacity: .44,
        shadowRadius: 100,
        elevation: 2
    },
    btnTitle: {
        color: colors.white,
        fontSize: 16,
        fontFamily: 'PublicSans-SemiBold'
    }
});

export default AppButton;
