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
import { callUpdateDueDates } from "../queries/Vaccines/helpers/callUpdateDueDates"
import ErrorScreen from '../components/ErrorScreen';
import { useGetOrder } from "../queries/order/getOrder"
import { useGetAllvaccines } from "../queries/Vaccines/getVaccines"


const mapData = (data, map) => {
    // let count = 0;
    // let filled_data = map.map((_, i) => {
    //     if (Boolean(data[count]) && data[count].id === i.toString()) {
    //         return data[count++];
    //     } else {
    //         return '';
    //     }
    // });
    let arr = [];
    // console.log("IN MAP", data, map)
    map.forEach((m, i) => {
        arr[i] = data[m];
    });
    // console.log("ARR", arr)
    return arr;
};

const createAndSavePDF = async (html) => {
    try {
        const { uri } = await Print.printToFileAsync({
            html,
            width: 700,
            height: 1000
        });

        await Sharing.shareAsync(uri)
            .catch((err) => console.log('Sharing::error', err))

        //     console.log('URI ', uri);
        //     if (Platform.OS === 'ios') {
        //         const UTI = 'public.pdf';
        //         Sharing.shareAsync(downloadedFile.uri, { UTI }).then(() => {
        //             alert("File Downloaded !")
        //         }).catch(err => {
        //             console.log("ERror downloading file, editabletable.js", err)
        //             alert("Download Failed")
        //         })

        //     } else {
        //         const permission = await MediaLibrary.requestPermissionsAsync();

        //         if (permission.granted) {
        //             // const filename = "VaccineChart.pdf"
        //             // const fileUri = `${FileSystem.documentDirectory}${filename}`;
        //             // const downloadedFile = await FileSystem.downloadAsync(uri, fileUri);
        //             try {
        //                 const asset = await MediaLibrary.createAssetAsync(uri);
        //                 const album = await MediaLibrary.getAlbumAsync('Download');
        //                 if (album == null) {
        //                     await MediaLibrary.createAlbumAsync('Download', asset, false);
        //                 } else {
        //                     await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
        //                 }
        //                 alert("File Downloaded !")
        //             } catch (e) {
        //                 setError("Failed To Download Image")
        //                 console.log("DOWNLOAD ERROR Table PDF, ", e)
        //             }
        //         } else alert("Need Permissions to download file")
        //     }
    } catch (error) {
        console.error(error);
    }
};


const EditableVaccine = ({ navigation }) => {
    const orderQuery = useGetOrder();

    const height = 30;
    const [visible, setVisible] = useState(false);
    const [newVal, setNewVal] = useState('');
    const [changeParams, setChangeParams] = useState();
    const [downloadedFileURI, setDownloadedFileURI] = useState();
    const ctx = useContext(AppContext);
    const addTableToDb = useAddTableToDB();
    const [manLoading, setManLoading] = useState(false)
    const [isError, setError] = useState(false)
    const getAllVaccines = useGetAllvaccines();

    const [vacs, setVacs] = useState([]);
    const [data, setData] = useState([]);
    const [orderLoading, setOrderLoading] = useState(true);
    const [orderData, setOrderData] = useState([]);
    const [age, setAge] = useState([]);
    const [vaccines, setVaccines] = useState([])

    const vaccinatedVaccines = useGetVaccinatedVaccines()

    useEffect(() => {
        if (orderQuery.data) {
            const order = orderQuery.data.serial;
            const gonnaBeVacs = order.reduce((prev, curr) => {
                return ({ section: [...prev.section, ...curr.section] })
            }).section
            setOrderData(order);
            setVacs(gonnaBeVacs)
            setAge(order.map(d => d.age))
        }
    }, [orderQuery.data])

    useEffect(() => {
        (async () => {
            if (vacs.length > 0) {
                if (data.length == 0) {
                    const vacVaccines = await vaccinatedVaccines.mutateAsync({ child: ctx.child });
                    const mappedData = mapData(vacVaccines, vacs);
                    setData(mappedData);
                }
                if (vaccines.length == 0) {
                    const mappedData = mapData(getAllVaccines.data.map(d => ({ name: d.name, id: d.s_no })), vacs)
                    // console.log("SETTING MAPPED DATA", getAllVaccines.data.length, mappedData.length)
                    setOrderLoading(false);
                    setVaccines(mappedData);
                }
            }
        })();
    }, [vacs, getAllVaccines.data])



    useEffect(() => {
        if (changeParams) {
            if (changeParams[0] === 'dueOn') {
                let temp = [...data];
                temp[changeParams[1]].dueOn = newVal;

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

    if (getAllVaccines.isLoading || orderQuery.isLoading || vaccinatedVaccines.isLoading || addTableToDb.isLoading || manLoading || orderLoading) {
        return <LoadingScreen />;
    }
    if (isError) return <ErrorScreen />
    return (
        <View style={styles.container}>
            <ScrollView>
                <ScrollView horizontal>
                    <View style={{ width: 600 }}>
                        <Table
                            style={{ flexDirection: 'row' }}
                            borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}
                        >
                            {/* Left Wrapper */}
                            <TableWrapper>
                                {/* <Cell data="Age" style={styles.singleHead} /> */}
                                <Row
                                    style={{ backgroundColor: '#79D1D7' }}
                                    data={[
                                        'AGE',
                                        'VACCINES',
                                        'Due Date',
                                        'Given on',
                                        'Brand Name'
                                    ]}
                                    givenOn
                                    widthArr={[100, 150, 110, 110, 110]}
                                />
                                <TableWrapper style={{ flexDirection: 'row' }}>
                                    <TableWrapper>
                                        {age.map((data, i) => (
                                            <Cell
                                                width={100}
                                                height={
                                                    orderQuery.data.serial[i].section.length * height
                                                }
                                                data={data ?? ""}
                                            />
                                        ))}
                                    </TableWrapper>
                                    <TableWrapper>
                                        {vaccines.map((d, i) => (
                                            <Cell
                                                style={data[i] && data[i].givenOn ? styles.green : styles.red}
                                                width={150}
                                                height={height}
                                                data={d && d.name ? d.name : ""}
                                            />
                                        ))}
                                    </TableWrapper>

                                    <TableWrapper>
                                        {data.map((d, i) => {
                                            return (
                                                <Cell
                                                    style={data[i] && data[i].givenOn ? styles.green : styles.red}
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
                                                                {d && d.dueOn ? d.dueOn : ""}
                                                            </Text>
                                                        </View>
                                                    }
                                                />
                                            )
                                        })}
                                    </TableWrapper>
                                    <TableWrapper>
                                        {data.map((d, i) => (
                                            <Cell
                                                style={data[i] && data[i].givenOn ? styles.green : styles.red}
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
                                                            {d && d.givenOn ? d.givenOn : ""}
                                                        </Text>
                                                    </View>
                                                }
                                            />
                                        ))}
                                    </TableWrapper>
                                    <TableWrapper>
                                        {data.map((d, i) => (
                                            <Cell
                                                style={data[i] && data[i].givenOn ? styles.green : styles.red}
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
                                                            {d && d.brand ? d.brand : ""}
                                                        </Text>
                                                    </View>
                                                }
                                            />
                                        ))}
                                    </TableWrapper>
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
                            const table = createTable(
                                orderData,
                                data,
                                vaccines
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
                            const promiseArr = data.map((d) => {
                                return d !== '' ?
                                    addTableToDb.mutate({
                                        child: ctx.child,
                                        id: ctx.child.id,
                                        data: d
                                    }) : ''
                            });
                            // Promise.all(promiseArr.filter(v => v !== '')).then(async () => {
                            //     setManLoading(true)
                            //     callUpdateDueDates(ctx.child.id).then(res => res.json())
                            //         .then(async res => {
                            //             if (res.error) {
                            //                 setError(true)
                            //                 setManLoding(false)
                            //             }
                            //             setManLoading(false)
                            //             navigation.navigate("Home")
                            //         })
                            // })
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
                                        if (data[changeParams[1]] === "") {
                                            let temp = [...data]
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
                                        }
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
    },
    green: {
        backgroundColor: "#dbffe1"
    },
    red: {
        backgroundColor: "#fff5f5"
    }
});

export default EditableVaccine;
