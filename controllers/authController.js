const jwt = require('jsonwebtoken');
const User = require('../model/userModel');
const { registrationSchema, loginSchema, updateSchema } = require('../validation/userValidation');
const mongoose = require('mongoose'); // Moved mongoose declaration up

// Register user
exports.registerUser = async (req, res) => {
  const { error } = registrationSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { businessName, ownerName, businessRegNo, email, password, subscriptionLevel } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    user = new User({ businessName, ownerName, businessRegNo, email, password, subscriptionLevel });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 3600000 // 1 hour
    });

    res.status(201).json({status: 'success', message: 'Registration successful', token, user});
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


// Login user
exports.loginUser = async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 3600000 // 1 hour
    });

    res.status(200).json({status: 'success', message: 'Login successful', user});
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  const userId = req.params.id;

  // Check if the ID is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid user ID format' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ user });
  } catch (err) {
    console.error('Error fetching user by ID:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  const { error } = updateSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { businessName, ownerName, businessRegNo, subscriptionLevel } = req.body;

  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.businessName = businessName || user.businessName;
    user.ownerName = ownerName || user.ownerName;
    user.businessRegNo = businessRegNo || user.businessRegNo;
    user.subscriptionLevel = subscriptionLevel || user.subscriptionLevel;

    await user.save();

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Logout user
exports.logoutUser = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
  });
  res.redirect('/login');
};
