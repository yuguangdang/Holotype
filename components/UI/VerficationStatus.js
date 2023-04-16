import { View, Text, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

function VerficationStatus({ text, color }) {
  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

export default VerficationStatus;

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
  text: {
    color: "white",
    fontSize: 16,
    padding: 4,
    textShadowColor: "rgba(0, 0, 0, 0.9)",
    textShadowOffset: { width: 1, height: -1 },
    textShadowRadius: 2,
  },
});
