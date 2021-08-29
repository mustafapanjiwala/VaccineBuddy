import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    Button,
    ScrollView
} from 'react-native';
import ParaText from '../components/ParaText';
import ToggleButton from '../components/ToggleButton';
import AppButton2 from '../components/AppButton2';
import {
    Table,
    TableWrapper,
    Row,
    Rows,
    Col,
    Cell,
    Cols
} from 'react-native-table-component';
import { useGetVaccinatedVaccines } from '../queries/Vaccines/getVaccinatedVaccines';
import * as Print from 'expo-print';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import { createTable } from './Table';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

/*
 *    TODO
 *   - [x] Fix font size and table size in PDF
 *   -[x] Duplicate detection and handling
 */

const mapData = (data, map) => {
    // return new Promise((resolve, rejet) => {
    let count = 0;
    let filled_data = map.map((_, i) => {
        if (Boolean(data[count]) && data[count].id === i.toString()) {
            return data[count++];
        } else {
            return '';
        }
    });
    let arr = [];
    filled_data.forEach((d, i) => {
        arr[map[i]] = d;
    });
    return arr;
    // resolve("MOTHER FUCKER")
    // })
};

const createAndSavePDF = async (html) => {
    try {
        const { uri } = await Print.printToFileAsync({
            html,
            width: 400,
            height: 1000
        });
        console.log('URI ', uri);
        if (Platform.OS === 'ios') {
            await Sharing.shareAsync(uri);
        } else {
            const permission = await MediaLibrary.requestPermissionsAsync();

            if (permission.granted) {
                await MediaLibrary.createAssetAsync(uri);
            }
        }
    } catch (error) {
        console.error(error);
    }
};

const EditableVaccine = () => {
    const height = 30;

    //FOR TESTING
    //START
    const child = { id: '2uW8KfSNufNUes7E5NI1' };
    //END

    const vaccinatedVaccines = useGetVaccinatedVaccines({ child });

    const [vacs, setVacs] = useState([
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        20, 21, 22, 23, 24, 25, 26, 27, 28
    ]);

    const [dueOn, setDueOn] = useState([]);
    const [givenOn, setGivenOn] = useState([]);
    const [brands, setBrands] = useState([]);

    const [state, setState] = useState({
        age: [
            'Birth',
            '6 Weeks',
            '10 Weeks',
            '14 Weeks',
            '6 Months',
            '5 Years'
        ],
        vaccines: [
            'BCG',
            'HB 1',
            'OPV 0',
            'DTwP/DTaP 1',
            'HiB 1',
            'IPV 1',
            'HB 2',
            'PCV 1',
            'Rota 1',
            'DTwP/DTaP 2',
            'HiB 2',
            'IPV 2',
            'HB 3',
            'PCV 2',
            'Rota 2',
            'DTwP/DTaP 3',
            'HiB 3',
            'IPV 3',
            'HB 4',
            'PCV 3',
            'Rota 3',
            'TCV',
            'Influenza',
            'Year 1 Dose 1',
            'Year 2 Dose 2',
            'Year 3',
            'Year 4',
            'Year 5'
        ],
        vac_back: [
            ['BCG', 'HB 1', 'OPV 0'],
            ['DTwP/DTaP 1', 'HiB 1', 'IPV 1', 'HB 2', 'PCV 1', 'Rota 1'],
            ['DTwP/DTaP 2', 'HiB 2', 'IPV 2', 'HB 3', 'PCV 2', 'Rota 2'],
            ['DTwP/DTaP 3', 'HiB 3', 'IPV 3', 'HB 4', 'PCV 3', 'Rota 3'],
            ['TCV'],
            [
                'Influenza',
                'Year 1 Dose 1',
                'Year 2 Dose 2',
                'Year 3',
                'Year 4',
                'Year 5'
            ]
        ]
    });

    useEffect(() => {
        if (dueOn.length === 0 || givenOn.length === 0 || brands.length === 0) {
            if (vaccinatedVaccines.data) {
                // console.log("VACCINATE_VACCINS", vaccinatedVaccines.data)
                // (async () => console.log(await mapData(vaccinatedVaccines.data, vacs)))()
                const data = mapData(vaccinatedVaccines.data, vacs);
                let due_on = [];
                let given_on = [];
                let brands = [];
                data.forEach((d, i) => {
                    if (d === '') {
                        due_on.push('');
                        given_on.push('');
                        brands.push('');
                    } else {
                        due_on.push(d.due_on.toLocaleDateString());
                        given_on.push(d.given_on.toLocaleDateString());
                        brands.push(d.brand);
                    }
                });

                setDueOn(due_on);
                setGivenOn(given_on);
                setBrands(brands);

                // console.log("SETTING STATES --_> ", dueOn, givenOn, brands)
            }
        }
    }, [vaccinatedVaccines]);

    if (vaccinatedVaccines.isLoading) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Table
                    style={{ flexDirection: 'row' }}
                    borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}
                >
                    {/* Left Wrapper */}
                    <TableWrapper style={{ width: 80 }}>
                        {/* <Cell data="Age" style={styles.singleHead} /> */}
                        <Row
                            style={{ backgroundColor: '#c8e1ff' }}
                            data={[
                                'AGE',
                                'VACCINES',
                                'Due Date',
                                'Given on',
                                'Brand Name'
                            ]}
                            widthArr={[60, 110, 70, 70, 90]}
                        />
                        <TableWrapper style={{ flexDirection: 'row' }}>
                            <Col
                                data={state.age}
                                style={styles.head}
                                heightArr={state.vac_back.map(
                                    (v) => v.length * height
                                )}
                                width={60}
                                textStyle={styles.text}
                            />
                            <Col
                                data={state.vaccines}
                                style={styles.title}
                                height={height}
                                width={110}
                                textStyle={styles.titleText}
                            ></Col>
                            <Col
                                data={dueOn}
                                style={styles.title}
                                height={height}
                                width={70}
                                textStyle={styles.titleText}
                            ></Col>
                            <Col
                                data={givenOn}
                                style={styles.title}
                                height={height}
                                width={70}
                                textStyle={styles.titleText}
                            ></Col>
                            <Col
                                data={brands}
                                style={styles.title}
                                height={height}
                                width={90}
                                textStyle={styles.titleText}
                            ></Col>
                        </TableWrapper>
                    </TableWrapper>
                </Table>
            </View>
            <View style={styles.Appbtn}>
                <AppButton2
                    title="Download"
                    name="download"
                    onPress={async () => {
                        const table = createTable(
                            state.age,
                            state.vac_back,
                            dueOn,
                            givenOn,
                            brands
                        );
                        // console.log(table)
                        await createAndSavePDF(table);
                    }}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 30,
        backgroundColor: '#fff'
    },
    singleHead: { width: 80, height: 40, backgroundColor: '#c8e1ff' },
    head: { backgroundColor: '#c8e1ff' },
    title: { backgroundColor: '#f6f8fa' },
    titleText: { marginRight: 6, textAlign: 'center' },
    text: { textAlign: 'center' },
    btn: {
        width: 58,
        height: 18,
        marginLeft: 15,
        backgroundColor: '#c8e1ff',
        borderRadius: 2
    },
    Appbtn: { alignSelf: 'center', marginVertical: 20 },
    btnText: { textAlign: 'center' }
});
// const styles = StyleSheet.create({
//     container: {
//         padding: 20,
//         height: 500,
//     },
//     vcontain: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         justifyContent: 'flex-start',
//         alignItems: 'center',
//     }
// })

export default EditableVaccine;
