const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const visionController = require('../controllers/visionController');

// Route to create a new user
router.post('/register', userController.register);

// Route to log in
router.post('/login', userController.login);

// Route to get protected data (requires authentication)
router.get('/protected-route', userController.auth, (req, res) => {
  res.json({ msg: 'This is a protected route.' });
});

// Route to get all users
router.get('/allUsers', userController.auth, userController.getAllUsers);

// Route to analyze receipt image and add points
router.post('/analyzeReceipt', userController.auth, visionController.analyzeImage);

// Route to get user points
router.get('/points', userController.auth, userController.getUserPoints);

// Route to get total CO2 saved
router.get('/totalCO2Saved', userController.auth, userController.getTotalCO2Saved);

// Route to get user data
router.get('/userData', userController.auth, userController.getUserData);

// Route to add points
router.post('/addPoints', userController.auth, userController.addPoints);

// Route to redeem points
router.post('/redeemPoints', userController.auth, userController.redeemPoints);

// Route to get Google Maps API key
router.get('/google-maps-key', (req, res) => {
  const googleMapsKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  res.json({ googleMapsKey });
});

module.exports = router;
