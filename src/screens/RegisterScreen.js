import React, { useState } from "react";
import { Colors } from "../assets/Colors";
import { Text, SafeAreaView, StyleSheet, View, TextInput, Modal, Button } from "react-native";
import LocationSvg from "../assets/svg/LocationSvg";
import RoundedButton from "../components/global/RoundedButton";
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [citizenName, setCitizenName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const [existingUserMessage, setExistingUserMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const registerFun = async () => {
    try {
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      //pass char
      const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(password)) {
        setError('Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters.');
        return;
      }
  //for email to inc@
  if (!email.includes('@')) {
    setError('Invalid email format. Email must include "@" symbol.');
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
          setExistingUserMessage('User with this email already exists');
          setShowModal(true);
        } else {
          setError('Registration failed. Please check your input and try again');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Registration failed. Please check your input and try again');
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.svgtext}>
        <LocationSvg />
        <Text style={styles.headerText}>Register your account</Text>
      </View>
      <View style={styles.fields}>
      <View style={styles.inputContainers}> 
  <TextInput
    placeholder="Username"
    onChangeText={setCitizenName}
    style={styles.input}  
  />
</View>
<View style={styles.inputContainers}>
  <TextInput
    placeholder="Email *"
    onChangeText={setEmail}
    style={styles.input} 
  />
</View>
<View style={styles.inputContainers}> 
  <TextInput
    placeholder="Contact Number"
    onChangeText={setContactNumber}
    style={styles.input}  
  />
</View>
<View style={styles.inputContainer}>
  <TextInput
    placeholder="Password *"
    secureTextEntry={!passwordVisible}
    onChangeText={setPassword}
    style={styles.input} 
  />
  <FontAwesome
    name={passwordVisible ? "eye" : "eye-slash"}
    size={24}
    color={Colors.black}
    style={styles.icon}
    onPress={() => setPasswordVisible(!passwordVisible)}
  />
</View>
<View style={styles.inputContainer}>
  <TextInput
    placeholder="Confirm Password *"
    secureTextEntry={!confirmPasswordVisible}
    onChangeText={setConfirmPassword}
    style={styles.input}  
  />
  <FontAwesome
    name={confirmPasswordVisible ? "eye" : "eye-slash"}
    size={24}
    color={Colors.black}
    style={styles.icon}
    onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
  />
</View>

        {/* <View style={styles.inputContainer}>
          <TextInput
            placeholder="Confirm Password *"
            secureTextEntry={!confirmPasswordVisible}
            onChangeText={setConfirmPassword}
            style={styles.input}  
          />
          <FontAwesome
            name={confirmPasswordVisible ? "eye" : "eye-slash"}
            size={24}
            color={Colors.black}
            style={styles.icon}
            onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
          />
        </View> */}
        <RoundedButton
          title="Register"
          btnColor={Colors.black}
          onPressedFun={registerFun}
        />
        {error && <Text style={styles.errorText}>{error}</Text>}
        <Modal animationType="slide" transparent={true} visible={showModal}>
          <View style={styles.modal}>
            <View style={styles.modalContent}>
              <Text style={styles.modalMessage}>{existingUserMessage}</Text>
              <Button title="Close" onPress={closeModal} />
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#ADD8E6",
  // alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  svgtext: {
    alignItems: "center",
    marginBottom: 30,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  fields: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
    padding:10,
  },
  /*contactInput: {
    marginBottom: 20,
    padding: 10,
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 5,
   
  },*/
  inputContainer: {
    flexDirection: "row",
   // flex: "row",
    alignItems: "center",
    borderColor: "gray",  
    borderWidth: 1,  
    borderRadius: 5,
    marginBottom: 20,
    marginLeft: 50,
  // color:"lightGrey",
  },
  inputContainers: {
    flexDirection: "row",
   // flex: "row",
    alignItems: "center",
    borderColor: "gray",  
    borderWidth: 1,  
    borderRadius: 5,
    marginBottom: 20,
    marginRight: -4,
  // color:"lightGrey",
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    color:"lightGrey",
  },
  icon: {
    padding: 10,
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
  existingUserMessage: {
    color: "blue",  // Change the color to your preference
    marginTop: 10,
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
});

export default RegisterScreen;