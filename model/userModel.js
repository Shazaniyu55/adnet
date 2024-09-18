const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  businessName: { 
    type: String, 
    required: true 
  },
  ownerName: { 
    type: String, 
    required: true 
  },
  businessRegNo: { 
    type: String, // Changed to String to accommodate alphanumeric values or dashes
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  
  subscriptionLevel: { 
    type: Number, 
    required: true,
    enum: [2500, 5000, 25000], // Optional: Enforcing only predefined subscription levels
  }
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(12); // Using a stronger salt factor
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
