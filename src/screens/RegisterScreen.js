import React from "react";
import { Colors } from "../assets/Colors";
import { Text, SafeAreaView, StyleSheet, View } from "react-native";
import LocationSvg from "../assets/svg/LocationSvg";
import InputComponent from "../components/global/InputComponent";
import RoundedButton from "../components/global/RoundedButton";

const registerFun = () => {
  console.log("Register");
};

const RegisterScreen = () => {
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.svgtext}>
        <LocationSvg />
        <Text style={styles.headerText}>Register your account</Text>
      </View>
      <View style={styles.fields}>
        <InputComponent placeholder="Username" mode="text" />
        <InputComponent placeholder="Email" mode="email" />
        <InputComponent placeholder="Password" mode="text" secure={true} />
        <InputComponent
          placeholder="Confirm Password"
          mode="text"
          secure={true}
        />
        <RoundedButton
          title="Register"
          btnColor={Colors.black}
          onPressedFun={registerFun}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.gray,
  },
  svgtext: {
    gap: 31,
    alignItems: "center",
    marginBottom: 30,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "700",
  },
  fields: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: 20,
  },
});

export default RegisterScreen;
