import * as React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { Checkbox } from 'react-native-paper';

const CheckBox = (props) => {
  const [checked, setChecked] = React.useState(false);

  return (
    <View style={styles.con}>
        <Checkbox
        color={'#48E34E'}
        status={checked ? 'checked' : 'unchecked'}
        onPress={() => {
            setChecked(!checked);
        }}
        />
        <Text style={styles.ageText}>{props.age}</Text>
    </View>    
  );
};

const styles = StyleSheet.create({
    con: {
        display: 'flex',
        flexDirection: 'row',
    },
    ageText: {
        fontFamily: 'PublicSans-Regular',
        fontSize: 14,
        marginTop: 4,
        marginLeft:2
    }
})

export default CheckBox;