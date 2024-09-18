const crypto = require('crypto');
const User = require('../model/userModel');
const sendEmail = require('../utils/emailService');
const { forgotPasswordEmailSchema } = require('../validation/userValidation');

// Forgot Password
exports.forgotPassword = async (req, res) => {
  // Validate email input
  const { error } = forgotPasswordEmailSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { email } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'This email does not exist' });

    // Generate a reset token
    const resetToken = crypto.randomBytes(32).toString('hex');

    // Hash the reset token and set the reset token and expiration time in the user's record
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // Token valid for 15 minutes

    await user.save();

    // Create the reset password URL (send the un-hashed token in the URL)
    const resetUrl = `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`;

    // Define the email content
    const message = `You requested a password reset. Please click the following link to reset your password: ${resetUrl}`;

    // Send email with reset link
    try {
      await sendEmail({
        email: user.email,
        subject: 'Password Reset',
        message,
      });
      res.status(200).json({ message: `Password reset link sent to ${email}` });
    } catch (err) {
      console.error('Error sending email:', err);

      // Clear the reset token and expiration if email sending fails
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();

      // Return specific error message instead of generic one
      return res.status(500).json({ message: 'Failed to send password reset email', error: err.message });
    }
  } catch (err) {
    console.error('Error requesting password reset:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
