const Joi = require('joi');
const bcrypt = require('bcrypt'); // If bcrypt is needed later in the code

// Register Validation
const registrationSchema = Joi.object({
  businessName: Joi.string().min(2).required(),
  ownerName: Joi.string().min(2).required(),
  businessRegNo: Joi.alternatives().try(
    Joi.string().pattern(/^[a-zA-Z0-9\-]+$/).min(6),  // regular expression to allow alphanumeric and dash
    Joi.number().min(100000)  // Minimum value for a number
  ),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
  subscriptionLevel: Joi.number().valid(2500, 5000, 25000).required()
});

// Login Validation
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

// Update Schema Validation
const updateSchema = Joi.object({
  businessName: Joi.string().optional(),
  ownerName: Joi.string().optional(),
  businessRegNo: Joi.string().optional(),
  email: Joi.string().email().optional(),
  subscriptionLevel: Joi.string().optional(),
});

// Validation schema for forgot password (email input only)
const forgotPasswordEmailSchema = Joi.object({
  email: Joi.string().email().required().label('Email'),
});


// Reset Password Validation Schema
const resetPasswordSchema = Joi.object({
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password should be at least 6 characters long',
    'any.required': 'Password is required'
  }),
});

// Export schemas
module.exports = { registrationSchema, loginSchema, updateSchema, forgotPasswordEmailSchema, resetPasswordSchema };
