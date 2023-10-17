import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity,Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation from React Navigation
import HamburgerMenu from "../../assets/svg/HamburgerMenu";


const Heading = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const navigation = useNavigation(); // Get the navigation object

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const navigateToAnotherPage = (pageName) => {
    // Use navigation to navigate to another page
    navigation.navigate(pageName);
    toggleDropdown(); // Close the dropdown after navigating
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleDropdown}>
        <View style={styles.headerRoot}>
          
          <HamburgerMenu />
        </View>
      </TouchableOpacity>
      {isDropdownVisible && (
        <View style={styles.dropdown}>
          {/* Add your dropdown buttons here */}
          <TouchableOpacity onPress={() => navigateToAnotherPage("IncidentReportForm")}>
            <Text>Create Incident Report</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigateToAnotherPage("TipsPage")}>
            <Text>Add Tip and View</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigateToAnotherPage("citizenReport")}>
            <Text>View Report</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigateToAnotherPage("Graph")}>
            <Text>Starts</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigateToAnotherPage("Login")}>
            <Text>Log Out</Text>
          </TouchableOpacity>
          {/* Add more buttons as needed */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  headerRoot: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 35,
  },
  dropdown: {
    position: "absolute",
    top: "100%",
    right: 0,
    backgroundColor: "white",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
});

export default Heading;
