import React from 'react'
import { StyleSheet, TouchableOpacity, View, Text, Button } from 'react-native';
import ParaText from '../components/ParaText';
import ToggleButton from '../components/ToggleButton';
import AppButton from '../components/AppButton';

const SelectVaccine = () => {
    // const [status, setStatus] = React.useState('checked');
    // const onButtonToggle = value => {
    //     setStatus(status === 'checked' ? 'unchecked' : 'checked');
    //   };

    return (
        <View style={styles.container}>
            <ParaText style={{marginTop: 35, marginBottom: 20, fontSize: 14}}>Select Your Next Vaccine/Vaccines</ParaText>
            <View style={styles.vcontain}>
                <ToggleButton vaccineName="DPT" />
                <ToggleButton vaccineName="HIV" />
                <ToggleButton vaccineName="0PV" />
                <ToggleButton vaccineName="1PV" />
                <ToggleButton vaccineName="HepB" />
                <ToggleButton vaccineName="PCV" />
                <ToggleButton vaccineName="Retavirus" />
            </View>
            <AppButton/>
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

export default SelectVaccine
