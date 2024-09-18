const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserById, updateUser } = require('../controllers/authController'); // Importing your controller functions
const { protect } = require('../middleware/authMiddleware');

// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', protect, loginUser);

// Get user by ID route
router.get('/user/:id', getUserById);

// Update user by ID route
router.put('/user/:id', updateUser);

// Dashboard route
router.get('/dashboard', protect, (req, res) => {
  console.log('User from middleware:', req.user); // Debugging
  res.render('dashboard');
});

// Wallet route
router.get('/wallet', protect, (req, res) => {
  console.log('User from middleware:', req.user); // Debugging
  res.render('dashboard');
});

module.exports = router;
