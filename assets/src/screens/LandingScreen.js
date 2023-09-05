import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Colors } from "../assets/Colors";
import MyLocationSvg from "../assets/svg/MyLocationSvg";
import Heading from "../components/landing-screen/Heading";
import RoundedButton from "../components/global/RoundedButton";
import { useNavigation } from "@react-navigation/native";

const LandingScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <StatusBar />
      <Heading />
      <View style={{ marginTop: 54, marginBottom: 40 }}>
        <Text style={[styles.text, { color: Colors.blue }, styles.topHeading]}>
          Emergency Notification App for Recipients
        </Text>
        <Text style={[styles.text, styles.description]}>
          The Q’phela app enables your recipients to receive notifications
          directly to their mobile phone whether at home, traveling, or in the
          workplace. Recipients can also better self-manage their own data and
          message history
        </Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <MyLocationSvg />
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 40,
        }}
      >
        <RoundedButton
          btnColor={Colors.lightBlack}
          title="GET STARTED"
          onPressedFun={() => navigation.navigate("Login")}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
  },
  topHeading: {
    fontSize: 16,
    marginBottom: 37,
    fontWeight: "900",
  },
  description: {
    fontSize: 14,
    fontWeight: "400",
    marginHorizontal: 35,
    lineHeight: 21,
    flexDirection: "column",
  },
});

export default LandingScreen;
