import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { CheckBox } from "@rneui/themed";

import Button from "./Button";
import AuthInput from "./AuthInput";
import Colors from "../../constants/Colors";

function AuthForm({ isLogin, onSubmit, credentialsInvalid }) {
  const [enteredName, setEnteredName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");
  const [isExpert, setIsExpert] = useState(false);

  const {
    name: namelIsInvalid,
    email: emailIsInvalid,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = credentialsInvalid;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "name":
        setEnteredName(enteredValue);
        break;
      case "email":
        setEnteredEmail(enteredValue);
        break;
      case "password":
        setEnteredPassword(enteredValue);
        break;
      case "confirmPassword":
        setEnteredConfirmPassword(enteredValue);
        break;
    }
  }

  function submitHandler() {
    onSubmit({
      name: enteredName,
      email: enteredEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
      isExpert: isExpert
    });
  }

  // <AuthInput
  //   label="Confirm Email Address"
  //   onUpdateValue={updateInputValueHandler.bind(this, "confirmEmail")}
  //   value={enteredConfirmEmail}
  //   keyboardType="email-address"
  //   isInvalid={emailsDontMatch}
  // />;

  return (
    <View style={styles.form}>
      <View>
        {!isLogin && (
          <AuthInput
            label="Name"
            onUpdateValue={updateInputValueHandler.bind(this, "name")}
            value={enteredName}
            isInvalid={namelIsInvalid}
          />
        )}
        <AuthInput
          label="Email Address"
          onUpdateValue={updateInputValueHandler.bind(this, "email")}
          value={enteredEmail}
          keyboardType="email-address"
          isInvalid={emailIsInvalid}
        />
        <AuthInput
          label="Password"
          onUpdateValue={updateInputValueHandler.bind(this, "password")}
          secure
          value={enteredPassword}
          isInvalid={passwordIsInvalid}
        />
        {!isLogin && (
          <AuthInput
            label="Confirm Password"
            onUpdateValue={updateInputValueHandler.bind(
              this,
              "confirmPassword"
            )}
            secure
            value={enteredConfirmPassword}
            isInvalid={passwordsDontMatch}
          />
        )}
        {!isLogin && (
          <CheckBox
            center
            title="Sign up as a taxonomist"
            checked={isExpert}
            onPress={() => setIsExpert(!isExpert)}
            iconRight={true}
            containerStyle={{ backgroundColor: null, marginTop: 6, padding: 0 }}
            textStyle={{ color: "white" }}
            checkedColor={Colors.accent400}
            size={18}
          />
        )}
        <View style={[styles.buttons, { marginTop: 10 }]}>
          <Button onPress={submitHandler}>
            {isLogin ? "Log In" : "Sign Up"}
          </Button>
        </View>
      </View>
    </View>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  buttons: {
    marginTop: 2,
  },
});
