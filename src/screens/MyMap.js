// import React, { useState, useEffect } from 'react';
// import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
// import "leaflet/dist/leaflet.css";
// import L from 'leaflet';
// import Heading from "../components/landing-screen/Heading";

// function MyMap() {
//   // Define initial coordinates for the map center
//   const initialPosition = [51.505, -0.09];

//   // Define a state variable to track the target coordinates for navigation
//   const [targetPosition, setTargetPosition] = useState(null);

//   // Define a state variable to store the current location coordinates
//   const [currentLocation, setCurrentLocation] = useState(initialPosition);

//   // Function to handle navigation
//   const startNavigation = () => {
//     // Replace this with your navigation logic
//     // Example: Fetch the target coordinates from your navigation system
//     // For demonstration purposes, we'll use a hardcoded value here
//     const targetCoordinates = [52.0, -0.1];
//     setTargetPosition(targetCoordinates);
//   };

//   // Function to handle zoom-in
//   const zoomIn = () => {
//     setZoom((prevZoom) => prevZoom + 1);

//     // When zooming in, center the map on the current location
//     setMapCenter(currentLocation);
//   };

//   // Function to handle zoom-out
//   const zoomOut = () => {
//     setZoom((prevZoom) => prevZoom - 1);
//   };

//   // Function to get the current location
//   const getCurrentLocation = () => {
//     navigator.geolocation.getCurrentPosition((position) => {
//       const { latitude, longitude } = position.coords;
//       setCurrentLocation([latitude, longitude]);
//     });
//   };

//   // Fetch the current location when the component mounts
//   useEffect(() => {
//     getCurrentLocation();
//   }, []);

//   // State variable to manage the zoom level
//   const [zoom, setZoom] = useState(13);

//   // State variable to manage the map center
//   const [mapCenter, setMapCenter] = useState(initialPosition);

//   // State variable to manage the search query
//   const [searchQuery, setSearchQuery] = useState('');

//   // Handle changes in the search input
//   const handleSearchInputChange = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   // Handle search button click
//   const handleSearchButtonClick = () => {
//     // Call a function to perform location search based on the searchQuery
//     // You can implement this function to fetch location coordinates using a geocoding service
//     // For simplicity, let's assume it sets the map center to a hardcoded location
//     setMapCenter([52.0, -0.1]); // Replace with actual coordinates from the search
//   };

//   // Define a custom icon for the current location marker
//   const customerIcon = new L.Icon({
//     iconUrl: 'https://img.icons8.com/?size=48&id=13800&format=png', // Replace with your custom icon URL
//     iconSize: [32, 32], // Adjust the size as needed
//   });

//   return (
//     <div>
//       <Heading /> {/* Include the Heading component here */}
//       <div>
//         <input
//           type="text"
//           placeholder="Search location"
//           value={searchQuery}
//           onChange={handleSearchInputChange}
//         />
//         <button onClick={handleSearchButtonClick}>Search</button>
//       </div>
//       <button onClick={startNavigation}>Start Trip</button>
      
//       <button onClick={getCurrentLocation}>Route recommendation</button>
//       <MapContainer
//         center={mapCenter} // Use mapCenter as the center of the map
//         zoom={zoom}
//         style={{
//           height: 'calc(100vh - 40px)', // Adjust the height to make room for the search box
//           width: '100%',
//           position: 'relative',
//         }}
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//         {targetPosition && <Marker position={targetPosition}><Popup>Navigation Target</Popup></Marker>}
//         <Marker position={currentLocation} icon={customerIcon}><Popup>Current Location</Popup></Marker>
//         <ZoomControl position="bottomright" />
//       </MapContainer>
//     </div>
//   );
// }

// export default MyMap;
