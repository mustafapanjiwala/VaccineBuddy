import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import colors from '../constants/colors';
import { Feather } from '@expo/vector-icons';

const AppButton2 = ({ title, name, onPress }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.btnContainer}
            onPress={onPress}
        >
            <Text style={styles.btnTitle}>{title}</Text>
            <Feather
                name={name}
                color={colors.white}
                size={20}
                style={styles.icon}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    btnContainer: {
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
        paddingVertical: 10,
        flexDirection: 'row',
        backgroundColor: colors.primary
    },
    btnTitle: {
        color: colors.white,
        fontSize: 16,
        fontFamily: 'PublicSans-SemiBold'
    },
    icon: {
        marginLeft: 12,
        width: 20,
        height: 20
    }
});

export default AppButton2;
