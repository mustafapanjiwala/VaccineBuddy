import React, { useState, useEffect, useContext } from 'react';
import { useQueryClient } from "react-query"
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
import * as FileSystem from 'expo-file-system';
/*
 *    TODO
 *   - [x] Fix font size and table size in PDF
 *   -[x] Duplicate detection and handling
 */

const mapData = (data, map) => {
    let count = 0;
    let filled_data = map.map((_, i) => {
        console.log("IN MAP ", Boolean(data[count]), data[count].id, i, data[count].id === i.toString())
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

          await Sharing.shareAsync(uri)
            .catch((err) => console.log('Sharing::error', err))

        console.log('URI ', uri);
        if (Platform.OS === 'ios') {
            const UTI = 'public.pdf';
            Sharing.shareAsync(downloadedFile.uri, { UTI }).then(() => {
                alert("File Downloaded !")
            }).catch(err => {
                console.log("ERror downloading file, editabletable.js", err)
                alert("Download Failed")
            })

        } else {
            const permission = await MediaLibrary.requestPermissionsAsync();

            if (permission.granted) {
                // const filename = "VaccineChart.pdf"
                // const fileUri = `${FileSystem.documentDirectory}${filename}`;
                // const downloadedFile = await FileSystem.downloadAsync(uri, fileUri);
                try {
                    const asset = await MediaLibrary.createAssetAsync(uri);
                    const album = await MediaLibrary.getAlbumAsync('Download');
                    if (album == null) {
                        await MediaLibrary.createAlbumAsync('Download', asset, false);
                    } else {
                        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
                    }
                    alert("File Downloaded !")
                } catch (e) {
                    setError("Failed To Download Image")
                    console.log("DOWNLOAD ERROR Table PDF, ", e)
                }
            } else alert("Need Permissions to download file")
        }
    } catch (error) {
        console.error(error);
    }
};

const EditableVaccine = ({ navigation }) => {
    const queryClient = useQueryClient();
    // const unSubscribe = navigation.addListener("focus", async () => {
    //     if (ctx.isUpdated) {

    //     }
    // })

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
    // const vaccinatedVaccines = useGetVaccinatedVaccines({ child: ctx.child });
    const vaccinatedVaccines = useGetVaccinatedVaccines()

    const [vacs, setVacs] = useState([
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37
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
            '9 Months',
            '9-12 Months',
            '12 Months',
            '15 Months',
            '16-18 Months',
            '18 Months',
            '2 Years',
            '4-6 Years',
            '10-12 Years'
        ],
        vaccines: [
            'BCG',
            'OPV 0',
            'Hep-B 1',
            'DTwP 1',
            'IPV 1',
            'Hep-B 2',
            'Hib 1',
            'Rotavirus 1',
            'PCV 1',
            'DTwP 2',
            'IPV 2',
            'Hib 2',
            'Rotavirus 2',
            'PCV 2',
            'DTwP 3',
            'IPV 3',
            'Hib 3',
            'Rotavirus 3',
            'PCV 3',
            'OPV 1',
            'Hep-B 3',
            'OPV 2',
            'MMR 1',
            'TCV',
            'Hep-A 1',
            'MMR 2',
            'Varicella 1',
            'PCV Booster',
            'DTwP B 1/ DTaP B 1',
            'IPV B 1',
            "Hib B 1",
            "Hep-A 2",
            'Typhoid Booster',
            'DTwP B 2 / DTaP B 2',
            'OPV 3',
            'Varicella 2',
            'Tdap/Td',
            'HPV'
        ],
        test: [
            [0, 1, 2],
            [3, 4, 5, 6, 7, 8],
            [9, 10, 11, 12, 13],
            [14, 15, 16, 17, 18],
            [19, 20],
            [21, 22],
            [23],
            [24],
            [25, 26, 27],
            [28, 29, 30],
            [31],
            [32],
            [33, 34, 35]
            [36, 37]
        ],
        vac_back: [
            ['BCG', 'OPV 0', 'Hep-B 1'],
            ['DTwP 1', 'IPV 1', 'Hep-B 2', 'Hib 1', 'Rotavirus 1', 'PCV 1'],
            ['DTwP 2', 'IPV 2', 'Hib 2', 'Rotavirus 2', 'PCV 2'],
            ['DTwP 3', 'IPV 3', 'Hib 3', 'Rotavirus 3', 'PCV 3'],
            ['OPV 1', 'Hep-B 3'],
            ['OPV 2', 'MMR 1'],
            ['TCV'],
            ['Hep-A 1'],
            ['MMR 2', 'Varicella 1', 'PCV Booster'],
            ['DTwPB1 / DTaPB1', 'IPV B1', 'Hib B1'],
            ['Hep-A 2'],
            ['Typhoid Booster'],
            ['DTwP B2/DTaP B2', 'OPV 3', 'Varicella 2'],
            ['Tdap/Td', 'HPV']
        ]
    });

    const unSub = navigation.addListener('focus', async () => {
        const vacVacines = await vaccinatedVaccines.mutateAsync({ child: ctx.child })
        // console.log("VACCAVINES", vacVacines)
        const data = mapData(vacVacines, vacs);
        setData(data);
    })

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
            <View style={styles.container}>
                <ScrollView>
                <ScrollView horizontal>
                <View style={{width: 600}}>
                <Table
                    style={{ flexDirection: 'row'}}
                    borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}
                >
                    {/* Left Wrapper */}
                    <TableWrapper>
                        {/* <Cell data="Age" style={styles.singleHead} /> */}
                        <Row
                            style={{ backgroundColor: '#79D1D7'}}
                            data={[
                                'AGE',
                                'VACCINES',
                                'Due Date',
                                'Given on',
                                'Brand Name'
                            ]}
                            givenOn
                            widthArr={[80, 130, 110, 110, 110]}
                        />
                        <TableWrapper style={{ flexDirection: 'row' }}>
                            <TableWrapper>
                                {state.age.map((data, i) => (
                                    <Cell
                                        width={80}
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
                                        width={130}
                                        height={height}
                                        data={data}
                                    />
                                ))}
                            </TableWrapper>

                            <TableWrapper>
                                    {data.map((data, i) => {
                                        console.log("DUUON ", data.dueOn)
                                        return (
                                    <Cell
                                        width={110}
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
                                        )
                                    })}
                            </TableWrapper>
                            <TableWrapper>
                                {data.map((data, i) => (
                                    <Cell
                                        width={110}
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
                                        width={110}
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
                </ScrollView>
            <View style={styles.Appbtn}>
                <AppButton2
                    title="Share"
                    name="share"
                    onPress={async () => {
                        console.log("PDF ", data)
                        const table = createTable(
                            state.age,
                            state.vac_back,
                            data
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
                            <Button onPress={() => {
                                if (changeParams) {
                                    console.log(data[changeParams[1]])
                                    if (data[changeParams[1]] === "") {
                                        console.log("CONDITION TRUE")
                                        let temp = [...data]
                                        console.log("HERE ", temp, changeParams[1], temp[changeParams[1]])
                                        temp[changeParams[1]] = {
                                            id: vacs[changeParams[1]],
                                            dueOn: "",
                                            givenOn: "",
                                            brand: ""
                                        };
                                        setData(temp)
                                    } else {
                                        if (changeParams[0] === "dueOn") {
                                            let temp = [...data]
                                            temp[changeParams[1]].dueOn = newVal;
                                            console.log("HERE2 ", temp, changeParams[1], temp[changeParams[1]])
                                            setChangeParams()
                                            setNewVal("")
                                            setData(temp)
                                        }
                                        if (changeParams[0] === "givenOn") {
                                            let temp = [...data]
                                            temp[changeParams[1]].givenOn = newVal;
                                            setChangeParams()
                                            setNewVal("")
                                            setData(temp)
                                        }
                                        if (changeParams[0] === "brands") {
                                            let temp = [...data]
                                            temp[changeParams[1]].brand = newVal
                                            setChangeParams()
                                            setNewVal("")
                                            setData(temp)
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
                                }
                            }
                        }
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
            </View>
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
    Appbtn: { 
        display: 'flex',
        flexDirection: 'row-reverse',
        justifyContent: 'space-evenly',
        marginVertical: 25 
    },
    btnText: { 
        textAlign: 'center'
     }
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
