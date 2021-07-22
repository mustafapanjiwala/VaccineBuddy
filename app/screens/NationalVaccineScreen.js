import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

import Screen from '../components/Screen';
import AppHeading from '../components/AppHeading';
import ParaText from '../components/ParaText';
import AppButton2 from '../components/AppButton2';
import img from '../assets/NationalVaccine.png';

import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';

const NationalVaccineScreen = () => {
    return (
        <Screen>
            <View style={styles.container}>
                <AppHeading style={styles.heading}>
                    Latest National Vaccination Schedule
                </AppHeading>
                <ScrollView horizontal={true}>
                    <Image source={img} style={styles.Image} />
                </ScrollView>
                <ParaText style={styles.text}>
                    For more details on recommended vaccines.
                </ParaText>
                <AppButton2
                    title="Download"
                    name="download"
                    onPress={() => {
                        console.log('pressed');
                    }}
                />
            </View>
        </Screen>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 60,
        justifyContent: 'space-between'
    },
    heading: {
        width: '80%',
        marginBottom: 40
    },
    img: {
        width: '100%'
    },
    text: {
        marginBottom: 20
    }
});

export default NationalVaccineScreen;
