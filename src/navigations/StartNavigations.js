import React from "react";
import LoginScreen from "../screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterScreen from "../screens/RegisterScreen";
import LandingScreen from "../screens/LandingScreen";
import ForgotPassword from "../screens/ForgotPassword";
import IncidentReportForm from "../screens/IncidentReportForm"; 
import TipsPage from "../screens/TipsPage"; 
// import MyMap from "../screens/MyMap";
// import "leaflet/dist/leaflet.css";
// import CustomerBarChart from "../screens/CustomerBarChart";
import AdminReport from "../AdminScreen/AdminReport";
import AdminTips from "../AdminScreen/AdminTips";
import DangerZoneAlert from "../screens/DangerZoneAlert";
// import LocationSearchBar from "../screens/LocationSearchBar";


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
       {/* <Stack.Screen name="LocationSearchBar" component={LocationSearchBar} /> */}
       {/* <Stack.Screen name="MyMap" component={MyMap} /> */}
       {/* <Stack.Screen name="CustomerBarChart" component={CustomerBarChart} /> */}
       <Stack.Screen name="AdminReport" component={AdminReport} />
       <Stack.Screen name="AdminTips" component={AdminTips} />
       <Stack.Screen name="DangerZoneAlert" component={DangerZoneAlert} />
      
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StartNavigations;
