const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const authController = require('../controllers/authController');

// AI Routes
router.post('/chat', aiController.chat);
router.get('/predict-price', aiController.predictPrice);

// Auth Routes
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

// Train Routes
const trainController = require('../controllers/trainController');
router.get('/trains/search', trainController.searchTrains);

// Booking Routes
const bookingController = require('../controllers/bookingController');
router.post('/bookings', bookingController.createBooking);
router.get('/bookings', bookingController.getUserBookings);

module.exports = router;
