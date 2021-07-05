import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

import Screen from '../components/Screen';
// import { TextInput } from 'react-native-paper';
import CardHeading from '../components/CardHeading';
import ParaText from '../components/ParaText';
import img from '../assets/Profile.png';
import colors from '../constants/colors';

const ProfileScreen = () => {
    return (
        <Screen style={styles.cointainer}>
            <ScrollView>
                <View style={styles.top}>
                    <View style={styles.topDetails}>
                        <CardHeading>Your Profile</CardHeading>
                        <ParaText>Mustafa Panjiwala</ParaText>
                    </View>
                    <View style={styles.topImage}>
                        <Image source={img} />
                    </View>
                </View>
                <View style={styles.bottom}>
                    <View style={styles.list}>
                        <ParaText>Mother's Name</ParaText>
                        <ParaText style={styles.text}>Lorem Ipsum</ParaText>
                    </View>
                    <View style={styles.list}>
                        <ParaText>Child's Name</ParaText>
                        <ParaText style={styles.text}>Lorem Ipsum</ParaText>
                    </View>
                    <View style={styles.list}>
                        <ParaText>Father's name</ParaText>
                        <ParaText style={styles.text}>Lorem Ipsum</ParaText>
                    </View>
                    <View style={styles.list}>
                        <ParaText>D.O.B</ParaText>
                        <ParaText style={styles.text}>20/20/20</ParaText>
                    </View>
                    <View style={styles.list}>
                        <ParaText>Age (of Child)</ParaText>
                        <ParaText style={styles.text}>3 yrs</ParaText>
                    </View>
                    <View style={styles.list}>
                        <ParaText>Birth Weight</ParaText>
                        <ParaText style={styles.text}>20 lb</ParaText>
                    </View>
                    <View style={styles.list}>
                        <ParaText>Address</ParaText>
                        <ParaText style={styles.address}>
                            60, Minim laboris deserunt cillum non excepteur
                        </ParaText>
                    </View>
                    <View style={styles.list}>
                        <ParaText>Last vaccinated</ParaText>
                        <ParaText style={styles.text}>12/12/12</ParaText>
                    </View>
                </View>
            </ScrollView>
        </Screen>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    top: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: colors.profileBlue
    },
    topDetails: {
        width: '50%'
    },
    topImage: {
        width: '50%'
    },
    bottom: {
        paddingHorizontal: 30,
        paddingVertical: 40
    },
    list: {
        flexDirection: 'row',
        backgroundColor: '#f3f3f3',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        marginBottom: 5,
        borderRadius: 5
    },
    text: {
        fontWeight: 'bold'
    },
    address: {
        fontWeight: 'bold',
        fontSize: 14,
        width: 150
    }
});

export default ProfileScreen;
