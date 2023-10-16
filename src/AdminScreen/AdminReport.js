import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const AdminReport = () => {
  const [reports, setReports] = useState([]);
  const [contactInfo, setContactInfo] = useState({});
  const [clickedReportId, setClickedReportId] = useState(null);

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

  const handleContactClick = async (report) => {
    if (!report || !report.report_id) {
      console.error('Invalid report:', report);
      return;
    }
 
    const report_id = report.report_id;
    console.log('Report ID:', report_id);
 
    try {
      await AsyncStorage.setItem('report_id', report_id);
 
      // Fetch citizen's contact info based on the stored incident report ID
      axios.get(`http://localhost:3000/admin/reports/${report_id}/contact`)
        .then((response) => {
          const contactInfo = response.data;
          console.log('Contact Information:', contactInfo);
 
          // Update the contactInfo state with the fetched contact info
          setContactInfo(prevContactInfo => ({
            ...prevContactInfo,
            [report_id]: contactInfo
          }));
 
          // Set the clicked report ID
          setClickedReportId(report_id);
        })
        .catch(error => {
          console.error('Error fetching contact info:', error);
        });
    } catch (error) {
      console.error('Error retrieving report_id from AsyncStorage:', error);
    }
  }
 

  return (
    <ScrollView style={styles.container}>
    <Text style={styles.header}>Incident Reports</Text>

    {reports.map((report, index) => (
      <View key={index} style={styles.reportContainer}>
        {/* Display incident type and description */}
        <Text style={styles.label}>Incident Type:</Text>
        <Text>{report.incident_type}</Text>
        <Text style={styles.label}>Description:</Text>
        <Text>{report.rep_description}</Text>
        <Text style={styles.label}>Location:</Text>
        <Text>{[report.report_id].location_id}</Text>

        {/* Contact Button */}
        <TouchableOpacity
          style={styles.contactButton}
          onPress={() => handleContactClick(report)}
        >
          <Text style={styles.contactButtonText}>Contact</Text>
        </TouchableOpacity>
         {/* Display contact information for the clicked report */}
         {clickedReportId === report.report_id && contactInfo[report.report_id] && (
  <View style={styles.contactInfo}>
    <Text style={styles.label}>Contact Information</Text>
    <Text style={{ fontWeight: 'bold' }}>Name:</Text>
    <Text>{contactInfo[report.report_id].citizen_name}</Text>
    <Text style={{ fontWeight: 'bold' }}>Contact:</Text>
    <Text>{contactInfo[report.report_id].contact_number}</Text>
    <Text style={{ fontWeight: 'bold' }}>Email:</Text>
    <Text>{contactInfo[report.report_id].email}</Text>
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