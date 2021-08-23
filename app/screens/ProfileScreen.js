import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

import Screen from '../components/Screen';
import CardHeading from '../components/CardHeading';
import ParaText from '../components/ParaText';
import img from '../assets/Profile.png';
import colors from '../constants/colors';
import AppHeading from '../components/AppHeading';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import CardPara from '../components/CardPara';
import { useGetUser } from '../queries/Users/getUser';
import { useGetChild } from '../queries/Child/getChild';

const ProfileScreen = ({ navigation }) => {
    const [image, setImage] = useState(null);
    const user = useGetUser('wYQA7c8yPCXOFX0BOdLPTu0jrA63');
    const child = useGetChild('2uW8KfSNufNUes7E5NI1');

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } =
                    await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert(
                        'Sorry, we need camera roll permissions to make this work!'
                    );
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [3, 5],
            quality: 1
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    // if (user.isLoading || child.isLoading) return <View><Text>Loading...</Text></View>
    // console.log("CHILD", child.data, "USER", user.data)

    return (
        <Screen style={styles.cointainer}>
            <View style={styles.top}>
                <View style={styles.topDetails}>
                    <ParaText
                        style={{
                            fontSize: 20,
                            fontFamily: 'PublicSans-SemiBold'
                        }}
                    >
                        Your Profile
                    </ParaText>
                    <ParaText style={styles.name}>Mustafa Panjiwala</ParaText>
                    <View style={{ flexDirection: 'row' }}>
                        <Feather
                            style={{ marginTop: 3 }}
                            name="camera"
                            size={18}
                            color="black"
                        />
                        <Text onPress={pickImage} style={styles.button}>
                            Add Prescription
                        </Text>
                    </View>
                </View>
                <View style={styles.topImage}>
                    <Image source={img} />
                </View>
            </View>
            <View style={styles.bottom}>
                <View style={styles.list}>
                    <ParaText style={styles.text}>Mother's Name</ParaText>
                    <ParaText style={styles.text2}>
                        {user.data?.mothers_name}
                    </ParaText>
                </View>
                <View style={styles.list}>
                    <ParaText style={styles.text}>Child's Name</ParaText>
                    <ParaText style={styles.text2}>{child.data?.name}</ParaText>
                </View>
                <View style={styles.list}>
                    <ParaText style={styles.text}>Father's name</ParaText>
                    <ParaText style={styles.text2}>
                        {user.data?.fathers_name}
                    </ParaText>
                </View>
                <View style={styles.list}>
                    <ParaText style={styles.text}>D.O.B</ParaText>
                    <ParaText style={styles.text2}>
                        {child.data?.dob?.toLocaleDateString()}
                    </ParaText>
                </View>
                <View style={styles.list}>
                    <ParaText style={styles.text}>Age (of Child)</ParaText>
                    <ParaText style={styles.text2}>{'calculate here'}</ParaText>
                </View>
                <View style={styles.list}>
                    <ParaText style={styles.text}>Birth Weight</ParaText>
                    <ParaText style={styles.text2}>
                        {child.data?.weight}
                    </ParaText>
                </View>
                <View style={styles.list}>
                    <ParaText style={styles.text}>Address</ParaText>
                    <ParaText style={styles.address}>
                        {user.data?.address}
                    </ParaText>
                </View>
                <View style={styles.list}>
                    <ParaText style={styles.text}>Last vaccinated</ParaText>
                    <ParaText style={styles.text2}>
                        {child.data?.last_vaccinated?.toLocaleDateString()}
                    </ParaText>
                </View>
            </View>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                    navigation.navigate('AddProfile');
                }}
            >
                <View style={styles.addProfileButton}>
                    <AntDesign
                        style={{ marginTop: 1 }}
                        name="adduser"
                        size={21}
                        color="white"
                    />
                    <Text style={styles.addtext}>Add Profile</Text>
                </View>
            </TouchableOpacity>
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
        paddingHorizontal: 30,
        paddingTop: 18
    },
    topDetails: {
        width: '60%',
        paddingVertical: 20
    },
    name: {
        marginTop: 10,
        marginBottom: 20,
        fontSize: 12
    },
    topImage: {
        width: '40%',
        flexDirection: 'column-reverse'
    },
    button: {
        textDecorationLine: 'underline',
        fontSize: 10,
        color: colors.black,
        fontSize: 11,
        fontFamily: 'PublicSans-SemiBold',
        marginLeft: 4
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
        padding: 10,
        marginBottom: 8,
        borderRadius: 5,
        height: 'auto'
    },
    text: {
        fontSize: 12,
        marginRight: 18,
        // width: 100,
        width: 130,
        flexWrap: 'wrap',
        fontFamily: 'PublicSans-Light'
    },
    text2: {
        fontSize: 12,
        fontFamily: 'PublicSans-Regular',
        flex: 1,
        flexWrap: 'wrap'
    },
    address: {
        fontFamily: 'PublicSans-Regular',
        fontSize: 12,
        flex: 1,
        flexWrap: 'wrap'
        // width: 150
    },
    addtext: {
        fontFamily: 'PublicSans-Regular',
        fontSize: 15,
        color: colors.white,
        margin: 2
    },
    addProfileButton: {
        backgroundColor: colors.primary,
        flexDirection: 'row',
        alignSelf: 'flex-start',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'space-around',
        position: 'absolute',
        right: 15,
        bottom: 20,
        shadowOffset: { width: 2, height: 6 },
        shadowColor: '#AAD2D4',
        shadowOpacity: 0.21,
        shadowRadius: 100,
        elevation: 2
    }
});

export default ProfileScreen;
