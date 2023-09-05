import React from "react";
import { StyleSheet, Image, Text, View } from "react-native";
import HamburgerMenu from "../../assets/svg/HamburgerMenu";
import LogoSvg from "../../assets/svg/LogoSvg";

const Heading = () => {
  return (
    <>
      <View style={styles.headerRoot}>
        <Image
          source={require("../../assets/images/logo.png")}
          width={10}
          height={10}
          resizeMode="center"
        />
        <HamburgerMenu />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerRoot: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 35,
  },
});

export default Heading;
