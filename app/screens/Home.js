import React, { useState, useContext, useEffect, useCallback } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    Button,
    ScrollView,
    FlatList,
    Image
} from 'react-native';
import { color } from 'react-native-reanimated';
import Screen from '../components/Screen';
import colors from '../constants/colors';
import CardHeading from '../components/CardHeading';
import CardPara from '../components/CardPara';
import { AppContext } from '../context/AppContext';
import { useGetUserMutate } from '../queries/Users/getUsersMutate';
import { useGetChildMutate } from '../queries/Child/getChildMutate';
import LoadingScreen from '../components/LoadingScreen';
import ErrorScreen from '../components/ErrorScreen';
import { useFocusEffect } from '@react-navigation/native';
import UserDetailsNavigator from '../navigation/UserDetailsNavigator';
const Home = ({ navigation }) => {
    goToNextScreen = (screen) => {
        unSubscribe()
        return navigation.navigate(screen);
    };
    const getUSer = useGetUserMutate();
    const getChild = useGetChildMutate();
    const ctx = useContext(AppContext);
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const [cardInfo, setCardInfo] = useState([
        {
            id: '1',
            title: 'Add Vaccine',
            para: 'Chart your childs vaccination here',
            img: require('../../assets/illustrations/1.jpg'),
            onpress: 'AddVaccine'
        },
        {
            id: '2',
            title: 'Set Reminder',
            para: 'Set reminder according to your preference.',
            img: require('../../assets/illustrations/2.jpg'),
            onpress: 'Reminder'
        },
        {
            id: '3',
            title: 'Your Vaccine Chart',
            para: 'Quick view of the vaccinations done so far.',
            img: require('../../assets/illustrations/3.jpg'),
            onpress: 'EditableTable'
        },
        {
            id: '7',
            title: 'My Prescriptions',
            para: 'Keep all your prescriptions at one place.',
            img: require('../../assets/illustrations/7.png'),
            onpress: 'MyPrescriptions'
        },
        {
            id: '4',
            title: 'Vaccination Schedule',
            para: 'Latest IAP schedule.',
            img: require('../../assets/illustrations/4.jpg'),
            onpress: 'NationalVaccine'
        },
        {
            id: '5',
            title: 'Know Your Vaccines',
            para: 'Details of the vaccines.',
            img: require('../../assets/illustrations/5.jpg'),
            onpress: 'KnowYourVaccine'
        },
        {
            id: '6',
            title: 'FAQs',
            para: 'Dont worry about a thing. We have got you covered.',
            img: require('../../assets/illustrations/6.jpg'),
            onpress: 'Faq'
        }
    ]);

    const getAndMutateUser = async () => {
        // console.log("CTX ", ctx)
        try {
            const user = await getUSer.mutateAsync(ctx.uid);
            let userData = user;
            console.log("SHOULD BE HERE", userData, ctx.uid, getUSer)
            if (userData) ctx.setUser({ ...userData, id: ctx.uid, uid: ctx.uid });
                if (userData) {
                    if (userData.children) {
                        const Promises = userData.children.map(
                            async (child) => {
                                const childData = await getChild.mutateAsync(
                                    child
                                );
                                return { ...childData.data(), id: child };
                            }
                        );
                        Promise.all(Promises)
                            .then((res) => {
                                console.log("EXECTUION FINISHED")
                                ctx.setChild(res[0]);
                                ctx.setChildren(res);
                                ctx.setShowUserDetails(false);
                                setIsLoading(false);
                            })
                            .catch((err) => {
                                setError('Child Data could not be loaded');
                                console.error('UseEffect Home.js: ', err);
                                setIsLoading(false);
                            });
                    } else {
                        setError('Child Data could not be loaded');
                        console.error(
                            'UseEffect Home.js : ' +
                                'UserData.children is undefined'
                        );
                        setIsLoading(false);
                    }
                } else setIsLoading(false);
            } catch (e) {
                setIsLoading(false);
                setError(e.toString());
                console.error('UseEffect Home.js : ' + e);
            }
    }

    // useFocusEffect(useCallback(() => {
    //     console.log("FROM FOCUS EFFECT", !isLoading && ctx.showUserDetails)
    //     getAndMutateUser()
    // }, [])
    // )

    useEffect(() => {
            // console.log("FROM LISTENER")
            (async() => {
        if (!ctx.user || !ctx.child) await getAndMutateUser()
            })()

    }, [ctx.uid])

    const unSubscribe = navigation.addListener('focus', async () => {

        console.log("FROM LISTENER")
        if (!ctx.user || !ctx.child) await getAndMutateUser()
    })
    const unSubscribeBlur = navigation.addListener('blur', () => {
        unSubscribe();
        unSubscribeBlur();
    })




    if (error) return <ErrorScreen />;
    if (getUSer.isLoading || getChild.isLoading)
        return <LoadingScreen />;
    if (!ctx.user || !ctx.child) {
        // console.log("ctx.showUserDetails", ctx.showUserDetails, userData)
        // navigation.navigate('UserDetails');
        return <UserDetailsNavigator />
    }

    return (
        <Screen>
            <View style={styles.container}>
                <View style={styles.helloBox}>
                    <Text style={styles.helloText}>Hello There!</Text>
                    {/* <View style={styles.nextVaccineContainer}>
                        <Text style={styles.nextVaccineText}>
                            Your next vaccine
                        </Text>
                        <Text style={styles.nextVaccineText}>PCV 1</Text>
                    </View> */}
                </View>

                <FlatList
                    style={{ marginTop: 35 }}
                    data={cardInfo}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={styles.card}
                            onPress={() => goToNextScreen(item.onpress)}
                        >
                            <View style={styles.textContainer}>
                                <CardHeading>{item.title}</CardHeading>
                                <CardPara style={{ marginTop: 10 }}>
                                    {item.para}
                                </CardPara>
                            </View>
                            <View>
                                <Image
                                    source={item.img}
                                    style={{ width: 150, height: 100 }}
                                />
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </Screen>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.grey3,
        padding: 20
    },
    helloBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    helloText: {
        fontFamily: 'PublicSans-SemiBold',
        fontSize: 26
    },
    nextVaccineText: {
        fontFamily: 'PublicSans-Regular',
        fontSize: 11
    },
    nextVaccineContainer: {
        alignItems: 'flex-end'
    },
    card: {
        width: '100%',
        // height: 200,
        paddingVertical: 37,
        paddingHorizontal: 20,
        backgroundColor: colors.white,
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 30,
        marginBottom: 40
    },
    textContainer: {
        flex: 1,
        height: '100%',
        justifyContent: 'space-evenly'
        // width: 180,
    }
});

export default Home;
