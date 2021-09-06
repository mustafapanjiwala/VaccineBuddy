import React, { useState, useEffect, useContext } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
    Button,
    ScrollView
} from 'react-native';
import ParaText from '../components/ParaText';
import ToggleButton from '../components/ToggleButton';
import AppButton2 from '../components/AppButton2';
import { Paragraph, Dialog, Portal, TextInput } from 'react-native-paper';
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
import DatePicker from '../components/DatePicker';
import { AppContext } from '../context/AppContext';
import LoadingScreen from '../components/LoadingScreen';
import { useAddTableToDB } from '../queries/Vaccines/addTableToDB';
/*
 *    TODO
 *   - [x] Fix font size and table size in PDF
 *   -[x] Duplicate detection and handling
 */

const mapData = (data, map) => {
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
                return uri;
            }
        }
    } catch (error) {
        console.error(error);
    }
};

const EditableVaccine = () => {
    const height = 30;
    const [visible, setVisible] = useState(false);
    const [newVal, setNewVal] = useState('');
    const [changeParams, setChangeParams] = useState();
    const [downloadedFileURI, setDownloadedFileURI] = useState();
    const ctx = useContext(AppContext);
    const addTableToDb = useAddTableToDB();

    //FOR TESTING
    //START
    const child = { id: '' };
    //END

    // const vaccinatedVaccines = useGetVaccinatedVaccines({ child: ctx.child });
    const vaccinatedVaccines = useGetVaccinatedVaccines({ child: ctx.child });

    const [vacs, setVacs] = useState([
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        20, 21, 22, 23, 24, 25, 26, 27, 28
    ]);

    const [dueOn, setDueOn] = useState([]);
    const [givenOn, setGivenOn] = useState([]);
    const [brands, setBrands] = useState([]);

    const [data, setData] = useState([]);

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
        // if (dueOn.length === 0 || givenOn.length === 0 || brands.length === 0) {
        if (data.length === 0) {
            if (vaccinatedVaccines.data) {
                // console.log("VACCINATE_VACCINS", vaccinatedVaccines.data)
                // (async () => console.log(await mapData(vaccinatedVaccines.data, vacs)))()
                const data = mapData(vaccinatedVaccines.data, vacs);
                // let due_on = [];
                // let given_on = [];
                // let brands = [];
                // data.forEach((d, i) => {
                //     if (d === '') {
                //         due_on.push('');
                //         given_on.push('');
                //         brands.push('');
                //     } else {
                //         due_on.push(d.dueOn)
                //         given_on.push(d.givenOn);
                //         brands.push(d.brand);
                //     }
                // });

                // console.log("DATA ", data)

                // setDueOn(due_on);
                // setGivenOn(given_on);
                // setBrands(brands);
                setData(data);
            }
        }
    }, [vaccinatedVaccines]);

    useEffect(() => {
        if (changeParams) {
            if (changeParams[0] === 'dueOn') {
                let temp = [...data];
                temp[changeParams[1]].dueOn = newVal;
                console.log(
                    'HERE2 ',
                    temp,
                    changeParams[1],
                    temp[changeParams[1]]
                );
                setChangeParams();
                setNewVal('');
                setData(temp);
            }
            if (changeParams[0] === 'givenOn') {
                let temp = [...data];
                temp[changeParams[1]].givenOn = newVal;
                setChangeParams();
                setNewVal('');
                setData(temp);
            }
            if (changeParams[0] === 'brands') {
                let temp = [...data];
                temp[changeParams[1]].brand = newVal;
                setChangeParams();
                setNewVal('');
                setData(temp);
            }
        }
        hideDialog();
    }, [data]);

    const hideDialog = () => setVisible(false);

    if (vaccinatedVaccines.isLoading || addTableToDb.isLoading) {
        return <LoadingScreen />;
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
                            givenOn
                            widthArr={[60, 110, 70, 70, 90]}
                        />
                        <TableWrapper style={{ flexDirection: 'row' }}>
                            <TableWrapper>
                                {state.age.map((data, i) => (
                                    <Cell
                                        width={60}
                                        height={
                                            state.vac_back[i].length * height
                                        }
                                        data={data}
                                    />
                                ))}
                            </TableWrapper>
                            <TableWrapper>
                                {state.vaccines.map((data) => (
                                    <Cell
                                        width={110}
                                        height={height}
                                        data={data}
                                    />
                                ))}
                            </TableWrapper>

                            <TableWrapper>
                                {data.map((data, i) => (
                                    <Cell
                                        width={70}
                                        height={height}
                                        data={
                                            <View>
                                                <Text
                                                    onPress={() => {
                                                        setChangeParams([
                                                            'dueOn',
                                                            i
                                                        ]);
                                                        setVisible(true);
                                                    }}
                                                >
                                                    {data.dueOn}
                                                </Text>
                                            </View>
                                        }
                                    />
                                ))}
                            </TableWrapper>
                            <TableWrapper>
                                {data.map((data, i) => (
                                    <Cell
                                        width={70}
                                        height={height}
                                        data={
                                            <View>
                                                <Text
                                                    onPress={() => {
                                                        setChangeParams([
                                                            'givenOn',
                                                            i
                                                        ]);
                                                        setVisible(true);
                                                    }}
                                                >
                                                    {data.givenOn}
                                                </Text>
                                            </View>
                                        }
                                    />
                                ))}
                            </TableWrapper>
                            <TableWrapper>
                                {data.map((data, i) => (
                                    <Cell
                                        width={90}
                                        height={height}
                                        data={
                                            <View>
                                                <Text
                                                    onPress={() => {
                                                        setChangeParams([
                                                            'brands',
                                                            i
                                                        ]);
                                                        setVisible(true);
                                                    }}
                                                >
                                                    {data.brand}
                                                </Text>
                                            </View>
                                        }
                                    />
                                ))}
                            </TableWrapper>
                            {/* <TableWrapper>
                                {dueOn.map((data, i) => <Cell width={70} height={height} data={<View ><Text onPress={() => {
                                    setChangeParams(["dueOn", i])
                                    setVisible(true)
                                }}>{data}</Text></View>} />)}
                            </TableWrapper>

                            <TableWrapper>
                                {givenOn.map((data, i) => <Cell width={70} height={height} data={<View><Text onPress={() => {
                                    setChangeParams(["givenOn", i])
                                    setVisible(true)
                                }}>{data}</Text></View>} />)}

                            </TableWrapper>

                            <TableWrapper>
                                {brands.map((data, i) => <Cell width={90} height={height} data={<View><Text onPress={() => {
                                    setChangeParams(["brands", i])
                                    setVisible(true)
                                }}>{data}</Text></View>} />)}
                            </TableWrapper> */}
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
                        const that = await createAndSavePDF(table);
                        setDownloadedFileURI(that);
                    }}
                />
                <AppButton2
                    title="Update"
                    name="rotate-cw"
                    onPress={async () => {
                        console.log('ADDDING TO DB ', data);
                        data.map((d) => {
                            d !== '' &&
                                addTableToDb.mutate({
                                    id: ctx.child.id,
                                    data: d
                                });
                        });
                    }}
                />
                <Portal>
                    <Dialog visible={visible} onDismiss={hideDialog}>
                        <Dialog.Title>Enter new value</Dialog.Title>
                        <Dialog.Content>
                            {changeParams && changeParams[0] === 'brands' ? (
                                <TextInput
                                    label="New Value"
                                    value={newVal}
                                    mode={'outlined'}
                                    outlineColor={'#E2E2E2'}
                                    // selectionColor={'#E2E2E2'}
                                    onChangeText={setNewVal}
                                />
                            ) : (
                                <DatePicker
                                    datecb={(date) => {
                                        setNewVal(date);
                                    }}
                                />
                            )}
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button
                                onPress={() => {
                                    if (changeParams) {
                                        console.log(data[changeParams[1]]);
                                        if (data[changeParams[1]] === '') {
                                            console.log('CONDITION TRUE');
                                            let temp = [...data];
                                            console.log(
                                                'HERE ',
                                                temp,
                                                changeParams[1],
                                                temp[changeParams[1]]
                                            );
                                            temp[changeParams[1]] = {
                                                id: vacs[changeParams[1]],
                                                dueOn: '',
                                                givenOn: '',
                                                brand: ''
                                            };
                                            setData(temp);
                                        } else {
                                            if (changeParams[0] === 'dueOn') {
                                                let temp = [...data];
                                                temp[changeParams[1]].dueOn =
                                                    newVal;
                                                console.log(
                                                    'HERE2 ',
                                                    temp,
                                                    changeParams[1],
                                                    temp[changeParams[1]]
                                                );
                                                setChangeParams();
                                                setNewVal('');
                                                setData(temp);
                                            }
                                            if (changeParams[0] === 'givenOn') {
                                                let temp = [...data];
                                                temp[changeParams[1]].givenOn =
                                                    newVal;
                                                setChangeParams();
                                                setNewVal('');
                                                setData(temp);
                                            }
                                            if (changeParams[0] === 'brands') {
                                                let temp = [...data];
                                                temp[changeParams[1]].brand =
                                                    newVal;
                                                setChangeParams();
                                                setNewVal('');
                                                setData(temp);
                                            }
                                        }
                                        // if (changeParams[0] === "dueOn") {
                                        //     let temp = [...data]
                                        //     temp[changeParams[1]].dueOn = newVal;
                                        //     console.log("HERE2 ", temp, changeParams[1], temp[changeParams[1]])
                                        //     // setData(temp)
                                        // }
                                        // if (changeParams[0] === "givenOn") {
                                        //     let temp = [...data]
                                        //     temp[changeParams[1]].givenOn = newVal;
                                        //     setData(temp)
                                        // }
                                        // if (changeParams[0] === "brands") {
                                        //     let temp = [...data]
                                        //     temp[changeParams[1]].brand = newVal
                                        //     setData(temp)
                                        // }
                                        // setChangeParams()
                                        // setNewVal("")
                                    }
                                    // hideDialog()
                                }}
                                title="Ok"
                            >
                                Done
                            </Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
                <Portal>
                    <Dialog
                        visible={downloadedFileURI}
                        onDismiss={() => setDownloadedFileURI()}
                    >
                        <Dialog.Title>Enter new value</Dialog.Title>
                        <Dialog.Content>
                            <ParaText>
                                Your File has been downloaded to:{' '}
                                {downloadedFileURI}
                            </ParaText>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button
                                onPress={() => {
                                    setDownloadedFileURI();
                                }}
                                title="Ok"
                            >
                                Done
                            </Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
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
