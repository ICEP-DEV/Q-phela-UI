import React from "react";
import { StyleSheet, TextInput } from "react-native";
import { Colors } from "../../assets/Colors";

const InputComponent = (props) => {
  const { placeholder, mode, secure } = props;

  return (
    <TextInput
      style={styles.inputText}
      placeholder={placeholder}
      autoFocus={false}
      inputMode={mode}
      secureTextEntry={secure}
    />
  );
};

export default InputComponent;

const styles = StyleSheet.create({
  inputText: {
    width: "80%",
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: Colors.gray,
    borderRadius: 15,
    elevation: 8, // Add elevation for shadow (Android)
    shadowColor: "black", // Specify shadow color (iOS)
    shadowOffset: { width: 0, height: 2 }, // Specify shadow offset (iOS)
    shadowOpacity: 0.2, // Specify shadow opacity (iOS)
    shadowRadius: 2, // Specify shadow radius (iOS)
    // text styles
    fontSize: 16,
  },
});
