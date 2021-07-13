import React from 'react'
import { StyleSheet, TouchableOpacity, View, Text, Button } from 'react-native';
import ParaText from '../components/ParaText';
import ToggleButton from '../components/ToggleButton';
import ToggleRadioButton from '../components/ToggleRadioButton';
import AppButton from '../components/AppButton';

const KnowYourVaccines = () => {

    return (
        <View style={styles.container}>
            <ParaText style={{marginTop: 35, marginBottom: 20, fontSize: 14}}>Select any of the vaccine you want to know about.</ParaText>
            <View style={styles.vcontain}>
                <ToggleRadioButton vaccineName="DPT" />
                <ToggleRadioButton vaccineName="HIV" />
                <ToggleRadioButton vaccineName="0PV" />
                <ToggleRadioButton vaccineName="1PV" />
                <ToggleRadioButton vaccineName="HepB" />
                <ToggleRadioButton vaccineName="PCV" />
                <ToggleRadioButton vaccineName="Retavirus" />
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        height:500,
    },
    vcontain: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
    }
})

export default KnowYourVaccines