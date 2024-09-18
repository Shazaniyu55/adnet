const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const User = require('../model/userModel');
const { resetPasswordSchema } = require('../validation/userValidation'); // Import Joi schema

// Reset Password 
exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  // Validate the request body using Joi schema
  const { error } = resetPasswordSchema.validate({ password });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    // Find the user with the provided token and check if it has expired
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() } // Token should be valid
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Hash the new password and update the user's password
    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;  // Clear the reset token
    user.resetPasswordExpires = undefined;  // Clear the token expiration
    await user.save();

    res.status(200).json({ message: 'Password has been reset successfully' });
  } catch (err) {
    console.error('Error resetting password:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
