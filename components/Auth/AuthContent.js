import { useContext, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import AuthForm from "./AuthForm";
import FlatButton from "./FlatButton";
import { createUser, login } from "../../util/http";
import { AuthContext } from "../../store/context/auth-context";
import LoadingOverlay from "../UI/LoadingOverlay";

function AuthContent({ isLogin, switchHandler, loginHandler }) {
  const [isSubmiting, setIsSubmiting] = useState(false);
  const authCtx = useContext(AuthContext);

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  function onAuthenticate(user) {
    setIsSubmiting(true)
    createUser(user)
      .then((res) => {
        setIsSubmiting(false)
        console.log(res);
        switchHandler();
        Alert.alert("Message", "You've signed up. Please login.");
      })
      .catch((err) => {
        setIsSubmiting(false)
        console.log(err);
        Alert.alert("Alert", "Registration failed. Please check your input.");
      });
  }

  function submitHandler(credentials) {
    let { name, email, password, confirmPassword, isExpert } = credentials;

    // console.log(name);
    // console.log(email);
    // console.log(password);
    // console.log(confirmPassword);
    // console.log(isExpert);

    email = email.trim();
    password = password.trim();

    const nameIsvalid = name.length > 0;
    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 6;
    let passwordsAreEqual = true;
    if (confirmPassword) {
      passwordsAreEqual = password === confirmPassword;
    }

    if (!isLogin) {
      if (
        !nameIsvalid ||
        !emailIsValid ||
        !passwordIsValid ||
        (!isLogin && !passwordsAreEqual)
      ) {
        Alert.alert("Invalid input", "Please check your entered credentials.");
        setCredentialsInvalid({
          name: !nameIsvalid,
          email: !emailIsValid,
          confirmEmail: !emailIsValid,
          password: !passwordIsValid,
          confirmPassword: !passwordIsValid || !passwordsAreEqual,
        });
        return;
      }
    }

    if (!emailIsValid || !passwordIsValid || (!isLogin && !passwordsAreEqual)) {
      Alert.alert("Invalid input", "Please check your entered credentials.");
      setCredentialsInvalid({
        email: !emailIsValid,
        password: !passwordIsValid,
      });
      return;
    }

    let user = null;
    if (isLogin) {
      user = {
        email: email,
        password: password,
      };
    } else {
      user = {
        name: name,
        email: email,
        password: password,
        isExpert: isExpert,
      };
    }

    if (isLogin) {
      setIsSubmiting(true)
      login(user)
        .then((res) => {
          // console.log(res)
          setIsSubmiting(false)
          authCtx.authenticate(
            res.data.token,
            res.data.userId,
            res.data.isExpert,
            res.data.email,
            res.data.name
          );
          // console.log(res.data.token);
          loginHandler();
        })
        .catch((err) => {
          setIsSubmiting(false)
          console.log(err);
          Alert.alert(
            "Alert",
            "Authentication failed. Please check your email and password."
          );
        });
    } else {
      onAuthenticate(user);
    }
  }

  return (
    <View style={styles.authContent}>
      {isSubmiting && <LoadingOverlay text={isLogin? 'Log in ...' : 'Sign up ...'} />}
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
      <View style={styles.buttons}>
        <FlatButton onPress={switchHandler}>
          {isLogin ? "Create a new user" : "Log in instead"}
        </FlatButton>
      </View>
    </View>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    width: "70%",
    marginHorizontal: 12,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "rgba(26, 77, 46, 0.65)",
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
});
