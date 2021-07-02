import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import Screen from '../components/Screen';
import { TextInput } from 'react-native-paper';
import { withTheme } from 'react-native-paper';
import colors from '../constants/colors';

const UserDetails1 = () => {

    const [mothersName, setMothersName] = React.useState('');
    return(
        <Screen>
            <View style={styles.container}>
            < TextInput
                label = "Mother's Name"
                value = {mothersName}
                mode={'outlined'}
                onChangeText = {setMothersName}
            />
            </View>
        </Screen>    
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 200,
        padding:20,
    }
})

export default UserDetails1;