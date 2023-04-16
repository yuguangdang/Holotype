import { Alert, View, Image, StyleSheet } from "react-native";
import PrimaryButton from "./UI/PrimaryButton";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
  launchImageLibraryAsync,
  MediaTypeOptions,
} from "expo-image-picker";
import { useState } from "react";

import NormalText from "./UI/NormalText";
import Colors from "../constants/Colors";

function ImagePicker({ addImageHandler, imageUrl }) {
  const [pickedImage, setPickedImage] = useState("");

  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  async function verifyPermissions() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant camera permissions to use this app."
      );
      return false;
    }

    return true;
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    Alert.alert(
      "Warning",
      "When taking pictures, please be cautious about dangerous animals and hazadous surroundings",
      [
        {
          text: "OK",
          onPress: async () => {
            const image = await launchCameraAsync({
              allowsEditing: true,
              aspect: [16, 9],
              quality: 0.5,
            });
            setPickedImage(image.uri);
            addImageHandler(image.uri);
          },
        },
      ]
    );
  }

  async function selectImageHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const selectedImage = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    console.log(selectedImage);
    if (!selectedImage.cancelled) {
      setPickedImage(selectedImage.uri);
      addImageHandler(selectedImage.uri);
    }
  }

  let imagePreview = <NormalText>No image taken yet.</NormalText>;

  if (imageUrl !== "") {
    imagePreview = <Image source={{ uri: imageUrl }} style={styles.image} />;
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <View style={styles.imageButtonContainer}>
        <PrimaryButton onPress={selectImageHandler}>
          <View style={{ marginRight: 10 }}>
            <MaterialIcons
              name="photo-library"
              size={24}
              color={Colors.primary900}
              style={{ alignItems: "center" }}
            />
          </View>
          <NormalText>Select Photo</NormalText>
        </PrimaryButton>
        <PrimaryButton
          onPress={takeImageHandler}
          style={{ backgroundColor: Colors.accent400 }}
        >
          {" "}
          <View style={{ marginRight: 10 }}>
            <Ionicons name="camera" size={24} color={Colors.primary900} />
          </View>
          <NormalText>Take Image</NormalText>
        </PrimaryButton>
      </View>
    </View>
  );
}

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    overflow: "hidden",
  },
  imageButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
