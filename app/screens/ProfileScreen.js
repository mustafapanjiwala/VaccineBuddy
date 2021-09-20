import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView
} from 'react-native';

import Screen from '../components/Screen';
import CardHeading from '../components/CardHeading';
import ParaText from '../components/ParaText';
import img from '../assets/Profile.png';
import colors from '../constants/colors';
import AppHeading from '../components/AppHeading';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import CardPara from '../components/CardPara';
import { useGetUser } from '../queries/Users/getUser';
import { useGetChild } from '../queries/Child/getChild';
import { AppContext } from '../context/AppContext';
import { Picker } from '@react-native-picker/picker';
import { UploadImage } from '../queries/Image/UploadImage';
import { useUpdateUser } from '../queries/Users/updateUser';
import { Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { Button } from 'react-native-paper';
import { updateImage } from '../queries/Image/updateImage';
import { useGetUserMutate } from '../queries/Users/getUsersMutate';
import { useGetChildMutate } from '../queries/Child/getChildMutate';
import LoadingScreen from '../components/LoadingScreen';
import AddProfile from './AddProfile';
import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';
import ErrorScreen from '../components/ErrorScreen';

const ProfileScreen = ({ route, navigation }) => {
    const ctx = useContext(AppContext);
    const getUSer = useGetUserMutate();
    const getChild = useGetChildMutate();

    const [isModalVisible, setModalVisible] = useState(false);
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const images = [
        {
            // Simplest usage.
            url: ctx.user ? ctx.user.image ?? '' : '',

            // width: number
            // height: number
            // Optional, if you know the image size, you can set the optimization performance

            // You can pass props to <Image />.
            props: {
                // headers: ...
            }
        }
    ];

    const closeModal = () => {
        if (isModalVisible) {
            setModalVisible(false);
        }
    };

    const updateContext = async () => {
        try {
            console.log('UPDATING DATA');
            const user = await getUSer.mutateAsync(ctx.uid);
            let userData = user.data();
            ctx.setUser({ ...userData, id: ctx.uid, uid: ctx.uid });
            if (userData) {
                if (userData.children) {
                    const Promises = userData.children.map(async (child) => {
                        const childData = await getChild.mutateAsync(child);
                        return { ...childData.data(), id: child };
                    });
                    Promise.all(Promises)
                        .then((res) => {
                            ctx.setChild(res[0]);
                            ctx.setChildren(res);
                            setIsLoading(false);
                            ctx.setIsUpdated(false);
                        })
                        .catch((err) => {
                            setError('Child Data could not be loaded');
                            console.error('UseEffect ProfileScreen.js: ', err);
                            ctx.setIsUpdated(false);
                            setIsLoading(false);
                        });
                } else {
                    setError('Child Data could not be loaded');
                    console.error(
                        'UseEffect ProfileScreen.js : ' +
                        'UserData.children is undefined'
                    );
                    setIsLoading(false);
                    ctx.setIsUpdated(false);
                }
            } else {
                setError('User not found');
                console.error(
                    'UseEffect ProfileScreen.js : ',
                    'UserData is undefined'
                );
                setIsLoading(false);
                ctx.setIsUpdated(false);
            }
        } catch (e) {
            setIsLoading(false);
            setError(e);
            console.error('UseEffect ProfileScreen.js : ' + e);
            ctx.setIsUpdated(false);
        }
    };
    const openModal = () => {
        if (!isModalVisible) {
            setModalVisible(true);
        }
    };

    const [image, setImage] = useState(null);
    const updateUser = useUpdateUser();

    const unSubscribe = navigation.addListener('focus', async () => {
        if (ctx.isUpdated) {
            console.log('PASSED ');
            await updateContext();
            // ctx.setIsUpdated(false)
        }
    })

    const unSubscribeBlur = navigation.addListener('blur', () => {
        unSubscribe();
        unSubscribeBlur();
    })
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

    const [selectedValue, setSelectedValue] = useState('');

    if (updateUser.isLoading || getUSer.isLoading || getChild.isLoading || isLoading) return <LoadingScreen />
    console.log("CHILDREN ", ctx.children)
    if (!ctx.user || !ctx.child) return <ErrorScreen />
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
                    <Picker
                        selectedValue={selectedValue.id}
                        style={{ height: 60, width: 180 }}
                        onValueChange={(itemValue, itemIndex) => {
                            console.log('SEECTING ONE');
                            setSelectedValue(ctx.children[itemIndex]);
                            ctx.setChild(ctx.children[itemIndex]);
                        }}
                    >
                        {ctx.children &&
                            ctx.children.map((child, index) => (
                                <Picker.Item
                                    key={index}
                                    label={child.dob}
                                    value={child.id}
                                />
                            ))}
                    </Picker>
                    <View style={{ flexDirection: 'row' }}>
                        {/* <Feather
                            style={{ marginTop: 3 }}
                            name="camera"
                            size={18}
                            color="black"
                        />
                        <Text onPress={pickImage} style={styles.button}>
                            Add Prescription
                        </Text> */}
                        <FontAwesome5
                            style={{ marginTop: 2 }}
                            name="edit"
                            size={17}
                            color="black"
                        />
                        <Text style={styles.button}>
                            Update Profile
                        </Text>
                    </View>
                </View>
                <View style={styles.topImage}>
                    <Image source={img} />
                </View>
            </View>
            <ScrollView style={styles.bottom}>
                <View style={styles.list}>
                    <ParaText style={styles.text}>Mother's Name</ParaText>
                    <ParaText style={styles.text2}>
                        {ctx.user?.mothersName}
                    </ParaText>
                </View>
                <View style={styles.list}>
                    <ParaText style={styles.text}>Child's Name</ParaText>
                    <ParaText style={styles.text2}>
                        {ctx.child?.childsName}
                    </ParaText>
                </View>
                <View style={styles.list}>
                    <ParaText style={styles.text}>Father's name</ParaText>
                    <ParaText style={styles.text2}>
                        {ctx.user?.fathersName}
                    </ParaText>
                </View>
                <View style={styles.list}>
                    <ParaText style={styles.text}>D.O.B</ParaText>
                    <ParaText style={styles.text2}>{ctx.child?.dob}</ParaText>
                </View>
                <View style={styles.list}>
                    <ParaText style={styles.text}>Age (of Child)</ParaText>
                    <ParaText style={styles.text2}>{(() => {
                        const val = moment().diff(ctx.child.dob, "years")
                        if (isNaN(val)) {
                            return <Text>Not Borned Yet</Text>
                        } else if (val === 0) return <Text>Born today, congrats!</Text>
                        return <Text>{val}</Text>
                    })()}</ParaText>
                </View>
                <View style={styles.list}>
                    <ParaText style={styles.text}>Birth Weight</ParaText>
                    <ParaText style={styles.text2}>
                        {ctx.child?.birthWeight}
                    </ParaText>
                </View>
                <View style={styles.list}>
                    <ParaText style={styles.text}>Address</ParaText>
                    <ParaText style={styles.address}>
                        {ctx.user?.address}
                    </ParaText>
                </View>
                <View style={styles.list}>
                    <ParaText style={styles.text}>Last vaccinated</ParaText>
                    <ParaText style={styles.text2}>
                        {ctx.child?.lastVaccinated}
                    </ParaText>
                </View>
                <View style={styles.list}>
                    <ParaText style={styles.text}>Your Prescription</ParaText>
                    <ParaText style={styles.text2}>
                        {ctx.child?.last_vaccinated}
                    </ParaText>
                    <Button
                        mode="outlined"
                        style={styles.text2}
                        onPress={openModal}
                    >
                        Prescription
                    </Button>
                </View>
                <Modal visible={isModalVisible} transparent={true}>
                    <ImageViewer
                        enableSwipeDown={true}
                        onSwipeDown={closeModal}
                        imageUrls={images}
                    />
                </Modal>
            </ScrollView>
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
        // alignSelf: 'flex-start',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'space-around',
        // position: 'absolute',
        alignSelf: 'flex-end',
        marginRight: 10,
        shadowOffset: { width: 2, height: 6 },
        shadowColor: '#AAD2D4',
        shadowOpacity: 0.21,
        shadowRadius: 100,
        elevation: 2
    }
});

export default ProfileScreen;
