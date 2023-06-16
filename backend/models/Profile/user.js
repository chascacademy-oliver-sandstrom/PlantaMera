//To store user information such as name, email, and password.

//Vi kan ändra eller utöka as needed.


const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
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
  firstName: {
    type: String,
    required: true,
    unique: false
  },
  lastName: {
    type: String,
    required: true,
    unique: false
  },
  profilePicture: {
    type: String,
    default: "/images/defaultProfilePic.png"

  },
  points: {
    type: Number,
    default: 0,
  },
  totalCO2Saved: {
    type: Number,
    default: 0,
  },
  // Add other fields as needed
});

module.exports = mongoose.model('User', UserSchema);
