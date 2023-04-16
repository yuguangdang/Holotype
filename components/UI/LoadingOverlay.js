import React from "react";
import { Modal, ActivityIndicator, View, StyleSheet, Text } from "react-native";

const LoadingOverlay = ({ visible, text }) => {
  return (
    <Modal visible={visible} transparent>
      <View style={styles.overlay}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.text}>{text}</Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    marginTop: 20,
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default LoadingOverlay;
