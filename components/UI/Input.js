import { StyleSheet, View, Text, TextInput } from "react-native";

import Colors from "../../constants/Colors";

function Input({label, textInputConfig}) {
  const inputStyles = [styles.input]
  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline)
  }

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: Colors.primary900,
    marginBottom: 4,
  },
  input: {
    backgroundColor: Colors.accent100,
    color: Colors.primary900,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 150,
    textAlignVertical: 'top'
  }
})