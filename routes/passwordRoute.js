const express = require('express');
const router = express.Router();
const forgotPasswordController = require('../controllers/forgotPasswordController');
const resetPasswordController = require('../controllers/resetPasswordController');

// Route to handle forgot password request
router.post('/forgotPassword', forgotPasswordController.forgotPassword);

// Route to handle password reset with token
router.post('/resetPassword/:token', resetPasswordController.resetPassword);

module.exports = router;
