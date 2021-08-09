import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { color } from 'react-native-reanimated';
import colors from '../constants/colors';

const ToggleButton = (props) => {
    const [status, setStatus] = React.useState('unchecked');

        const onButtonToggle = value => {
            setStatus(status === 'checked' ? 'unchecked' : 'checked');
            console.log("ISSELECTED", props.selected)
            props.onSelect();
        };
    
    return (
            <TouchableOpacity
            // style={[styles.toggle, (status=='checked') ? styles.toggleCheck : styles.toggleUncheck ]}
            style={[styles.toggle, props.selected ? styles.toggleCheck : styles.toggleUncheck]}
                activeOpacity={0.8}
                status={status}
                onPress={onButtonToggle}
            >
            <Text style={[styles.text, (status == 'checked') ? { color: 'white' } : { color: '#0A8C94' }]}>{props.textData}</Text>
            </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    toggle:{
        paddingHorizontal:30,
        paddingVertical:10,
        borderRadius:40,
        marginBottom: 10,
        marginRight: 10
    },
    toggleCheck: {
        backgroundColor: '#0A8C94',
        color: 'white',
        fontSize: 20,
    },
    toggleUncheck: {
        backgroundColor: 'white',
        color: '#0A8C94',
        borderWidth: 1.5,
        borderColor: '#0A8C94',
    },
    text:{
        fontFamily: 'PublicSans-Regular',
        fontSize:14
    }
})

export default ToggleButton
