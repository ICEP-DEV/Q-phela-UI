import React, { useState } from "react";
import { Colors } from "../assets/Colors";
import { Text, SafeAreaView, StyleSheet, View, TextInput } from "react-native";
import LocationSvg from "../assets/svg/LocationSvg";
import RoundedButton from "../components/global/RoundedButton";
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [citizenName, setCitizenName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const registerFun = async () => {
    try {
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }

      const data = {
        citizen_name: citizenName,
        email,
        password,
        contact_number: contactNumber
      };

      const response = await axios.post('http://localhost:3002/register', data);

      if (response.data.success) {
        navigation.navigate('Login');
      } else {
        if (response.data.message === 'User with this email already exists') {
          setError('User with this email already exists.');
        } else {
          setError('Registration failed. Please check your input and try again.');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Registration failed. Please check your input and try again.');
    }
  };




  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.svgtext}>
        <LocationSvg />
        <Text style={styles.headerText}>Register your account</Text>
      </View>
      <View style={styles.fields}>
        <TextInput
          placeholder="Username"
          onChangeText={setCitizenName}
        />
        <TextInput
          placeholder="Email"
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Contact Number"
          onChangeText={setContactNumber}
        />
        <TextInput 
          placeholder="Password"
          secureTextEntry
          onChangeText={setPassword}
        />
        <TextInput
          placeholder="Confirm Password"
          secureTextEntry
          onChangeText={setConfirmPassword}
        />

        <RoundedButton
          title="Register"
          btnColor={Colors.black}
          onPressedFun={registerFun}
        />
        {error && <Text style={styles.errorText}>{error}</Text>}
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
  errorText: {
    color: "red",
    marginTop: 10,
  },
});

export default RegisterScreen;