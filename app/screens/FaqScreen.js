import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

import Screen from '../components/Screen';
import CardHeading from '../components/CardHeading';
import img from '../assets/FAQ.png';
import ParaText from '../components/ParaText';
import AppHeading from '../components/AppHeading';

const FaqScreen = () => {
    return (
        <Screen>
            <ScrollView>
                <View style={styles.top}>
                    <CardHeading>FAQs</CardHeading>
                    <Image source={img} style={styles.img} />
                </View>
                <View style={styles.bottom}>
                    <AppHeading style={styles.heading}>
                        What is Lorem Ipsum?
                    </AppHeading>
                    <ParaText style={styles.para}>
                        Fugiat aute mollit in ex Lorem cillum. Mollit excepteur
                        exercitation elit elit excepteur in cupidatat ea. Labore
                        consequat esse amet consectetur eiusmod excepteur ea
                        velit labore.Fugiat aute mollit in ex Lorem cillum.
                        Mollit excepteur exercitation elit elit excepteur in
                        cupidatat ea. Labore consequat esse amet consectetur
                        eiusmod excepteur ea velit labore.
                    </ParaText>
                    <AppHeading style={styles.heading}>
                        What is Lorem Ipsum?
                    </AppHeading>
                    <ParaText style={styles.para}>
                        Fugiat aute mollit in ex Lorem cillum. Mollit excepteur
                        exercitation elit elit excepteur in cupidatat ea. Labore
                        consequat esse amet consectetur eiusmod excepteur ea
                        velit labore.Fugiat aute mollit in ex Lorem cillum.
                        Mollit excepteur exercitation elit elit excepteur in
                        cupidatat ea. Labore consequat esse amet consectetur
                        eiusmod excepteur ea velit labore.
                    </ParaText>
                    <AppHeading style={styles.heading}>
                        What is Lorem Ipsum?
                    </AppHeading>
                    <ParaText style={styles.para}>
                        Fugiat aute mollit in ex Lorem cillum. Mollit excepteur
                        exercitation elit elit excepteur in cupidatat ea. Labore
                        consequat esse amet consectetur eiusmod excepteur ea
                        velit labore.Fugiat aute mollit in ex Lorem cillum.
                        Mollit excepteur exercitation elit elit excepteur in
                        cupidatat ea. Labore consequat esse amet consectetur
                        eiusmod excepteur ea velit labore.
                    </ParaText>
                </View>
            </ScrollView>
        </Screen>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30
    },
    top: {
        paddingTop: 60,
        paddingBottom: 40,
        paddingHorizontal: 30,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    bottom: {
        paddingHorizontal: 30
    },
    heading: {
        marginTop: 40,
        marginBottom: 20
    },
    para: {
        textAlign: 'justify'
    }
});
export default FaqScreen;
