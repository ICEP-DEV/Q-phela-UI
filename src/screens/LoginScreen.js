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
import { FontAwesome } from "@expo/vector-icons"; // Import FontAwesome icon

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for showing/hiding password
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
      setLoginMessage('Unable to login, please enter the correct email or password ');
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.viewStyle}>
        <View style={{ marginBottom: 41 }}>
          <Image />
        </View>
        <View style={[styles.viewStyle, { gap: 30 }]}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Email *"
              mode="text"
              onChangeText={(e) => setEmail(e)}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainers}>
            <TextInput
              placeholder="Password *"
              mode="text"
              secureTextEntry={!showPassword} // Use secureTextEntry for password
              onChangeText={(e) => setPassword(e)}
              style={styles.input}
            />
            <FontAwesome
              name={showPassword ? "eye-slash" : "eye"} // Toggle icon based on showPassword state
              size={24}
              color={Colors.black}
              style={styles.icon}
              onPress={() => setShowPassword(!showPassword)} // Toggle showPassword state
            />
          </View>
          <RoundedButton
            btnColor={Colors.black}
            title="Login"
            onPressedFun={LoginFunction}
          />
          <Text style={{ color: 'red' }}>{loginMessage}</Text> {/* Display login message */}
          <View>
            <View style={{ flexDirection: "row" }}>
              <Pressable onPress={() => navigation.navigate("Register")}>
                <Text style={[styles.text, { color: Colors.white }]}>
                  Register
                </Text>
              </Pressable>
              <Text style={[styles.text]}> your account</Text>
            </View>
            <Pressable style={{ marginTop: 5 }} onPress={() => navigation.navigate("ForgotPassword")}>
              <Text style={[styles.text, { color: Colors.white, textAlign: "center" }]}>
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
    backgroundColor: "gray",
  },
 
  viewStyle: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    marginRight: -4,
  },
  inputContainers: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    marginRight: -45,
  },
  text: {
    fontSize: 14,
    fontWeight: "400",
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    color: "lightGrey",

  },
  icon: {
    padding: 10,
  },
});
