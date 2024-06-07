import React, {useState, useEffect, useRef} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {Camera, CameraType} from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import Button from './src/components/Button';
import { CameraOrientation } from 'expo-camera/build/legacy/Camera.types';

export default function App() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);

useEffect(() => {
  (async () => {
    MediaLibrary.requestPermissionAsync();
    const cameraStatus = await Camera.requestCameraPermissionsAsync();
    setHasCameraPermission(cameraStatus.status === 'granted');

  })();
}, [])

const takePicture = async () => {
  if(cameraRef) {
    try{
      const datan = await cameraRef.current.takePictureAsync();
      console.log(data);
      setImage(data.url);
    } catch(e) {
      console.log(e);
    }
  }
}

if(hasCameraPermission === false ){
  return <Text>No acces to camera</Text>
}

  return (
    <View style={styles.container}>
      <Camera
      style={styles.camera}
      type={type}
      flashMode={flash}
      ref={cameraRef}
      >
        <Text>Hello World</Text>
      </Camera>
      <View>
        <Button title={'Scan object'} icon={"camera"} onPress={takePicture}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingBottom: 15,
  },
  camera: {
    flex: 1,
    borderRadius: 20,

  }
});
