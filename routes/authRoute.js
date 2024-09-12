// In your routes/authRoute.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login',protect, loginUser);

router.get('/dashboard', protect, (req, res) => {
  console.log('User from middleware:', req.user); // Debugging
  res.render('dashboard');
});

router.get('/wallet', protect, (req, res) => {
  console.log('User from middleware:', req.user); // Debugging
  res.render('dashboard');
});

module.exports = router;
