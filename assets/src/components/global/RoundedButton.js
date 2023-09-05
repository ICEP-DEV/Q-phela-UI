import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { Colors } from "../../assets/Colors";

const RoundedButton = (props) => {
  const { btnColor, title, onPressedFun } = props;
  return (
    <Pressable
      style={[styles.button, { backgroundColor: `${btnColor}` }]}
      onPress={onPressedFun}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    // backgroundColor: Colors.black,
    borderRadius: 15,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 500,
    paddingHorizontal: 40,
    paddingVertical: 5,
  },
  text: {
    fontSize: 20,
    color: Colors.white,
    fontWeight: "bold",
  },
});

export default RoundedButton;
