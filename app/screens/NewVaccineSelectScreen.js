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
import { callUpdateDueDates } from "../queries/Vaccines/helpers/callUpdateDueDates"
import { ScrollView } from 'react-native-gesture-handler';

import moment from 'moment';
import ErrorScreen from '../components/ErrorScreen';

export const NewVaccineSelectScreen = (props) => {
    const givenOnDate = props.route.params.givenOnDate;
    const vaccine = props.route.params.data
    const [selectedBrands, setSelectedBrands] = useState([]);
    const addVaccine = useAddVaccine();
    const updateChild = useUpdateChild();
    const queryClient = useQueryClient();
    const [isError, setIsError] = useState(false)
    const [manLoading, setManLoading] = useState(false)
    const ctx = useContext(AppContext);
    const addVac = async () => {
        if (vaccine) {
            const promiseArr = vaccine.map(async (vac, vacI) => {
                let load = {
                    vaccine: vac,
                    brand: selectedBrands[vacI],
                    child: ctx.child,
                    givenOn: givenOnDate
                    // age: age
                };
                // console.log("ADDING ACCINE ")
                return addVaccine.mutateAsync(load);
            })
            // console.log("ISGREATER", givenOnDate, ctx.child.lastVaccinated, givenOnDate > moment(ctx.child.lastVaccinated, "DD/MM/YYYY").format("DD/MM/YYYY"))
            if (ctx.child.lastVaccinated == "" || givenOnDate > moment(ctx.child.lastVaccinated, "DD/MM/YYYY").format("DD/MM/YYYY")) updateChild.mutateAsync({
                id: ctx.child.id,
                data: { lastVaccinated: givenOnDate ?? '' }
            })
                .then(() => {
                    //NAVGITION HERE
                    ctx.setIsUpdated(true);
                })
                .catch((err) =>
                    console.error('CATCHED IN selectVacicne.js', err)
                );
            setManLoading(true)
            return Promise.all(promiseArr).then(res => {
                callUpdateDueDates(ctx.child.id).then(res => res.json)
                    .then(res => {
                        if (res.error) setIsError(true)
                        setManLoading(false)
                    })
            }).catch((error) => {
                setIsError(true)
                console.error("CATCHED IN NEWVACCINESELECTSCREEN", error)
            })
            queryClient.invalidateQueries(['useGetVaccinatedVaccines']);
        }
    };
    if (addVaccine.isLoading || updateChild.isLoading || manLoading) return <LoadingScreen />
    if (isError) return <ErrorScreen />
    return <View style={styles.container}>
        <ScrollView>
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
                    addVac().then(() => {
                        // props.navigation.navigate('Editable');
                        props.navigation.navigate("EditableTable")
                    })
                        .catch(err => { setIsError(true); console.error("FAILED TO ADD VACCINE: ", err) });
                }}
            />
        </ScrollView>
    </View>
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1
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

