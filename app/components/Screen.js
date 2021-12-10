import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import colors from '../constants/colors';

function Screen({ children }) {
    return (
        <SafeAreaView style={[styles.container, { backgroundColor: '#fff' }]}>
            {children}
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginTop: StatusBar.currentHeight
    }
});

export default Screen;
