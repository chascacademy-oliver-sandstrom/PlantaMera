const User = require('../models/Profile/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const express = require('express');



exports.register = async (req, res) => {
  console.log("User Registration request received with the following data:");
  console.log(req.body);
  // console.log(token, jwtToken);
  const { firstName, lastName, userName, email, password } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create a new user
    user = new User({
      firstName,
      lastName,
      userName,
      email,
      password
    });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save the user to the database
    await user.save();

    // Create and return a JWT token and bind token
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token, points: user.points });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid email or password' });
    }

    // Compare the provided password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid email or password' });
    }

    // Create and return a JWT token
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token, points: user.points });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const auth = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by ID
    let  user = await User.findById(decoded.user.id);

    // Check if user exists
    if (!user) {
      return res.status(401).json({ msg: 'Token is not valid' });
    }

    // Add user object to request object
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

exports.addPoints = async (req, res) => {
  try {
    const userId = req.user.id; // Get the user ID from the authenticated user
    const { pointsToAdd } = req.body;  // Get the number of points to add from the request body

    const co2Saved = pointsToAdd * 80

    // Update the user's points in the database
    const user = await User.findByIdAndUpdate(
      userId,
      { $inc: { 
        points: pointsToAdd,
        totalCO2Saved: co2Saved }
       }, 
      { new: true } // Return the updated user object
    );

    // Return the new total points to the frontend
    res.json({ points: user.points, totalCO2Saved: user.totalCO2Saved });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


exports.getUserPoints = async (req, res) => {
  try {
    const userId = req.user.id; // Get the user ID from the authenticated user

    // Retrieve the user from the database
    const user = await User.findById(userId);

    // Return the user's points
    res.json({ points: user.points });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

//gets all users for the leaderboard
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // exclude password field
    res.json(users);
  } catch (error) {
    res.status(500).json({ msg: 'Error retrieving users.' });
  }
};


exports.getTotalCO2Saved = async (req, res) => {
  try {
    const userId = req.user.id; // Get the user ID from the authenticated user

    // Retrieve the user from the database
    const user = await User.findById(userId);

    // Return the user's totalCO2Saved
    res.json({ totalCO2Saved: user.totalCO2Saved });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


exports.redeemPoints = async (req, res) => {
  try {
    // gets user id from authenticated user
    const userId = req.user.id; 

    //get the amount of points to redeem from requested body
    const { pointsToRedeem } = req.body; 

    //retrieve the user from the database
    let user = await User.findById(userId);

    if (user.points < pointsToRedeem) {
      return res.status(400).json({ msg: 'Not enough points to redeem' });
    }

    // Update the users points in the database
    user = await User.findByIdAndUpdate(
      userId,
      {$inc: { points: -pointsToRedeem } }, //Decrease points by specified value
      { new: true } // return updated user object
      );

      //Return the new total points to frontend
      res.json({points: user.points });
  } catch (err) {
      console.error(err.message);
      res.status(500).send ('Server error');
  }
};

//gets user data for the profile and leaderboard
exports.getUserData = async (req, res) => {
  try {
    const userId = req.user.id; // Get the user ID from the authenticated user

    // Retrieve the user from the database
    const user = await User.findById(userId);

    // Return the user data
    res.json({
      userName: user.userName,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      points: user.points,
      totalCO2Saved: user.totalCO2Saved,
      profilePic: user.profilePicture
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};





exports.auth = auth;
