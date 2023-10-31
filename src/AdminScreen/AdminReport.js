import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';

const AdminReport = () => {
  const navigation = useNavigation();

  const [reports, setReports] = useState([]);
  const [contactInfo, setContactInfo] = useState({});
  const [clickedReportId, setClickedReportId] = useState(null);

  useEffect(() => {
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

    try {
      await AsyncStorage.setItem('report_id', report_id);

      axios.get(`http://localhost:3000/admin/reports/${report_id}/contact`)
        .then((response) => {
          const contactInfo = response.data;
          console.log('Contact Information:', contactInfo);

          setContactInfo(prevContactInfo => ({
            ...prevContactInfo,
            [report_id]: contactInfo
          }));

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
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Incident Reports</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome name="arrow-left" size={24} color="blue" />
        </TouchableOpacity>
      </View>
      {reports.map((report, index) => (
        <View key={index} style={styles.reportContainer}>
          <Text style={styles.incidentType}>{report.incident_type}</Text>
          <Text style={styles.description}>{report.rep_description}</Text>
          <TouchableOpacity
            style={styles.contactButton}
            onPress={() => handleContactClick(report)}
          >
            <Text style={styles.contactButtonText}>Contact</Text>
          </TouchableOpacity>
          {clickedReportId === report.report_id && contactInfo[report.report_id] && (
            <View style={styles.contactInfo}>
              <Text style={styles.label}>Contact Information</Text>
              <Text style={styles.contactDetail}>
                Name: {contactInfo[report.report_id].citizen_name}
              </Text>
              <Text style={styles.contactDetail}>
                Contact: {contactInfo[report.report_id].contact_number}
              </Text>
              <Text style={styles.contactDetail}>
                Email: {contactInfo[report.report_id].email}
              </Text>
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'grey', // Set the background to grey
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  reportContainer: {
    marginBottom: 24,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 16,
    borderRadius: 10,
    backgroundColor: 'lightgrey',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  incidentType: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    marginBottom: 8,
  },
  contactButton: {
    backgroundColor: 'black', // Set the contact button to black
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  contactButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  contactInfo: {
    marginTop: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2, // Adjust shadow opacity
    shadowRadius: 3,
    elevation: 4, // Adjust the elevation (for Android)
    borderWidth: 1, // Add a border
    borderColor: 'rgba(0, 0, 0, 0.1)', // Light gray border
  },
  label: {
    fontWeight: 'bold',
  },
  contactDetail: {
    marginBottom: 4,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 16,
    marginBottom: 16,
    //backgroundColor: 'white',
  },
  backButton: {
    marginRight: 16,
  },
});

export default AdminReport;