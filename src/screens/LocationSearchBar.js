// // LocationSearchBar.js

// import React, { useState } from 'react';
// import { SearchControl, OpenStreetMapProvider } from "react-leaflet-geosearch";

// function LocationSearchBar({ mapInstance }) {
//   const [provider] = useState(new OpenStreetMapProvider());
  
//   const searchOptions = {
//     provider,
//     showMarker: false, // Do not display a marker for the search result
//     showPopup: false, // Do not display a popup for the search result
//     autoClose: true, // Close the search results panel on selection
//   };

//   const handleSearch = (searchText) => {
//     if (mapInstance && searchText) {
//       provider.search({ query: searchText })
//         .then((results) => {
//           if (results && results.length > 0) {
//             // Get the first result and set it as the map center
//             const result = results[0];
//             const { x, y } = result;
//             mapInstance.flyTo([y, x], 16); // You can adjust the zoom level (16 in this example)
//           }
//         })
//         .catch((error) => {
//           console.error('Error while searching:', error);
//         });
//     }
//   };

//   return (
//     <SearchControl
//       className="custom-search-bar"
//       search={handleSearch}
//       {...searchOptions}
//     />
//   );
// }

// export default LocationSearchBar;
