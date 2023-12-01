const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "q_pheladb"
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Function to fetch coordinates from the location table
async function fetchCoordinatesFromDB() {
  return new Promise((resolve, reject) => {
    const coordinatesSql = 'SELECT latitude, longitude FROM location';
    db.query(coordinatesSql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}



// Function to calculate distance between two sets of coordinates
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}


// Function to check proximity and send alerts
async function checkProximityAndSendAlert(userLatitude, userLongitude) {
  const proximityThreshold = 0.5; // Example: 0.5 km proximity threshold

  try {
    // Fetch reported locations from the database
    const reportedLocations = await fetchCoordinatesFromDB();

    for (const location of reportedLocations) {
      const distance = calculateDistance(userLatitude, userLongitude, location.latitude, location.longitude);

      if (distance <= proximityThreshold) {
        // Simulate sending an alert to the user (replace with your notification logic)
        console.log('Alert: You are approaching a reported danger zone.');
        break; // Stop checking once we find a nearby location
      }
    }
  } catch (error) {
    console.error('Error checking proximity:', error);
  }
}
/*
// Call this function whenever the user's location changes
function onUserLocationChanged(userLatitude, userLongitude) {
  // Check proximity and send alerts
  checkProximityAndSendAlert(userLatitude, userLongitude);
}

// Assume you have an endpoint to receive the user's live location
app.post('/user/location', (req, res) => {
  const { latitude, longitude } = req.body;
  // Call the function to check proximity with the reported zones
  onUserLocationChanged(latitude, longitude);
  res.status(200).json({ message: 'Location received and processed.' });
});*/
app.post('/user/location', (req, res) => {
  const { latitude, longitude } = req.body;
  // Call the function to check proximity with the reported zones
  checkProximityAndSendAlert(latitude, longitude);
  res.status(200).json({ message: 'Location received and processed.' });
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
