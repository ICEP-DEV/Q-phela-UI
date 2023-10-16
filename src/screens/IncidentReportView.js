import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
const AdminReport = () => {
  const [reports, setReports] = useState([]);
  const [contactInfo, setContactInfo] = useState({});

  useEffect(() => {
    // Fetch incident data from your API or database here
    axios.get('http://localhost:3000/admin/reports')
      .then((response) => {
        setReports(response.data);
      })
      .catch(error => {
        console.error('Error fetching reports:', error);
      });
  }, []);

  const handleContactClick = async (report_id) => {
    //var report_id= localStorage.getItem("report_id")
    try {
        const storedReportId = await AsyncStorage.getItem('report_id');
    //console.log(report_id);  
    console.log('Stored Report ID:', storedReportId);
    // Fetch citizen's contact info based on the incident report
    axios.get(`http://localhost:3000/admin/reports/${storedReportId}/contact`)
      .then((response) => {
        setContactInfo(prevContactInfo => ({
          ...prevContactInfo,
          [report_id]: response.data
        }));
      })
      .catch(error => {
        console.error('Error fetching contact info:', error);
      })
    
} catch (error) {
  console.error('Error retrieving report_id from AsyncStorage:', error);
}
}
  


  return (
    <ScrollView style={styles.container}>
      {/* Display incident reports */}
      <Text style={styles.header}>Incident Reports</Text>

      {reports.map((report, index) => (
        <View key={index} style={styles.reportContainer}>
          <Text style={styles.label}>Incident Type:</Text>
          <Text>{report.incident_type}</Text>
          <Text style={styles.label}>Incident Description:</Text>
          <Text>{report.rep_description}</Text>

          {/* Contact Button */}
          <TouchableOpacity
            style={styles.contactButton}
            onPress={() => handleContactClick(report.reportS_id)}
          >
            <Text style={styles.contactButtonText}>Contact</Text>
          </TouchableOpacity>

          {/* Display contact information */}
          {contactInfo[report.citizen_id] && (
            <View style={styles.contactInfo}>
              <Text style={styles.label}>Contact Information</Text>
              <Text>Name: {contactInfo[report.citizen_id].name}</Text>
              <Text>Email: {contactInfo[report.citizen_id].email}</Text>
              <Text>Contact: {contactInfo[report.citizen_id].contact}</Text>
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  reportContainer: {
    marginBottom: 24,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 16,
  },
  label: {
    fontWeight: 'bold',  // Bold style for labels
  },
  contactButton: {
    backgroundColor: 'black',
    paddingVertical: 6,  // Adjusted padding
    paddingHorizontal: 12, // Adjusted padding
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    alignSelf: 'flex-start', // Align to the left
  },
  contactButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,  // Adjusted font size
  },
  contactInfo: {
    marginTop: 10,
  },
});

export default AdminReport;