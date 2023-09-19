import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView, Text, Pressable, TextInput } from "react-native";
import { Colors } from "../assets/Colors";
import InputComponent from "../components/global/InputComponent";
import RoundedButton from "../components/global/RoundedButton";
import Image from "../components/login-screen/Image";
import axios from 'axios'; // Import Axios
import { useNavigation } from "@react-navigation/native"; // Import the navigation hook

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation(); // Use the navigation hook

  const LoginFunction = async () => {
    try {
      // Create an object with the login data
      const loginData = {
        email: email,
        password: password,
      };
      console.log(loginData);

      // Make a POST request to your server's login endpoint
      const response = await axios.post('http://localhost:3002/login', {email,password});
      

      // Handle the server response here
      console.log('Server response:');
      if(response.data.success == true){
        localStorage.setItem("citizen_id",response.data.results[0].citizen_id.toString())
        localStorage.setItem("citizen_name",  response.data.results[0].citizen_name.toString())
        navigation.navigate('TipsPage')
        return;
      }
      else{

        return
      }

      
    } catch (error) {
      // Handle login errors (e.g., incorrect username or password)
      console.error('Login failed:', error);
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
            onChangeText={(e)=> setEmail(e)}
          />
          <TextInput 
            placeholder="Password"
            mode="text"   
            secure={true}
            onChangeText={(e)=> setPassword(e)}
          />
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
