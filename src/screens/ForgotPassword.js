import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Image from "../components/login-screen/Image";
import InputComponent from "../components/global/InputComponent";
import RoundedButton from "../components/global/RoundedButton";
import { Colors } from "../assets/Colors";

const ForgotPassword = () => {
  const handleLogin = () => {
    console.log("Login button clicked");
  };

  return (
    <View style={styles.container}>
      <Image />

      <View style={[styles.viewStyle, { gap: 30, width: "100%" }]}>
        <InputComponent placeholder="Username" mode="text" />
        <InputComponent placeholder="New Password" mode="text" secure={true} />
        <InputComponent
          placeholder="Confirm Password"
          mode="text"
          secure={true}
        />

        <RoundedButton
          btnColor={Colors.black}
          title="Login"
          onPressedFun={handleLogin}
        />
      </View>

      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray,
    alignItems: "center",
    justifyContent: "center",
  },
  viewStyle: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
  },
});

export default ForgotPassword;
