import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import ParaText from '../components/ParaText';
import Screen from '../components/Screen';
import ToggleButton from '../components/ToggleButton';
import ToggleRadioButton from '../components/ToggleRadioButton';
import AppButton from '../components/AppButton';
import colors from '../constants/colors';
import { vaccineInfo } from '../constants/VaccineInfo';
import { useGetAllvaccines } from "../queries/Vaccines/getVaccines"

const KnowYourVaccines = ({ key }) => {
    const [selectedValue, setSelectedValue] = useState({ name: "", full_form: "", age: [""] });

    const getVaccines = useGetAllvaccines();

    if (getVaccines.isLoading) return <View><Text>Loading...</Text></View>
    return (
        <Screen>
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
                        <ParaText style={styles.text2}>{selectedValue.name}</ParaText>
                    </View>
                    <View style={styles.list}>
                        <ParaText style={styles.text}>Full Name</ParaText>
                        <ParaText style={styles.text2}>
                            {selectedValue.full_form}
                        </ParaText>
                    </View>
                    <View style={styles.list}>
                        <ParaText style={styles.text}>
                            Age of Administration
                        </ParaText>
                        <ParaText style={styles.text2}>
                            {selectedValue.age.join(", ")}
                        </ParaText>
                    </View>
                </View>
            </View>
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
