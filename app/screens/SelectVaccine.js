import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, TouchableOpacity, View, Text, Button } from 'react-native';
import ParaText from '../components/ParaText';
import ToggleButton from '../components/ToggleButton';
import AppButton from '../components/AppButton';
import { useGetVaccines } from "../queries/Vaccines/getVaccine";
import { useAddVaccine } from "../queries/Vaccines/addVaccines";
import { AppContext } from "../context/AppContext";
import { useGetUserMutate } from "../queries/Users/getUsersMutate"
import { useGetChildMutate } from "../queries/Child/getChildMutate"
import { useGetVaccinatedVaccines } from "../queries/Vaccines/getVaccinatedVaccines";
import { useRemoveVaccine } from "../queries/Vaccines/removeVaccine";
import { useQueryClient } from "react-query"
import colors from '../constants/colors';

const SelectVaccine = () => {
    const [selectedVaccine, setSelectedVaccine] = useState();
    const [isVacSelected, setIsVacSelected] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState("");
    const queryClient = useQueryClient();

    //for testing
    //START
    const age = 14 //age would come from previous page, assuming 14 here
    const vaccinatedVaccines = useGetVaccinatedVaccines({ child: { id: "2uW8KfSNufNUes7E5NI1" } });
    const getUser = useGetUserMutate();
    const getChild = useGetChildMutate();

    //END
    const getVac = useGetVaccines(age); //six is age in weeks it will return all vaccines that are to be admintrd at 6 weeks
    const addVaccine = useAddVaccine();
    const removeVaccine = useRemoveVaccine();
    // console.log("VACCINATED DATA", vaccinatedVaccines.data)

    const addVac = async (vaccine, brand) => {
        if (vaccine) {
            let load = {
                vaccine: vaccine,
                brand: brand,
                child: { id: "2uW8KfSNufNUes7E5NI1" },
                // age: age
            }
            const res = await addVaccine.mutateAsync(load);
            queryClient.invalidateQueries(["useGetVaccinatedVaccines"])
        }
    }

    const removeVac = async (vaccine) => {
        if (vaccine) {
            let load = {
                vaccine: vaccine,
                child: { id: "2uW8KfSNufNUes7E5NI1" },
                // age: age
            }
            const res = await removeVaccine.mutateAsync(load);
            setSelectedBrand("")
            setSelectedVaccine(undefined);
            queryClient.invalidateQueries(["useGetVaccinatedVaccines"])
        }
    }

    if (getVac.isLoading ||
        getUser.isLoading ||
        getChild.isLoading ||
        addVaccine.isLoading ||
        vaccinatedVaccines.isLoading
    ) return <View><Text>Loading...</Text></View>
    return (
        <View style={styles.container}>
            <ParaText style={{ marginTop: 35, marginBottom: 20, fontSize: 14 }}>Select Your Next Vaccine/Vaccines</ParaText>
            <View style={styles.vcontain}>
                {getVac.data.map((vac, i) => {
                    return (
                        <ToggleButton
                            onSelect={() => {
                                console.log("SELECTED VACCINE", selectedVaccine)
                                setSelectedVaccine(vac)
                                setSelectedBrand("")
                                // setIsVacSelected(selectedVaccine && selectedVaccine.id === vac.id || Boolean(vaccinatedVaccines.data.find((val) => val.vaccine === vac.id)))
                                const vacExist = vaccinatedVaccines.data.find((val) => val.vaccine === vac.id)
                                setIsVacSelected(Boolean(vacExist))
                                vacExist && setSelectedBrand(vacExist.brand)
                                console.log("IS VAC SELECTED", isVacSelected)
                                // console.log("SELECTED VACCINE -->", selectedVaccine)
                                // console.log("SELECTED BRAND --> ", selectedBrand)
                                // //remove
                                // if (selectedVaccine && selectedVaccine.id === vac.id) {
                                //     removeVac(selectedVaccine)
                                //     setSelectedVaccine(undefined);
                                //     setSelectedBrand("");
                                // }
                                // else {
                                //     console.log("VACCINATED VACCINES", vaccinatedVaccines.data);
                                //     let brand = vaccinatedVaccines.data.find(v => vac.id === v.vaccine)
                                //     //already have a selected one ?
                                //     if (selectedVaccine && selectedBrand) {
                                //         //if yes
                                //         //that means we are switching a vaccine
                                //         // in that case update current to DB
                                //         addVac(selectedVaccine, selectedBrand)
                                //         setSelectedBrand("")
                                //         setSelectedVaccine(vac)
                                //     } else {
                                //         setSelectedVaccine(vac)
                                //         console.log("HERE<",)
                                //     }
                                //     if (brand) {
                                //         setSelectedBrand(brand.brand)
                                //     }

                                // }
                            }}
                            selected={selectedVaccine && selectedVaccine.id === vac.id || Boolean(vaccinatedVaccines.data.find((val) => val.vaccine === vac.id))}
                            textData={vac.name}
                        />
                    )
                })}
            </View>
            <View style={styles.vcontain}>
                {selectedVaccine && selectedVaccine.brands.map((brand, i) => {
                    return (<ToggleButton
                        textData={brand}
                        onSelect={() => {
                            if (selectedBrand === brand) setSelectedBrand("");
                            else setSelectedBrand(brand)
                        }}
                        selected={selectedBrand && brand === selectedBrand}
                    />)
                })}
            </View>
            {/* <AppButton /> */}
            {!isVacSelected && <TouchableOpacity
                activeOpacity={0.8}
                style={styles.button}
                onPress={() => {
                    if (selectedVaccine && selectedBrand) addVac(selectedVaccine, selectedBrand)
                }}
            >
                <Text>Add </Text>
            </TouchableOpacity>}
            {isVacSelected && <View>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.button}
                    onPress={() => {
                        if (selectedVaccine && selectedBrand) removeVac(selectedVaccine, selectedBrand)
                    }}
                >
                    <Text>Remove </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.8}
                    onPress={() => {
                        if (selectedVaccine && selectedBrand) addVac(selectedVaccine, selectedBrand)
                    }}
                >
                    <Text>Update </Text>
                </TouchableOpacity>
            </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        height: 500,
    },
    vcontain: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
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
})

export default SelectVaccine
