import React from 'react'
import { View ,Image, StyleSheet } from 'react-native'
import ParaText from './ParaText'

const LoadingScreen = () => {
    return (
        <View style={styles.container}>
             <Image
          style={{width: 400, height: 300}}
          source={{uri: 'https://cdn.dribbble.com/users/108183/screenshots/4543219/loader_backinout.gif'}} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default LoadingScreen
