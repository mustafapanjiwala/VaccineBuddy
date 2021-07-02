import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
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
    }
});

export default Screen;
