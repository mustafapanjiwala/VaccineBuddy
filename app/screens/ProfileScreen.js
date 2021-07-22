import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import Screen from '../components/Screen';
import CardHeading from '../components/CardHeading';
import ParaText from '../components/ParaText';
import img from '../assets/Profile.png';
import colors from '../constants/colors';

const ProfileScreen = () => {
    return (
        <Screen style={styles.cointainer}>
            <View style={styles.top}>
                <View style={styles.topDetails}>
                    <CardHeading>Your Profile</CardHeading>
                    <ParaText style={styles.name}>Mustafa Panjiwala</ParaText>
                    <Text
                        onPress={() => console.log('Pressed')}
                        style={styles.button}
                    >
                        Update your profile
                    </Text>
                </View>
                <View style={styles.topImage}>
                    <Image source={img} />
                </View>
            </View>
            <View style={styles.bottom}>
                <View style={styles.list}>
                    <ParaText style={styles.text}>Mother's Name</ParaText>
                    <ParaText style={styles.text2}>Lorem Ipsum</ParaText>
                </View>
                <View style={styles.list}>
                    <ParaText style={styles.text}>Child's Name</ParaText>
                    <ParaText style={styles.text2}>Lorem Ipsum</ParaText>
                </View>
                <View style={styles.list}>
                    <ParaText style={styles.text}>Father's name</ParaText>
                    <ParaText style={styles.text2}>Lorem Ipsum</ParaText>
                </View>
                <View style={styles.list}>
                    <ParaText style={styles.text}>D.O.B</ParaText>
                    <ParaText style={styles.text2}>20/20/20</ParaText>
                </View>
                <View style={styles.list}>
                    <ParaText style={styles.text}>Age (of Child)</ParaText>
                    <ParaText style={styles.text2}>3 yrs</ParaText>
                </View>
                <View style={styles.list}>
                    <ParaText style={styles.text}>Birth Weight</ParaText>
                    <ParaText style={styles.text2}>20 lb</ParaText>
                </View>
                <View style={styles.list}>
                    <ParaText style={styles.text}>Address</ParaText>
                    <ParaText style={styles.address}>
                        60, Minim laboris deserunt cillum non excepteur
                    </ParaText>
                </View>
                <View style={styles.list}>
                    <ParaText style={styles.text}>Last vaccinated</ParaText>
                    <ParaText style={styles.text2}>12/12/12</ParaText>
                </View>
            </View>
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
        backgroundColor: colors.profileBlue,
        paddingHorizontal: 10
    },
    topDetails: {
        width: '60%',
        paddingVertical: 20
    },
    name: {
        marginTop: 10,
        marginBottom: 20
    },
    topImage: {
        width: '40%',
        flexDirection: 'column-reverse'
    },
    button: {
        textDecorationLine: 'underline',
        fontSize: 10,
        color: colors.black,
        fontSize: 12
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
        fontSize: 14
    },
    text2: {
        fontSize: 14,
        fontFamily: 'PublicSans-SemiBold'
    },
    address: {
        fontFamily: 'PublicSans-SemiBold',
        fontSize: 12,
        width: 150
    }
});

export default ProfileScreen;
