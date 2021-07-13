import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Button } from 'react-native';
import AppHeading from '../components/AppHeading';
import Screen from '../components/Screen';
import DatePicker from '../components/DatePicker';
import CheckBox from '../components/CheckBox';
import AppButton from '../components/AppButton';

const CheckListScreen = () => {
    return (
        <Screen>
           <View style={styles.container}> 
            <View style={styles.selectFlex}>
                <AppHeading>Select Your Vaccination</AppHeading>
                <DatePicker 
                    style={{
                        paddingHorizontal:10,
                        paddingVertical:8,
                    }}
                />
            </View>
            <View style={styles.cont}>
            <View style={styles.checkboxContain}>
                <CheckBox age="Birth"/>
                <CheckBox age="6 weeks"/>
                <CheckBox age="10 weeks"/>
                <CheckBox age="14 weeks"/>
                <CheckBox age="6 months"/>
                <CheckBox age="8 months"/>
                <CheckBox age="9 months"/>
            </View>
            <View style={styles.checkboxContain}>
                <CheckBox age="12 months"/>
                <CheckBox age="15 months"/>
                <CheckBox age="16-18 mon."/>
                <CheckBox age="2 years"/>
                <CheckBox age="4-5 years"/>
                <CheckBox age="10 years"/>
            </View>
            </View>
            <AppButton />
           </View> 
        </Screen>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
    },
    selectFlex: {
        display: 'flex',
        // flexDirection: 'row',
        // width: 800,
        height:110,
        justifyContent: 'space-between',
        marginBottom:28,
    },
    cont:{
        display:'flex',
        flexDirection: 'row',
        height: '60%',
        // justifyContent:'space-between'
        paddingRight:60,
        justifyContent: 'space-between'
    },
    checkboxContain:{
        height: '100%',
        justifyContent:'space-between'
    }
})

export default CheckListScreen;
