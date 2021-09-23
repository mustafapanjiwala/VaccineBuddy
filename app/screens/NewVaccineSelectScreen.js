import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Button } from 'react-native';
import ParaText from '../components/ParaText';
import ToggleButton from '../components/ToggleButton';
import AppButton from '../components/AppButton';
import { useGetVaccines } from '../queries/Vaccines/getVaccine';
import { useAddVaccine } from '../queries/Vaccines/addVaccines';
import { AppContext } from '../context/AppContext';
import { useGetUserMutate } from '../queries/Users/getUsersMutate';
import { useGetChildMutate } from '../queries/Child/getChildMutate';
import { useGetVaccinatedVaccines } from '../queries/Vaccines/getVaccinatedVaccines';
import { useRemoveVaccine } from '../queries/Vaccines/removeVaccine';
import { useQueryClient } from 'react-query';
import colors from '../constants/colors';
import LoadingScreen from '../components/LoadingScreen';
import { useUpdateChild } from '../queries/Child/updateChild';


export const NewVaccineSelectScreen = (props) => {
    const [selectedBrands, setSelectedBrands] = useState([]);

    return <View style={styles.container}>
        {props.route.params.data.map((d, VacIndex) => {
            return (
                <View>
                    <ParaText style={{ marginTop: 35, marginBottom: 20, fontSize: 14 }}>
                        {d.name}
                    </ParaText>
                    <View style={styles.vcontain}>
                        {d.brands.map((vac, i) => {
                            return (
                                <ToggleButton
                                    onSelect={() => {
                                        let temp = [...selectedBrands]
                                        temp[VacIndex] = vac
                                        setSelectedBrands(temp)
                                        console.log("FATER SETTING ", selectedBrands)
                                        // setSelectedBrand('');
                                        // setIsVacSelected(selectedVaccine && selectedVaccine.id === vac.id || Boolean(vaccinatedVaccines.data.find((val) => val.vaccine === vac.id)))
                                        // const vacExist = vaccinatedVaccines.data.find((val) => val.vaccine === vac.id)
                                        // setIsVacSelected(Boolean(vacExist))
                                        // vacExist && setSelectedBrand(vacExist.brand)
                                    }}
                                    // selected={selectedVaccine && selectedVaccine.id === vac.id || Boolean(vaccinatedVaccines.data.find((val) => val.vaccine === vac.id))}
                                    selected={
                                        selectedBrands.length > 0 && selectedBrands[VacIndex] == vac
                                    }
                                    textData={vac}
                                />
                            );
                        })}
                    </View>
                </View>
            )
        })}

        <AppButton
            onPress={() => {
                console.log("BOTH SELECTED ", selectedBrand, selectedVaccine)
                addVac(selectedVaccine, selectedBrand).then(() => {
                    props.navigation.navigate('Editable');

                })
                    .catch(err => alert("Failed to add Vaccine"));
            }}
        />
    </View>
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        height: 500
    },
    vcontain: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    button: {
        backgroundColor: colors.primary,
        width: 80,
        height: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginVertical: 15
    }
});

