import React, { useState, useEffect, useContext } from 'react'
import { View, StyleSheet, Image, Platform } from 'react-native' 
import { Button } from 'react-native-paper'
import { Fontisto, MaterialIcons , Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import ParaText from '../components/ParaText';
import { UploadImage } from '../queries/Image/UploadImage';
import { useUpdateChild } from "../queries/Child/updateChild"

import { AppContext } from '../context/AppContext';
import LoadingScreen from '../components/LoadingScreen';
const MyPrescriptionScreen = () => {
  const updateChild = useUpdateChild();

  const ctx = useContext(AppContext);
    const [isModalVisible, setModalVisible] = useState(false);
  const [isUploading, setIsUploading] = useState(false)

    const openModal = () => {
      if (ctx.child.images.length === 0) alert("No prescriptions available for this child")
      else if (!isModalVisible) {
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
      setIsUploading(true)
      UploadImage(result.uri)
        .then(async (res) => {
          await updateChild.mutateAsync({
            data: { images: [...ctx.child.images, res] },
            id: ctx.child.id
          });
          ctx.setChild({ ...ctx.child, images: [...ctx.child.images, res] });
          //ctx.setChildren()
          setIsUploading(false)
        })
        .catch((err) => {
          setIsUploading(false)
          alert('Failed to Upload Image');
          console.error('pickImage ProfileScreen.js : ', err);
        });
    }
  };

  // This function is triggered when the "Open camera" button pressed
  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      setIsUploading(true)
      UploadImage(result.uri)
        .then(async (res) => {
          await updateChild.mutateAsync({
            data: { images: [...ctx.child.images, res] },
            id: ctx.child.id
          });
          ctx.setChild({ ...ctx.child, images: [...ctx.child.images, res] });
          //ctx.setChildren()
          setIsUploading(false)
        })
        .catch((err) => {
          setIsUploading(false)
          alert('Failed to Upload Image');
          console.error('pickImage ProfileScreen.js : ', err);
        });
    }
  }

  if (updateChild.isLoading || isUploading) return <LoadingScreen />
    return (
        <View style={styles.container}>
            <Button style={styles.text} mode="contained" onPress={pickImage}><MaterialIcons style={styles.icon} name="add-to-photos" size={14} color="white" />{' '}My Files</Button>
            <Button style={styles.text} mode="contained" onPress={openCamera}><Entypo style={styles.icon} name="camera" size={14} color="white" />{' '}Camera</Button>
            <Button style={styles.text} mode="outlined" onPress={openModal}><Fontisto style={styles.icon} name="prescription" size={16} color="#0A8C94" />{' '}My Prescriptions</Button>

            <Modal visible={isModalVisible} transparent={true}>
                    <ImageViewer
                        enableSwipeDown={true}
                        onSwipeDown={closeModal}
            imageUrls={ctx.child.images.map(e => ({ url: e, props: {} }))}
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
