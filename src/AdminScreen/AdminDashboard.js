import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Replace 'FontAwesome' with the desired icon set

const AdminDashboard = () => {
  const navigation = useNavigation();

  const handleTipsNavigation = () => {
    navigation.navigate('AdminTips');
  };

  const handleReportsNavigation = () => {
    navigation.navigate('AdminReport');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        {/* <View style={[styles.section, styles.darkGreyContainer]}> */}
          <Text style={styles.sectionHeader}>Admin Dashboard</Text>
        {/* </View> */}
      </View>

      <View style={styles.contentContainer}>
        <View style={[styles.middleContainer, styles.rightContainer]}>
          <Pressable onPress={handleTipsNavigation}>
            <View style={[styles.linkContainer, styles.darkGreyContainer, styles.fillHorizontal]}>
              <View style={styles.iconContainer}>
                <Icon name="lightbulb-o" size={24} color="black" /> {/* Add the icon here */}
              </View>
              <Text style={styles.linkText}>Explore Tips</Text>
            </View>
          </Pressable>

          <Pressable onPress={handleReportsNavigation}>
            <View style={[styles.linkContainer, styles.darkGreyContainer, styles.fillHorizontal]}>
              <View style={styles.iconContainers}>
                <Icon name="file-text-o" size={24} color="black" /> {/* Add the report icon here */}
              </View>
              <Text style={styles.linkText}>Access Reports</Text>
            </View>
          </Pressable>

          {/* Admin Team Aim Section */}
          <View style={styles.achievementsContainer}>
          <View style={styles.achievementsContainer}>
  <View style={styles.iconContainerss}>
  <Icon name="user" size={24} color="green" />
  </View>
  <Text style={styles.achievementsText}>Our Admin Team's unwavering aim is to deliver exceptional support and services through our innovative app, a beacon that not only raises community awareness but also empowers users with real-time hotspot alerts. With unwavering dedication, we are committed to achieving and maintaining an outstanding user satisfaction rate, consistently exceeding the 95% mark. Together, let's embark on this exciting journey to make our vision a reality, shaping a brighter and safer future for all.
  </Text>
</View>
         
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'grey',
    padding: 16,
  },
  headingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleContainer: {
    width: '100%',
    maxWidth: 400,
  },
  rightContainer: {
    alignItems: 'flex-end',
  },
  linkContainer: {
    marginBottom: 20,
    borderWidth: 1,
    padding: 16,
    borderRadius: 10,
    borderColor: 'black',
    backgroundColor: 'lightgrey',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    flexDirection: 'row', // Align icon and text horizontally
    alignItems: 'center', // Center icon and text vertically
  },
  sectionHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  linkText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  achievementsContainer: {
    marginTop: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  achievementsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  achievementsText: {
    fontSize: 16,
    color: 'black',
    marginBottom: 10,
  },
  lightBlueContainer: {
    backgroundColor: 'lightblue',
  },
  greyContainer: {
    backgroundColor: 'grey',
  },
  darkGreyContainer: {
    backgroundColor: 'darkgray',
  },
  fillHorizontal: {
    flex: 1,
  },
  iconContainer: {
    marginRight: 10, // Add some spacing between the icon and text
    backgroundColor: 'orange', // Set the background color to orange
    borderRadius: 20, // Add some border radius to make it rounded
    padding: 8, // Adjust padding as needed
  },
  iconContainers: {
    marginRight: 10, // Add some spacing between the icon and text
    backgroundColor: 'blue', // Set the background color to orange
    borderRadius: 20, // Add some border radius to make it rounded
    padding: 8, // Adjust padding as needed
  },
  iconContainerss: {
    marginRight: 10, // Add some spacing between the icon and text
   
    borderRadius: 20, // Add some border radius to make it rounded
    padding: 8, // Adjust padding as needed
  },
});


export default AdminDashboard;