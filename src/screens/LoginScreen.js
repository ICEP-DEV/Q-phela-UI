import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  Pressable,
  TextInput,
} from "react-native";
import { Colors } from "../assets/Colors";
import InputComponent from "../components/global/InputComponent";
import RoundedButton from "../components/global/RoundedButton";
import Image from "../components/login-screen/Image";
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState(""); // To store login messages
  const navigation = useNavigation();

  const LoginFunction = async () => {
    try {
      const loginData = {
        email: email,
        password: password,
      };
      console.log(loginData);

      const response = await axios.post('http://localhost:3002/login', loginData);
      console.log('Server response:', response.data);

      if (response.data.success) {
        if (response.data.role === 'citizen') {
          localStorage.setItem("citizen_id", response.data.results[0].citizen_id.toString())
          localStorage.setItem("citizen_name", response.data.results[0].citizen_name.toString())
          setLoginMessage('Logged in as a citizen');
          navigation.navigate('TipsPage');
        } else if (response.data.role === 'admin') {
          setLoginMessage('Logged in as an admin');
          navigation.navigate('AdminDashboard');
        }
      } else {
        setLoginMessage('Login failed: ' + response.data.message);
      }
    } catch (error) {
     // setLoginMessage('s: ' + error.message);
     setLoginMessage('Unsuccessful to login enter correct email or password ' );
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.viewStyle}>
        <View style={{ marginBottom: 41 }}>
          <Image />
        </View>
        <View style={[styles.viewStyle, { gap: 30 }]}>
          <TextInput
            placeholder="email"
            mode="text"
            onChangeText={(e) => setEmail(e)}
          />
          <TextInput
            placeholder="Password"
            mode="text"
            secureTextEntry={true} // Use secureTextEntry for password
            onChangeText={(e) => setPassword(e)}
          />
          <RoundedButton
            btnColor={Colors.black}
            title="Login"
            onPressedFun={LoginFunction}
          />
          <Text style={{ color: 'red' }}>{loginMessage}</Text> {/* Display login message */}
          <View>
            <View style={{ flexDirection: "row" }}>
              <Pressable onPress={() => navigation.navigate("Register")}>
                <Text style={[styles.text, { color: Colors.blue }]}>
                  Register
                </Text>
              </Pressable>
              <Text style={[styles.text]}> your account</Text>
            </View>
            <Pressable style={{ marginTop: 5 }} onPress={() => navigation.navigate("ForgotPassword")}>
              <Text style={[styles.text, { color: Colors.blue, textAlign: "center" }]}>
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
