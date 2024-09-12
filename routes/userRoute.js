const express = require('express');
const router = express.Router();
const Joi = require('joi');
const registrationSchema = require('./userValidation');

// POST route for user registration
router.post('/register', (req, res) => {
  // Validate the request body against the schema
  const { error } = registrationSchema.validate(req.body);

  if (error) {
    // If validation fails, send a 400 response with the error details
    return res.status(400).json({
      success: false,
      message: error.details[0].message
    });
  }

  // If validation succeeds, proceed with the registration logic
  const { businessName, ownerName, businessRegistrationNumber, email, password, subscriptionLevel } = req.body;
  // Perform registration logic here...

  res.status(201).json({
    success: true,
    message: 'User registered successfully'
  });
});

module.exports = router;
