const express = require('express');
const router = express.Router();
const citizenController = require('../controllers/citizenController');

router.post('/register', citizenController.register);
router.post('/login', citizenController.login);

// Profile route i've authenticated
router.get('/profile', authenticate, citizenController.getCitizenProfile);

// Update Profile route i've authenticated
router.put('/profile', authenticate, citizenController.updateCitizenProfile);

// Deletion of Account 
router.delete('/:citizen_id', authenticate, citizenController.deleteCitizenAccount);

module.exports = router;
