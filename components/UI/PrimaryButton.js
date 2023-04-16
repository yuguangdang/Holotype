import { View, Text, Pressable, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

function PrimaryButton({ onPress, children, style, disabled }) {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, style, styles.pressed]
            : [styles.buttonInnerContainer, style, disabled && styles.disabled]
        }
        onPress={onPress}
        android_ripple={{ color: "#2f734f" }}
        disabled={disabled}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 5,
    margin: 20,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonInnerContainer: {
    backgroundColor: Colors.primary500,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: Colors.primary900,
    textAlign: "center",
    fontFamily: "caveat",
    fontSize: 20,
  },
  pressed: {
    opacity: 0.75,
  },
  disabled: {
    opacity: 0.5,
    backgroundColor: "#ccc",
  },
});
