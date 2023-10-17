import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AdminDashboard = () => {
  const navigation = useNavigation();

  const handleTipsNavigation = () => {
    // Navigate to AdminTips
    navigation.navigate('AdminTips');
  };

  const handleReportsNavigation = () => {
    // Navigate to AdminReports
    navigation.navigate('AdminReport');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to the Admin Dashboard!</Text>

      {/* Tips View Page */}
      <Pressable onPress={handleTipsNavigation}>
        <View style={[styles.section, { backgroundColor: '#f0f0f0' }]}>
          <Text style={styles.sectionHeader}>Tips View Page</Text>
          <Text style={styles.linkText}>Click here to navigate to Tips View Page</Text>
        </View>
      </Pressable>

      {/* Report View Page */}
      <Pressable onPress={handleReportsNavigation}>
        <View style={[styles.section, { backgroundColor: '#f0f0f0' }]}>
          <Text style={styles.sectionHeader}>Report View Page</Text>
          <Text style={styles.linkText}>Click here to navigate to Report View Page</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#f0f0f0', // Light grey background color
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  linkText: {
    color: 'blue', // Blue color for the links
  },
});

export default AdminDashboard;