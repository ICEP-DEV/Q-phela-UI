// Import the module
const RouteRecommended = require('../models/recommededRoutes'); // Route

// Controller function
const createRouteRecommended = async (req, res) => {
  try {
    // Logic to create a new recommended route
    const { rec_description, start_location, end_location, citizen_id, location_id } = req.body;
    
    const newRouteRecommendation = await RouteRecommended.create({
      rec_description,
      start_location,
      end_location,
      citizen_id,
      location_id,
    });/*
    CREATE TABLE recommendation (
      recommendation_id INT PRIMARY KEY AUTO_INCREMENT,
      rec_description TEXT,
      start_location VARCHAR(255),
      end_location VARCHAR(255),
        citizen_id INT,
      FOREIGN KEY (citizen_id) REFERENCES citizen(citizen_id),
      location_id INT,
   FOREIGN KEY (location_id) REFERENCES location(location_id)
  );*/
    return res.status(201).json(newRouteRecommendation);
  } catch (error) {
    console.error('Error creating route recommendation:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const getAllRouteRecommendations = async (req, res) => {
  try {
    // retrieve the routes
    const routeRecommendation = await RouteRecommended.findAll();
    
    return res.status(200).json(routeRecommendations);
  } catch (error) {
    console.error('Error retrieving route recommendations:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Export controller functions
module.exports = {
  createRouteRecommended,
  getAllRouteRecommendations,
};
