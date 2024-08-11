const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Router = express.Router();
const User = require('../models/Users');

require('dotenv').config();  // Load environment variables

const JWT_SECRET = process.env.JWT_SECRET || "s@meS3cr3tKey!w1th#random$Characters"; // Use environment variable or fallback

// Route to create a new user
Router.post(
  '/createuser',
  [
    body('email').isEmail(),
    body('password', 'Password must be at least 5 characters long').isLength({ min: 5 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, password, email, location } = req.body;

      // Hash the password before saving
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await User.create({
        name,
        password: hashedPassword,  // Storing hashed password
        email,
        location
      });

      // Create JWT token
      const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '1h' });

      res.status(201).json({
        message: 'User created successfully',
        user: newUser,
        token
      });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({
        message: 'Error creating user',
        error: error.message
      });
    }
  }
);

// Route for user login
Router.post('/Loginuser', [
  body('email').isEmail(),
  body('password', 'Password must be at least 5 characters long').isLength({ min: 5 })
], async (req, res) => {
  const { email, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: 'Email is incorrect'
      });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: 'Password is incorrect'
      });
    }

    // Create JWT token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({
      success: true,
      message: 'User logged in successfully',
      token
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({
      message: 'Error logging in user',
      error: error.message
    });
  }
});

module.exports = Router;
