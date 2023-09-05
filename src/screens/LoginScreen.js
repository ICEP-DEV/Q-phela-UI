import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, SafeAreaView, Text, Pressable } from "react-native";
import { Colors } from "../assets/Colors";
import InputComponent from "../components/global/InputComponent";
import RoundedButton from "../components/global/RoundedButton";
import Image from "../components/login-screen/Image";

export default function LoginScreen() {
  const navigation = useNavigation();

  const LoginFunction = () => {
    console.log("logged in");
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.viewStyle}>
        <View style={{ marginBottom: 41 }}>
          <Image />
        </View>
        <View style={[styles.viewStyle, { gap: 30 }]}>
          <InputComponent placeholder="Username" mode="text" />
          <InputComponent placeholder="Password" mode="text" secure={true} />
          <RoundedButton
            btnColor={Colors.black}
            title="Login"
            onPressedFun={LoginFunction}
          />
          <View>
            <View style={{ flexDirection: "row" }}>
              <Pressable onPress={() => navigation.navigate("Register")}>
                <Text style={[styles.text, { color: Colors.blue }]}>
                  Register
                </Text>
              </Pressable>
              <Text style={[styles.text]}> your account</Text>
            </View>
            <Pressable
              style={{ marginTop: 5 }}
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              <Text
                style={[
                  styles.text,
                  { color: Colors.blue, textAlign: "center" },
                ]}
              >
                forgot password
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.gray,
  },
  viewStyle: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 14,
    fontWeight: "400",
  },
});
