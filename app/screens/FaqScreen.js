import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

import Screen from '../components/Screen';
import CardHeading from '../components/CardHeading';
import img from '../assets/FAQ.png';
import ParaText from '../components/ParaText';
import AppHeading from '../components/AppHeading';

const FaqScreen = () => {
    return (
        <Screen>
            <ScrollView>
                <View style={styles.top}>
                    <CardHeading>FAQs</CardHeading>
                    <Image source={img} style={styles.img} />
                </View>
                <View style={styles.bottom}>
                    <AppHeading style={styles.heading}>
                    Will my child get fever after this Vaccine ?
                    </AppHeading>
                    <ParaText style={styles.para}>
                    Not all Vaccine s cause fever post administration
                    Only DPT Vaccine es with whole cell pertussis (wP) lead to fever 
                    These are usually the ones give at 6 /10/14 wks 
                    And 1 1/2 years.
                    </ParaText>
                    <AppHeading style={styles.heading}>
                    My child's Vaccination date is on the 15th can I take the Vaccination on the 10th ?
                    </AppHeading>
                    <ParaText style={styles.para}>
                    As a thumb rule.. one should not try and prepone Vaccination as there should be a standard gap between two Vaccination doses.
                    </ParaText>
                    <AppHeading style={styles.heading}>
                    Can we give more than one Vaccine in a day?
                    </AppHeading>
                    <ParaText style={styles.para}>
                    Yes.. multiple inactivated Vaccines can be given in a day, what's important is to give them at different sites .also live vaccines can be given but at different sites.
                    </ParaText>
                    <AppHeading style={styles.heading}>
                    My child is having cold and cough ..can we take the Vaccination?
                    </AppHeading>
                    <ParaText style={styles.para}>
                    Mild cold and cough should not be a reason to postpone Vaccination .But if the child has fever and has any severe problem Vaccination should be delayed.
                    </ParaText>
                    <AppHeading style={styles.heading}>
                    My Vaccination date was yesterday.. can I take the Vaccine today?
                    </AppHeading>
                    <ParaText style={styles.para}>
                    Yes there is no problem .. Vaccination can be delayed by a few days .. as long as we take the Vaccine ( should not delay trying to avoid the Vaccination all together).
                    </ParaText>
                    <AppHeading style={styles.heading}>
                    What is better .. Vaccination with fever or Vaccination without fever ?
                    </AppHeading>
                    <ParaText style={styles.para}>
                    In India ,DTwP is being recommended currently at the mass level ( with fever vaccine ), but DTaP is equally effective in providing good Immunity at an individual level.
                    </ParaText>
                </View>
            </ScrollView>
        </Screen>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30
    },
    top: {
        paddingTop: 60,
        paddingBottom: 10,
        paddingHorizontal: 30,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    bottom: {
        paddingHorizontal: 30
    },
    heading: {
        marginTop: 60,
        marginBottom: 10,
        fontSize: 15
    },
    para: {
        textAlign: 'justify',
        fontSize: 14
    }
});
export default FaqScreen;
