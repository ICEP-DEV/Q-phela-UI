const express = require('express');
const router = express.Router();
const routeRecommededController = require('../controllers/routeRecommededController');

// Define route
router.post('/create', routeRecommededController.createRouteRecommendation);
router.get('/recommendations', routeRecommededController.getAllRouteRecommendations);


module.exports = router;
