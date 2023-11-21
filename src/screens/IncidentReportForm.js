//import { NOT_INITIALIZED_ERROR } from '@react-navigation/core/lib/typescript/src/createNavigationContainerRef';
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Heading from '../components/landing-screen/Heading';
import HomeScreen from './HomeScreen';
//import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
const incidentTypes = [
  { label: 'Car jacking', value: 'Car jacking' },
  { label: 'Robbery', value: 'Robbery' },
  { label: 'Kidnapping', value: 'Kidnapping' },
  { label: 'Other', value: 'Other' },
];
const IncidentReportForm = () => {
  const [incident, setIncident] = useState({
    location: '',
    incidentType: '',
    description: '',
    customIncidentType: '',
  });
  const handleChange = (name, value) => {
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
  const handleSubmit = () => {
    const { location, incidentType, description, customIncidentType } = incident;
    // Your axios request here
    // Replace the axios request with the appropriate code for making a network request in React Native
  };
  const handleIncidentTypeChange = (value) => {
    if (value === 'Other') {
      handleChange('description', ''); // Clear description when 'Other' is selected
    }
    handleChange('incidentType', value);
  };
  return (
    <View style={styles.container}>

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
 
  onPress={handleSubmit} 
  style={styles.button}
  />
 <View>
 <HomeScreen style={styles.HomeScrn}/>
 </View>
  
  
    </View>
  );
};
const styles = {
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#D3D3D3',
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
    backgroundColor: '#FFFFFF',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button:{
    marginBottom:50,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    Color:'black',
  },
  HomeScrn:{
    marginTop:20,
    alignSelf: 'flex-end',
    
  },
  textArea: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    minHeight: 100,
  },
};
export default IncidentReportForm;