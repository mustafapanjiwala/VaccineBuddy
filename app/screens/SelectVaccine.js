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
import LoadingScreen from "../components/LoadingScreen"
import { useUpdateChild } from "../queries/Child/updateChild"

const SelectVaccine = (props) => {
    const [selectedVaccine, setSelectedVaccine] = useState();
    const [isVacSelected, setIsVacSelected] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState("");
    const [nextScreen, setNextScreen] = useState("")
    const ctx = useContext(AppContext)
    const queryClient = useQueryClient();

    //for testing
    //START
    const age = props.route.params.age//age would come from previous page, assuming 14 here
    const givenOnDate = props.route.params.givenOnDate
    const vaccinatedVaccines = useGetVaccinatedVaccines({ child: ctx.child });
    // const getUser = useGetUserMutate();
    // const getChild = useGetChildMutate();

    //END
    const getVac = useGetVaccines(age); //six is age in weeks it will return all vaccines that are to be admintrd at 6 weeks
    const addVaccine = useAddVaccine();
    const removeVaccine = useRemoveVaccine();
    const updateChild = useUpdateChild()
    // console.log("VACCINATED DATA", vaccinatedVaccines.data)

    const addVac = async (vaccine, brand) => {
        if (vaccine) {
            let load = {
                vaccine: vaccine,
                brand: brand,
                child: ctx.child,
                givenOn: givenOnDate
                // age: age
            }
            const res = await addVaccine.mutateAsync(load);
            updateChild.mutateAsync({ id: ctx.child.id, data: { lastVaccinated: givenOnDate } })
                .then(() => {
                    //navigation.navigate("EditableTable")
                    //NAVGITION HERE
                })
                .catch(err => console.error("CATCHED IN selectVacicne.js", err))
            queryClient.invalidateQueries(["useGetVaccinatedVaccines"])
        }
    }

    const removeVac = async (vaccine) => {
        if (vaccine) {
            let load = {
                vaccine: vaccine,
                child: ctx.child,
                // age: age
            }
            const res = await removeVaccine.mutateAsync(load);
            setSelectedBrand("")
            setSelectedVaccine(undefined);
            queryClient.invalidateQueries(["useGetVaccinatedVaccines"])
        }
    }

    if (getVac.isLoading ||
        addVaccine.isLoading ||
        vaccinatedVaccines.isLoading ||
        updateChild.isLoading
    ) return <LoadingScreen />

    if (!props.route.age) props.navigation.navigate("AddVaccine")
    if (nextScreen) props.navigation.navigate(nextScreen)

    return (
        <View style={styles.container}>
            <ParaText style={{ marginTop: 35, marginBottom: 20, fontSize: 14 }}>Select Your Next Vaccine/Vaccines</ParaText>
            <View style={styles.vcontain}>
                {getVac.data.map((vac, i) => {
                    return (
                        <ToggleButton
                            onSelect={() => {
                                setSelectedVaccine(vac)
                                setSelectedBrand("")
                                // setIsVacSelected(selectedVaccine && selectedVaccine.id === vac.id || Boolean(vaccinatedVaccines.data.find((val) => val.vaccine === vac.id)))
                                // const vacExist = vaccinatedVaccines.data.find((val) => val.vaccine === vac.id)
                                // setIsVacSelected(Boolean(vacExist))
                                // vacExist && setSelectedBrand(vacExist.brand)
                            }}
                            // selected={selectedVaccine && selectedVaccine.id === vac.id || Boolean(vaccinatedVaccines.data.find((val) => val.vaccine === vac.id))}
                            selected={selectedVaccine && selectedVaccine.id === vac.id}
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
                            // if (selectedBrand === brand) setSelectedBrand("");
                            // else setSelectedBrand(brand)
                            setSelectedBrand(brand)
                            console.log("SELECTED BRANDS", selectedBrand)
                        }}
                        selected={selectedBrand && brand === selectedBrand}
                    />)
                })}
            </View>
            <AppButton onPress={() => {
                addVac(selectedVaccine, selectedBrand)
            }} />
            {/* {!isVacSelected && <TouchableOpacity
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
            </View>} */}
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
