import { Text, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

function NormalText({ children }) {
  return <Text style={styles.text}>{children}</Text>;
}

export default NormalText;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: Colors.primary900,
  },
});
