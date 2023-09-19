import React, { useState } from "react";
import { Colors } from "../assets/Colors";
import { Text, SafeAreaView, StyleSheet, View, TextInput } from "react-native";
import LocationSvg from "../assets/svg/LocationSvg";
import RoundedButton from "../components/global/RoundedButton";
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";
const RegisterScreen = () => {
  const navigation = useNavigation(); 
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [Email, setEmail]=useState('')
  const [Citizen_name, setCitizen_name]=useState('')
  const [Password, setPassword]=useState('')
  const [Confirmassword, setConfirmassword]=useState('')
  const [Contact_Number, setContact_Number]=useState('')

  const [error, setError] = useState('');

  const registerFun = async () => {
    try {
      var data={
        email:Email,
        citizen_name:Citizen_name,
        password:Password,
        contact_number:Contact_Number
      }
      // Make a POST request to your server's registration endpoint
      const response = await axios.post('http://localhost:3002/register', data);

      // Handle the server response here
      console.log('Server response:', response.data);
      console.log('Server response:', response.data);
      if(response.data.success == true){
        navigation.navigate('Login')
        return;
      }
      else{

        return
      }

      // You can also navigate to the login screen or perform other actions based on the response
    } catch (error) {
      // Handle any errors that occurred during the request
      console.error('Error:', error);
      setError('Registration failed. Please check your input and try again.');
    }
  };

  const handleInputChange = (key, value) => {
    // Update the userData state when the input fields change
    setUserData({
      ...userData,
      [key]: value,
    });
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
          mode="text"
          onChangeText={(e)=> setCitizen_name(e)}
        />
        <TextInput
          placeholder="Email"
          mode="email"
          onChangeText={(e)=> setEmail(e)}
        />
        <TextInput
          placeholder="Contact Number"
          mode="text"
          onChangeText={(e)=> setContact_Number(e)}
        />
        <TextInput 
          placeholder="Password"
          mode="text"
          secure={true}
          onChangeText={(e)=> setPassword(e)}
        />
        <TextInput
          placeholder="Confirm Password"
          mode="text"
          secure={true}
          onChangeText={(e)=> setConfirmassword(e)}
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
