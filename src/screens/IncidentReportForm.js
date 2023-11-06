import React, { useState } from 'react';
import Heading from "../components/landing-screen/Heading";
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";
import {RadioButton} from "react-native-paper";
//const API_BASE_URL = 'http://localhost:3003'; // Update with your server's URL
import { Text,View, TextInput, Button } from "react-native";
const incidentTypes = [
  { label: 'Car jacking', value: 'Car jacking' },
  { label: 'Robbery', value: 'Robbery' },
  { label: 'Kidnapping', value: 'Kidnapping' },
  { label: 'Other', value: 'Other' },
 
];

const IncidentReportForm = () => {
  const navigation = useNavigation();
  const [incident, setIncident] = useState({
    location: '',
    incidentType: '',
    description: '',
    customIncidentType: '',
  });



 
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'incidentType') {
      setIncident({
        ...incident,
        incidentType: value,
        customIncidentType: '', // Clear custom incident type when a predefined type is selected
      });
    } else if (name === 'customIncidentType') {
      setIncident({
        ...incident,
        customIncidentType: value,
      });
    } else {
      setIncident({
        ...incident,
        [name]: value,
      });
    }
  };
  const [rep_description, setDescription]=useState('')
  const [ incident_type, setIncidentType]=useState('')
  const [error, setError] = useState('');
 


  const handleSubmit = async (e) => {
    e.preventDefault();
 
    const { location, incidentType, description, customIncidentType } = incident;
    const citizen_id = localStorage.getItem("citizen_id");
    const location_id = localStorage.getItem("location_id");
 
    const report = {
      incident_type: incidentType === 'Other' ? customIncidentType : incidentType,
      rep_description: description,
      name: location, // Assuming 'name' corresponds to the location in your backend
      citizen_id: Number(citizen_id),
    };
    console.log(report)
 
    try {
      const response = await axios.post('http://localhost:3007/reports', report);
 
      if (response.status === 201) {
        console.log('Report created successfully');
        setIncident({
          location: '',
          incidentType: '',
          description: '',
          customIncidentType: '',
        });
      }
    } catch (error) {
      console.error('Error creating report:', error);
    }
  };
 

 /* const handleSubmit = async (e) => {
    var citizen_id=localStorage.getItem("citizen_id")
    var location=localStorage.getItem("location_id")
   
    var report={

      rep_description:incident.description,
      incident_type:incident.incidentType,
      citizen_id:Number(citizen_id)
   
    }

    console.log(report)
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:3003/reports`, {
        location: localStorage.getItem("location_id"),
        incident_type: incident.incidentType,
        rep_description:incident.description,
        citizen_id: localStorage.getItem("citizen_id"), // Replace with the actual citizen ID
      }, report);

     

      /*const response = await axios.post('http://localhost:3003/reports', report);

      console.log('Server response:', response.report);

      if (response.status === 201) {
        console.log('Report created successfully');
        setIncident({
          citizen_id: '',
          incident_type: '',
          rep_description: '',
        });
        //navigation.navigate('Login');
      }
    } catch (error) {
      console.error('Error creating report:', error);
    }

   
  };*/

  const handleIncidentTypeChange = (e) => {
    const selectedIncidentType = e.target.value;
    if (selectedIncidentType === 'Other') {
      setDescription(''); // Clear description when 'Other' is selected
      setIncidentType('Other');
    } else {
      setIncidentType(selectedIncidentType);
    }
  };

 

       
      return(
        <View style={styles.container}>
      <Heading />
      <>
      </>
      <Text style={styles.title}>Incident Reporting</Text>
      <TextInput
             style={styles.input}
             placeholder="Enter your location"
             value={incident.location}
             onChangeText={(text) => handleChange('location', text)}
           />
  <Text style={styles.label}>Incident Type:</Text>
      {incidentTypes.map((type) => (
        <View key={type.value} style={styles.radioContainer}>
          <RadioButton
            value={type.value}
            status={incident.incidentType === type.value ? 'checked' : 'unchecked'}
            onPress={() => handleIncidentTypeChange(type.value) }
          />
          <Text>{type.label}</Text>
        </View>
      ))}
          {incident.incidentType === 'Other' && (
        <TextInput
          style={styles.input}
          placeholder="Enter custom incident type"
          value={incident.customIncidentType}
          onChangeText={(text) => handleChange('customIncidentType', text)}
        />
        )}
        <Text style={styles.label}>Incident Description:</Text>
        <TextInput
          style={styles.textArea}
          multiline
          placeholder="Type your description"
          value={incident.description}
          onChangeText={(text) => handleChange('description', text)}
        />

<Button
  color="black"
  backgroundColor="black"
  title="Submit"
  onPress={handleSubmit} s
  tyle={styles.button}
  />
    </View>
  );
};



const styles = {
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'gray',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'lightgray',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    Color:'black',
  },
  textArea: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'lightgray',
    minHeight: 100,
  },
};

export default IncidentReportForm;