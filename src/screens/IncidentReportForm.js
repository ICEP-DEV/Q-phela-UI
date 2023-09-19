import React, { useState } from 'react';
import Heading from "../components/landing-screen/Heading";
import axios from 'axios';

//const API_BASE_URL = 'http://localhost:3003'; // Update with your server's URL

const incidentTypes = [
  { label: 'Car jacking', value: 'Car jacking' },
  { label: 'Robbery', value: 'Robbery' },
  { label: 'Kidnapping', value: 'Kidnapping' },
  // Add more incident types as needed
];

const IncidentReportForm = () => {
  const [incident, setIncident] = useState({
    location: '',
    incidentType: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIncident({
      ...incident,
      [name]: value,
    });
  };
   
  const handleSubmit = async (e) => {
    var citizen_id=localStorage.getItem("citizen_id")
    var locaton=localStorage.getItem("name")
    var report={rep_description:incident.description,incident_type:incident.incidentType, citizen_id:Number(citizen_id)}
    console.log(report)
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:3003/report`, {
        location: localStorage.getItem("location_id"),
        incidentType: incident.incidentType,
        description: incident.description,
        citizen_id: localStorage.getItem("citizen_id"), // Replace with the actual citizen ID
      });

      if (response.status === 201) {
        console.log('Report created successfully');
        setIncident({
          location: '',
          incidentType: '',
          description: '',
        });
      }
    } catch (error) {
      console.error('Error creating report:', error);
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
                    className="radio-input"
                  />
                  {type.label}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="incident-description-label">Incident Description:</label>
            <textarea
              name="description"
              value={incident.description}
              onChange={handleChange}
              className="incident-description"
            />
          </div>

          <div className="btn-container">
            <button type="submit" className="btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IncidentReportForm;
