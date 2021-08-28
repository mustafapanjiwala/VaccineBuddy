import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Button } from 'react-native';
import AppHeading from '../components/AppHeading';
import Screen from '../components/Screen';
import DatePicker from '../components/DatePicker';
import CheckBox from '../components/CheckBox';
import AppButton from '../components/AppButton';
import CardPara from '../components/CardPara';
import SelectVaccine from './SelectVaccine';
import { RadioButton } from 'react-native-paper';


const CheckListScreen = ({ navigation }) => {
    const [checked, setChecked] = React.useState('');

    return (
        <Screen>
            <View style={styles.container}>
                <View style={styles.selectFlex}>
                    <AppHeading>Select Your Vaccination</AppHeading>
                    <DatePicker
                        style={{
                            paddingHorizontal: 10,
                            paddingVertical: 8
                        }}
                    />
                </View>
                <View style={styles.cont}>
                    <View style={styles.checkboxContain}>
                            <View style={styles.radio}>
                                <RadioButton
                                    value="Birth"
                                    status={ checked === 'Birth' ? 'checked' : 'unchecked' }
                                    color="#79D1D7"
                                    onPress={() => setChecked('Birth')}
                                />
                                <CardPara>Birth</CardPara>
                            </View>
                            <View style={styles.radio}>
                                <RadioButton
                                    value="6 weeks"
                                    status={ checked === '6 weeks' ? 'checked' : 'unchecked' }
                                    color="#79D1D7"
                                    onPress={() => setChecked('6 weeks')}
                                />
                                <CardPara>6 weeks</CardPara>
                            </View>
                            <View style={styles.radio}>
                                <RadioButton
                                    value="10 weeks"
                                    status={ checked === '10 weeks' ? 'checked' : 'unchecked' }
                                    color="#79D1D7"
                                    onPress={() => setChecked('10 weeks')}
                                />
                                <CardPara>10 weeks</CardPara>
                            </View>
                            <View style={styles.radio}>
                                <RadioButton
                                    value="14 weeks"
                                    status={ checked === '14 weeks' ? 'checked' : 'unchecked' }
                                    color="#79D1D7"
                                    onPress={() => setChecked('14 weeks')}
                                />
                                <CardPara>14 weeks</CardPara>
                            </View>
                            <View style={styles.radio}>
                                <RadioButton
                                    value="6 months"
                                    status={ checked === '6 months' ? 'checked' : 'unchecked' }
                                    color="#79D1D7"
                                    onPress={() => setChecked('6 months')}
                                />
                                <CardPara>6 months</CardPara>
                            </View>
                            <View style={styles.radio}>
                                <RadioButton
                                    value="8 months"
                                    status={ checked === '8 months' ? 'checked' : 'unchecked' }
                                    color="#79D1D7"
                                    onPress={() => setChecked('8 months')}
                                />
                                <CardPara>8 months</CardPara>
                            </View>
                            <View style={styles.radio}>
                                <RadioButton
                                    value="9 months"
                                    status={ checked === '9 months' ? 'checked' : 'unchecked' }
                                    color="#79D1D7"
                                    onPress={() => setChecked('9 months')}
                                />
                                <CardPara>9 months</CardPara>
                            </View>
                    </View>
                    <View style={styles.checkboxContain}>
                            <View style={styles.radio}>
                                <RadioButton
                                    value="12 months"
                                    status={ checked === '12 months' ? 'checked' : 'unchecked' }
                                    color="#79D1D7"
                                    onPress={() => setChecked('12 months')}
                                />
                                <CardPara>12 months</CardPara>
                            </View>
                            <View style={styles.radio}>
                                <RadioButton
                                    value="15 months"
                                    status={ checked === '15 months' ? 'checked' : 'unchecked' }
                                    color="#79D1D7"
                                    onPress={() => setChecked('15 months')}
                                />
                                <CardPara>15 months</CardPara>
                            </View>
                            <View style={styles.radio}>
                                <RadioButton
                                    value="16-18 months"
                                    status={ checked === '16-18 months' ? 'checked' : 'unchecked' }
                                    color="#79D1D7"
                                    onPress={() => setChecked('16-18 months')}
                                />
                                <CardPara>16-18 months</CardPara>
                            </View>
                            <View style={styles.radio}>
                                <RadioButton
                                    value="2 years"
                                    status={ checked === '2 years' ? 'checked' : 'unchecked' }
                                    color="#79D1D7"
                                    onPress={() => setChecked('2 years')}
                                />
                                <CardPara>2 years</CardPara>
                            </View>
                            <View style={styles.radio}>
                                <RadioButton
                                    value="4-5 years"
                                    status={ checked === '4-5 years' ? 'checked' : 'unchecked' }
                                    color="#79D1D7"
                                    onPress={() => setChecked('4-5 years')}
                                />
                                <CardPara>4-5 years</CardPara>
                            </View>
                            <View style={styles.radio}>
                                <RadioButton
                                    value="10 years"
                                    status={ checked === '10 years' ? 'checked' : 'unchecked' }
                                    color="#79D1D7"
                                    onPress={() => setChecked('10 years')}
                                />
                                <CardPara>10 years</CardPara>
                            </View>
                    </View>
                </View>
                <AppButton
                    onPress={() => {
                        navigation.navigate('SelectVaccine');
                    }}
                />
            </View>
        </Screen>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        justifyContent: 'space-between'
    },
    selectFlex: {
        display: 'flex',
        // flexDirection: 'row',
        // width: 800,
        height: 10,
        justifyContent: 'space-between',
        marginBottom: 28
    },
    cont: {
        display: 'flex',
        flexDirection: 'row',
        height: '60%',
        // justifyContent:'space-between'
        paddingRight: 60,
        justifyContent: 'space-between'
    },
    checkboxContain: {
        height: '100%',
        justifyContent: 'space-between'
    },
    radio: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});

export default CheckListScreen;
