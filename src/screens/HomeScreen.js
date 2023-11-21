import React, { useState } from 'react';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../assets/Colors";

const HomeScreen = () => {
  const [hoveredButton, setHoveredButton] = useState(null);

  const handleButtonPressIn = (button) => {
    setHoveredButton(button);
  };

  const handleButtonPressOut = () => {
    setHoveredButton(null);
  };
  const navigation = useNavigation();
  const navigateToAnotherPage = (pageName) => {
    // Use navigation to navigate to another page
    navigation.navigate(pageName);
    toggleDropdown(); // Close the dropdown after navigating
  };

  const buttonStyle = (name) => ({
    ...styles.button,
    transform: [
      { scale: hoveredButton === name ? 1.2 : 1 } // Increase the size when button is pressed
    ]
  });

  return (

    <View style={styles.container}>
         <View style={styles.root}>

<View style={styles.buttonRow}>
<TouchableOpacity onPress={() => navigateToAnotherPage("ProfileScreen")}
    style={buttonStyle("stars")}
    onPressIn={() => handleButtonPressIn("stars")}
    onPressOut={handleButtonPressOut}
  >
    <Icon name="user" size={30} color="Black" />
    <Text style={[styles.text, { color: Colors.blue }, styles.topHeading]}>Profile</Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={() => navigateToAnotherPage("IncidentReportForm")}
    style={buttonStyle("report")}
    onPressIn={() => handleButtonPressIn("report")}
    onPressOut={handleButtonPressOut}
  >
    <Icon name="flag" size={30} color="Black" />
    <Text style={[styles.text, { color: Colors.blue }, styles.topHeading]}>Report</Text>
  </TouchableOpacity>
 
  <TouchableOpacity onPress={() => navigateToAnotherPage("Graph")}
    style={buttonStyle("settings")}
    onPressIn={() => handleButtonPressIn("settings")}
    onPressOut={handleButtonPressOut}
  >
    <Icon name="exclamation-triangle" size={30} color="Black" />
    
    <Text style={[styles.text, { color: Colors.blue }, styles.topHeading]}>Alert</Text>
  </TouchableOpacity>

  
  <TouchableOpacity onPress={() => navigateToAnotherPage("TipsPage")}
    style={buttonStyle("tips")}
    onPressIn={() => handleButtonPressIn("tips")}
    onPressOut={handleButtonPressOut}
  >
    <Icon name="lightbulb-o" size={30} color="Black" />
    <Text style={[styles.text, { color: Colors.blue }, styles.topHeading]}>Tips</Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={() => navigateToAnotherPage("Graph")}
    style={buttonStyle("contact")}
    onPressIn={() => handleButtonPressIn("contact")}
    onPressOut={handleButtonPressOut}
  >
    <Icon name="pause" size={30} color="Black" />
    <Text style={[styles.text, { color: Colors.blue }, styles.topHeading]}>Stats</Text>
  </TouchableOpacity>
 
</View>
</View>
    </View>
   
  );
};

const styles = {
  container: {
    flex: 1,
    marginBottom:20,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  root: {
    justifyContent: 'flex-end',
  },
  buttonRow: {
    flexDirection: 'row',
     justifyContent: 'space-between',
     alignItems: 'center',
    // backgroundColor: 'white',
    
    // borderTopWidth: 1,
    // borderColor: 'lightgray',
    // padding: 10,
  
    height: 65,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: Colors.gray,
    borderRadius: 15,
    elevation: 8, // Add elevation for shadow (Android)
    shadowColor: "black", // Specify shadow color (iOS)
    shadowOffset: { width: 0, height: 2 }, // Specify shadow offset (iOS)
    shadowOpacity: 0.2, // Specify shadow opacity (iOS)
    shadowRadius: 2,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
};

export default HomeScreen;