import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import { Permissions } from 'expo-permissions';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import * as Print from 'expo-print';

import Screen from '../components/Screen';
import AppHeading from '../components/AppHeading';
import ParaText from '../components/ParaText';
import AppButton2 from '../components/AppButton2';
import img from '../assets/NationalVaccine.png';

const NationalVaccineScreen = () => {
    // saveToCamerRoll = async (img) => {
    //     let cameraPermissions = await Permissions.getAsync(
    //         Permissions.CAMERA_ROLL
    //     );
    //     if (cameraPermissions.status != 'granted') {
    //         cameraPermissions = await Permissions.askAsync(
    //             Permissions.CAMERA_ROLL
    //         );
    //     }

    //     if (cameraPermissions.status === 'granted') {
    //         FileSystem.downloadAsync(
    //             img,
    //             FileSystem.DocumentDirectory +
    //                 'National Vaccine Schedule' +
    //                 '.jpg'
    //         )
    //             .then(({ uri }) => {
    //                 CameraRoll.saveToCameraRoll(uri);
    //                 alert('Saved to photos');
    //             })
    //             .catch((error) => {
    //                 console.log(error);
    //             });
    //     } else {
    //         alert('Requires camer roll Permission');
    //     }
    // };

    const createAndSavePDF = async () => {
        if (Platform.OS === 'ios') {
            await Sharing.shareAsync("../assets/NationalVaccine.png");
        } else {
            const permission = await MediaLibrary.requestPermissionsAsync();

            if (permission.granted) {
                await MediaLibrary.createAssetAsync("../assets/NationalVaccine.png");
                return uri
            }
        }
    }

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Pdf Content</title>
        <style>
            body {
                font-size: 16px;
                color: rgb(255, 196, 0);
            }

            h1 {
                text-align: center;
            }
        </style>
    </head>
    <body>
        <h1>Hello, UppLabs!</h1>
    </body>
    </html>
`;

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
                        createAndSavePDF();
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
