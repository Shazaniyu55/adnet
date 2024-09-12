const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  businessName: { type: String
    , required: true 

  },
  ownerName: { type: String,
     required: true 

  },

  businessRegNo: { type: Number,
     required: true

   },
  email: { type: String, required: true,
     unique: true

   },
  password: { type: String,
     required: true

   },
  subscriptionLevel: { type: Number,
     required: true

   }
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
