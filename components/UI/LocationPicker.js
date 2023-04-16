import { Alert, View, StyleSheet, Image } from "react-native";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";

import LoadingOverlay from "./LoadingOverlay";
import Colors from "../../constants/Colors";
import PrimaryButton from "./PrimaryButton";
import NormalText from "./NormalText";
import { getAddress, getMapPreview } from "../../util/location";
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";

function LocationPicker({ addLocationHandler, location }) {

  const [pickedLocation, setPickedLocation] = useState();
  const [isLoading, setIsLoading] = useState(false)

  const isFocused = useIsFocused();

  const navigation = useNavigation();
  const route = useRoute();

  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng,
      };
      setPickedLocation(mapPickedLocation);
    }
  }, [route, isFocused]);

  useEffect(() => {
    async function handleLocation() {
      if (pickedLocation) {
        const address = await getAddress(
          pickedLocation.lat,
          pickedLocation.lng
        );
        addLocationHandler({ ...pickedLocation, address: address });
      }
    }
    handleLocation();
  }, [pickedLocation, addLocationHandler]);

  async function verifyPermissions() {
    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant location permissions to use this app."
      );
      return false;
    }

    return true;
  }

  async function getLocationHandler() {
    setIsLoading(true)

    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      setIsLoading(false)
      return;
    }

    const location = await getCurrentPositionAsync();
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
    // addLocationHandler;
    setIsLoading(false)
  }

  function pickOnMapHandler() {
    navigation.navigate("Map");
  }

  let locationPreview = <NormalText>No location picked yet.</NormalText>;

  const randomLat = -1 * (Math.random() * (36 - 14) + 14);
  const randomLng = Math.random() * (150 - 120) + 120;

  // console.log(randomLat, randomLng);

  if (location) {
    locationPreview = (
      <Image
        style={styles.image}
        source={{ uri: getMapPreview(location.lat, location.lng) }}
        // source={{ uri: getMapPreview(randomLat, randomLng) }}
      />
    );
  }

  return (
    <View>
      {isLoading && <LoadingOverlay text={"Loading your location ..."} />}
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <PrimaryButton onPress={getLocationHandler}>
          <View style={{ marginRight: 5 }}>
            <Ionicons name="location" size={24} color={Colors.primary900} />
          </View>
          <NormalText>Locate My place</NormalText>
        </PrimaryButton>

        <PrimaryButton
          onPress={pickOnMapHandler}
          style={{ backgroundColor: Colors.accent600 }}
        >
          <View style={{ marginRight: 5 }}>
            <Ionicons name="map" size={24} color={Colors.primary900} />
          </View>
          <NormalText>Pick on Map</NormalText>
        </PrimaryButton>
      </View>
    </View>
  );
}

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    overflow: "hidden",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
