import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  useEffect,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useIsFocused } from "@react-navigation/native";

import Colors from "../constants/Colors";
import AuthContent from "../components/Auth/AuthContent";
import { useState } from "react";
import PrimaryButton from "../components/UI/PrimaryButton";

function LoginScreen({ navigation }) {
  const [isLogin, setIslogin] = useState(true);

  const isFocused = useIsFocused();

  // useEffect(() => {
  //   setIsFetching(false);
  // }, [isFocused]);

  const switchAuthModeHandler = () => {
    setIslogin(!isLogin);
  };

  const loginHandler = () => {
    navigation.navigate("StackNavigator", { screen: "CategoriesScreen" });
  };

  const form = isLogin ? (
    <AuthContent
      isLogin
      switchHandler={switchAuthModeHandler}
      loginHandler={loginHandler}
    />
  ) : (
    <AuthContent switchHandler={switchAuthModeHandler} />
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <LinearGradient
        colors={[Colors.primary400, Colors.accent400]}
        style={styles.rootScreen}
      >
        <ImageBackground
          source={require("../assets/images/background0.png")}
          resizeMode="cover"
          style={styles.rootScreen}
          imageStyle={styles.backgroundImage}
        >
          <View style={styles.container}>
            <View style={{ marginBottom: 4 }}>
              <Text style={styles.label}>HOLOTYPE</Text>
              <Text style={{ color: Colors.primary900, textAlign: "center" }}>
                Together we protect biodiversity
              </Text>
            </View>

            {form}

            {/* <View style={styles.loginContainer}>
              <PrimaryButton
                onPress={loginHandler}
                style={{ backgroundColor: Colors.primary400 }}
              >
                Login In
              </PrimaryButton>
              <PrimaryButton style={{ backgroundColor: Colors.accent600 }}>
                Sign Up
              </PrimaryButton>
            </View> */}

            
          </View>
        </ImageBackground>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.2,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    marginTop: "30%",
    marginBottom: "30%",
    alignItems: "center",
  },
  label: {
    fontSize: 50,
    fontFamily: "Baskerville-Bold",
    color: Colors.primary900,
  },
  loginContainer: {
    flexDirection: "row",
  },
});
