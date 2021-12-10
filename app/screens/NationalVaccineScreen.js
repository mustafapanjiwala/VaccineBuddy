import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
// import * as Permissions from 'expo-permissions';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import * as Print from 'expo-print';

import Screen from '../components/Screen';
import AppHeading from '../components/AppHeading';
import ParaText from '../components/ParaText';
import AppButton2 from '../components/AppButton2';
import img from '../assets/NationalVaccine.jpg';


const NationalVaccineScreen = () => {
    const [error, setError] = useState()

    const downloadImage = async () => {
        const filename = "National Vaccination Schedule.jpg"
        const fileUri = `${FileSystem.documentDirectory}${filename}`;
        const uri = "https://www.indianpediatrics.net/jan2021/images/RECOMM-1-2.jpg"
        const downloadedFile = await FileSystem.downloadAsync(uri, fileUri);
        if (downloadedFile.status !== 200) setError("Falied To Download Image")
        else {
            //for ios and android -- works only on image files
            const permission = await MediaLibrary.requestPermissionsAsync();
            if (!permission.granted) {
                alert("Need Permissions to download image")
            }
            else {
                try {
                    const asset = await MediaLibrary.createAssetAsync(downloadedFile.uri);
                    const album = await MediaLibrary.getAlbumAsync('Download');
                    if (album == null) {
                        await MediaLibrary.createAlbumAsync('Download', asset, false);
                    } else {
                        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
                    }
                    alert("Image Downloaded!")
                } catch (e) {
                    setError("Image Downloaded!")
                    console.log("DOWNLOAD ERROR NationalVaccineScreen, ", e)
                }
            }
        }
    }

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
    if (error) alert(error)
    return (
        <Screen>
            <View style={styles.container}>
                <AppHeading style={styles.heading}>
                    Latest National Vaccination Schedule
                </AppHeading>
                <ScrollView>
                <ScrollView horizontal>
                    <Image source={img} style={styles.img} />
                </ScrollView>
                </ScrollView>
                <ParaText style={styles.text}>
                    For more details on recommended vaccines.
                </ParaText>
                <AppButton2
                    title="Download"
                    name="download"
                    onPress={() => {
                        downloadImage();
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
        height: 330
    },
    text: {
        marginBottom: 20
    }
});

export default NationalVaccineScreen;
