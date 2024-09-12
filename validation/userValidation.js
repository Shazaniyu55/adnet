const Joi = require('joi');

const registrationSchema = Joi.object({
  businessName: Joi.string().min(2).required(),
  ownerName: Joi.string().min(2).required(),
  businessRegNo: Joi.alternatives().try(
    Joi.string().alphanum().min(6),
    Joi.number().min(100000) // Adjust the min value if needed
  ).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
  subscriptionLevel: Joi.number().valid(2500, 5000, 25000).required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

module.exports = { registrationSchema, loginSchema };
