import { View, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

function HrLine() {
  return (
    <View
      style={{
        borderBottomColor: Colors.accent100,
        borderBottomWidth: 1.5,
        padding: 10,
        marginBottom: 10,
        marginHorizontal: 12
      }}
    />
  );
}

export default HrLine;
