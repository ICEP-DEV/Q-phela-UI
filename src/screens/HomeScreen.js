import React, { useState } from 'react';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeScreen = () => {
  const [hoveredButton, setHoveredButton] = useState(null);

  const handleButtonPressIn = (button) => {
    setHoveredButton(button);
  };

  const handleButtonPressOut = () => {
    setHoveredButton(null);
  };

  const buttonStyle = (name) => ({
    ...styles.button,
    transform: [
      { scale: hoveredButton === name ? 1.2 : 1 } // Increase the size when button is pressed
    ]
  });

  return (
    <View style={{ flex: 1 }}>
      <ScrollView horizontal>
        {/* Add your other horizontally scrollable components here */}
        <View style={{ width: 1000, height: 200, backgroundColor: 'lightgray' }}>
          {/* Your content 1 */}
        </View>
        <View style={{ width: 1000, height: 200, backgroundColor: 'lightblue' }}>
          {/* Your content 2 */}
        </View>
        {/* Add more components here */}
      </ScrollView>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={buttonStyle("home")}
          onPressIn={() => handleButtonPressIn("home")}
          onPressOut={handleButtonPressOut}
        >
          <Icon name="home" size={30} color="blue" />
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={buttonStyle("settings")}
          onPressIn={() => handleButtonPressIn("settings")}
          onPressOut={handleButtonPressOut}
        >
          <Icon name="cogs" size={30} color="green" />
          <Text>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={buttonStyle("contact")}
          onPressIn={() => handleButtonPressIn("contact")}
          onPressOut={handleButtonPressOut}
        >
          <Icon name="envelope" size={30} color="red" />
          <Text>Contact</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={buttonStyle("report")}
          onPressIn={() => handleButtonPressIn("report")}
          onPressOut={handleButtonPressOut}
        >
          <Icon name="flag" size={30} color="orange" />
          <Text>Report</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={buttonStyle("tips")}
          onPressIn={() => handleButtonPressIn("tips")}
          onPressOut={handleButtonPressOut}
        >
          <Icon name="lightbulb-o" size={30} color="yellow" />
          <Text>Tips</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={buttonStyle("stars")}
          onPressIn={() => handleButtonPressIn("stars")}
          onPressOut={handleButtonPressOut}
        >
          <Icon name="star" size={30} color="gold" />
          <Text>Stars</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderColor: 'lightgray',
    padding: 10,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
};

export default HomeScreen;
