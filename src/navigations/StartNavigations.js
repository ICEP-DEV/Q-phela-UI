import React from "react";
import LoginScreen from "../screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterScreen from "../screens/RegisterScreen";
import LandingScreen from "../screens/LandingScreen";
import ForgotPassword from "../screens/ForgotPassword";
import IncidentReportForm from "../screens/IncidentReportForm"; 
import TipsPage from "../screens/TipsPage"; 

const Stack = createNativeStackNavigator();

const StartNavigations = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
         initialRouteName="Landing"
         screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} /> 
         <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="Landing" component={LandingScreen} /> 
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="IncidentReportForm" component={IncidentReportForm} /> 
       <Stack.Screen name="TipsPage" component={TipsPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StartNavigations;
