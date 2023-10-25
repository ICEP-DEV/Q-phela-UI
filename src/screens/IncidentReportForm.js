import React, { useState } from 'react';
import Heading from "../components/landing-screen/Heading";
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";

//const API_BASE_URL = 'http://localhost:3003'; // Update with your server's URL

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

  return (
    <div className="container">
      <style>
        {`
          .container {
            max-width: 400px;
            margin: 0 auto;
            padding: 20px;
            font-family: 'Poppins', sans-serif;
          }

          h2 {
            text-align: center;
          }

          label {
            font-weight: bold;
            display: block;
            margin-bottom: 5px;
          }

          input, textarea {
            width: 100%;
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 6px;
            font-family: 'Poppins', sans-serif;
            margin-bottom: 10px;
          }

          .radio-container {
            display: flex;
            flex-direction: column;
          }

          .radio-label {
            display: flex;
            align-items: center;
            margin-bottom: 5px;
          }

          .radio-input {
            margin-right: 10px;
          }

          .btn-container {
            display: flex;
            justify-content: flex-end;
          }

          .btn {
            width: 92px;
            height: 24px;
            background-color: black;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-family: 'Poppins', sans-serif;
          }

          .btn:hover {
            background-color: #000000;
          }

          .enter-location {
            height: 29px;
          }

          .incident-description {
            height: 127px;
          }

          .incident-description-label {
            text-align: center;
          }

         

          .custom-incident-input {
            width: calc(100% - 20px); /* Adjust the width to accommodate padding */
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 6px;
            font-family: 'Poppins', sans-serif;
            margin-bottom: 10px;
          }


        `}
      </style>
      <Heading />
      <div className="container">
        <h2>Incident Reporting</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Enter Location:</label>
            <input
              type="text"
              name="location"
              placeholder="Enter your location"
              value={incident.location}
              onChange={handleChange}
              className="enter-location"
            />
          </div>

          <div className="form-group">
            <label>Incident Type:</label>
            <div className="radio-container">
              {incidentTypes.map((type) => (
                <label key={type.value} className="radio-label">
                  <input
                    type="radio"
                    name="incidentType"
                    value={type.value}
                    onChange={handleChange}
                    checked={incident.incidentType === type.value}
                    className="radio-input" />
                  {type.label}
                </label>
              ))}
            </div>
          </div>
{incident.incidentType === 'Other' && (
   <div className="form-group">
    <label>Custom Incident Type:</label>
                <input
                  type="text"
                  name="customIncidentType"
                  placeholder="Enter custom incident type"
                  value={incident.customIncidentType}
                 
                 onChange={handleChange}
                 className="custom-incident-input"
                />
             
            </div>
)}
         

          <div className="form-group">
            <label className="incident-description-label">Incident Description:</label>
            <textarea
              name="description"
              mode="text"
              secure={true}
              placeholder="Type your description"
              value={incident.description}
              onChange={handleChange}
              onChangeText={(e)=> setDescription(e)}
              className="incident-description"
            />
          </div>

          <div className="btn-container">
            <button type="submit" className="btn" onPressedFun={handleSubmit}>
              Submit
             
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IncidentReportForm;