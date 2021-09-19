import React, {useState, useEffect} from 'react'
import { View, StyleSheet, Image, Platform } from 'react-native' 
import { Button } from 'react-native-paper'
import { Fontisto, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import ParaText from '../components/ParaText';

const MyPrescriptionScreen = () => {

    const [isModalVisible, setModalVisible] = useState(false);
    const images = [{
        // Simplest usage.
        url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',

        // width: number
        // height: number
        // Optional, if you know the image size, you can set the optimization performance
     
        // You can pass props to <Image />.
        props: {
            // headers: ...
        }
    },
    {
        // Simplest usage.
        url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',

        // width: number
        // height: number
        // Optional, if you know the image size, you can set the optimization performance
     
        // You can pass props to <Image />.
        props: {
            // headers: ...
        }
    }
    ]

    const openModal = () => {
        if (!isModalVisible) {
            setModalVisible(true);
        }
    };

    const closeModal = () => {
        if (isModalVisible) {
            setModalVisible(false);
        }
    };

    const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 5],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

    return (
        <View style={styles.container}>
            <Button style={styles.text} mode="contained" onPress={pickImage}><MaterialIcons style={styles.icon} name="add-to-photos" size={14} color="white" />{' '}Add Prescription</Button>
            <Button style={styles.text} mode="outlined" onPress={openModal}><Fontisto style={styles.icon} name="prescription" size={16} color="#0A8C94" />{' '}My Prescriptions</Button>

            <Modal visible={isModalVisible} transparent={true}>
                    <ImageViewer
                        enableSwipeDown={true}
                        onSwipeDown={closeModal}
                        imageUrls={images}
                    />
                </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    text: {
        fontSize: 12,
        fontFamily: 'PublicSans-Regular',
        marginTop: 15
    },
})

export default MyPrescriptionScreen
