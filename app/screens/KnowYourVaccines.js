import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Button, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import ParaText from '../components/ParaText';
import Screen from '../components/Screen';
import AppButton from '../components/AppButton';
import colors from '../constants/colors';
import { vaccineInfo } from '../constants/VaccineInfo';
import { useGetAllvaccines } from "../queries/Vaccines/getVaccines"
import LoadingScreen from '../components/LoadingScreen';

const KnowYourVaccines = ({ key }) => {
    const [selectedValue, setSelectedValue] = useState("");

    const getVaccines = useGetAllvaccines();

    useEffect(() => {
        if (selectedValue === "" && getVaccines.data) {
            setSelectedValue(getVaccines.data[0])
        }
    }, [getVaccines])

    if (getVaccines.isLoading) return <LoadingScreen />
    return (
        <Screen>
            <ScrollView>
            <View style={styles.container}>
                <ParaText
                    style={{ marginTop: 35, marginBottom: 20, fontSize: 12 }}
                >
                    Select the vaccine you want to know about.
                </ParaText>
                <View
                    style={{
                        backgroundColor: colors.grey3,
                        width: 160,
                        borderRadius: 10
                    }}
                >
                    <Picker
                        selectedValue={selectedValue.name}
                        style={{ height: 60, width: 160 }}
                        onValueChange={(itemValue, itemIndex) => {
                            console.log("SETTING SELECTED VACCINE TO ", itemValue, itemIndex)
                            setSelectedValue(getVaccines.data[itemIndex])
                        }
                        }
                    >
                        {getVaccines.data.map((item) => {
                            return (
                                <Picker.Item
                                    label={item.name}
                                    value={item.name}
                                    key={key}
                                />
                            );
                        })}
                    </Picker>
                </View>

                <View style={styles.bottom}>
                    <View style={styles.list}>
                        <ParaText style={styles.text}>Name</ParaText>
                            <ParaText style={styles.text2}>{selectedValue.name ?? ""}</ParaText>
                    </View>
                    <View style={styles.list}>
                        <ParaText style={styles.text}>Full Name</ParaText>
                        <ParaText style={styles.text2}>
                                {selectedValue.full_form ?? ""}
                        </ParaText>
                    </View>
                    <View style={styles.list}>
                        <ParaText style={styles.text}>
                            Age of Administration
                        </ParaText>
                        <ParaText style={styles.text2}>
                                {selectedValue.age ? selectedValue.age.join(", ") : ""}
                        </ParaText>
                    </View>
                    <View style={styles.list}>
                            <ParaText style={styles.text ?? ""}>
                           Doses
                        </ParaText>
                        <ParaText style={styles.text2}>
                                {selectedValue.doses ?? ""}
                        </ParaText>
                    </View>
                    <View style={styles.list}>
                        <ParaText style={styles.text}>
                           No of Doses
                        </ParaText>
                        <ParaText style={styles.text2}>
                                {selectedValue.noOFDoses ?? ""}
                        </ParaText>
                    </View>
                    <View style={styles.list}>
                        <ParaText style={styles.text}>
                        Mode
                        </ParaText>
                        <ParaText style={styles.text2}>
                                {selectedValue.mode ?? ""}
                        </ParaText>
                    </View>
                    <View style={styles.list}>
                        <ParaText style={styles.text}>
                        Body Part
                        </ParaText>
                        <ParaText style={styles.text2}>
                                {selectedValue.bodyPart ?? ""}
                        </ParaText>
                    </View>
                    <View style={styles.list}>
                        <ParaText style={styles.text}>
                        Fever
                        </ParaText>
                        <ParaText style={styles.text2}>
                                {selectedValue.fever ?? ""}
                        </ParaText>
                    </View>
                    <View style={styles.list}>
                        <ParaText style={styles.text}>
                        Pain
                        </ParaText>
                        <ParaText style={styles.text2}>
                                {selectedValue.pain ?? ""}
                        </ParaText>
                    </View>
                    <View style={styles.list}>
                        <ParaText style={styles.text}>
                        Disease
                        </ParaText>
                        <ParaText style={styles.text2}>
                                {selectedValue.disease ?? ""}
                        </ParaText>
                    </View>
                    <View style={styles.list}>
                        <ParaText style={styles.text}>
                        Side Effects
                        </ParaText>
                        <ParaText style={styles.text2}>
                                {selectedValue.effects ?? ""}
                        </ParaText>
                    </View>
                    <View style={styles.list}>
                        <ParaText style={styles.text}>
                        Efficacy
                        </ParaText>
                        <ParaText style={styles.text2}>
                                {selectedValue.efficacy ?? ""}
                        </ParaText>
                    </View>
                    <View style={styles.list}>
                        <ParaText style={styles.text}>
                        Brands
                        </ParaText>
                        <ParaText style={styles.text2}>
                                {selectedValue.brands ? selectedValue.brands.join(", ") : ""}
                        </ParaText>
                    </View>
                    <View style={styles.list}>
                        <ParaText style={styles.text}>
                        Compulsory
                        </ParaText>
                        <ParaText style={styles.text2}>
                                {selectedValue.compulsory ?? ""}
                        </ParaText>
                    </View>
                    <View style={styles.list}>
                        <ParaText style={styles.text}>
                        Other
                        </ParaText>
                        <ParaText style={styles.text2}>
                                {selectedValue.other ?? ""}
                        </ParaText>
                    </View>
                </View>
            </View>
            </ScrollView>
        </Screen>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    list: {
        flexDirection: 'row',
        backgroundColor: '#f3f3f3',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        marginBottom: 8,
        borderRadius: 5,
        height: 'auto'
        // overflow: 'hidden'
    },
    bottom: {
        marginTop: 25
    },
    text: {
        fontSize: 14,
        marginRight: 18,
        // width: 100,
        width: 80,
        flexWrap: 'wrap'
    },
    text2: {
        fontSize: 14,
        fontFamily: 'PublicSans-SemiBold',
        flex: 1,
        flexWrap: 'wrap'
    }
});

export default KnowYourVaccines;
