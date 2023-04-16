import {Text, StyleSheet} from "react-native";
import Colors from "../../constants/Colors";

function TitleText({children, style}) {
  return (
    <Text style={[styles.title, style]}>{children}</Text>
  )
}

export default TitleText

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: Colors.primary900,
    marginVertical: 5,
    elevation: 4,
    shadowColor: "black",
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowRadius: 0.5,
    shadowOpacity: 0.5,
  }
})