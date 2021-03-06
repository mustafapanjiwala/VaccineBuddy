import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import ParaText from './ParaText';
import error from '../../assets/illustrations/error.png';
import { Button } from 'react-native-paper';
import colors from '../constants/colors';
import { Restart } from 'fiction-expo-restart';

const ErrorScreen = ({ route, navigation }) => {
    return (
        <View style={styles.container}>
            <Image source={error} />
            <ParaText>OOPS! Something Went Wrong.</ParaText>
            {/* {route && route.error && <ParaText>{route.error.toString()}</ParaText>} */}
            <Button
                style={styles.button}
                mode="outlined"
                color="#CD5F70"
                onPress={() => {
                    Restart();
                }}
            >
                Try Again
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.grey3
    },
    button: {
        marginTop: 40
    }
});

export default ErrorScreen;
