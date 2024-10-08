const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    // required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  profilePicture: {
    type: String,
    default: "", // URL to the profile picture
  },
  Bio: {
    type: String,
    // required: true,
    default: "Hey there! I am using ChatSpace.",
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  lastActive: {
    type: Date,
    default: "",
  },
  // createdAt: {
  //   type: Date,
  //   default: Date.now,
  // },
});

// Create a text index on the username field
UserSchema.index({ username: "text" });

const User = mongoose.model("User", UserSchema);
module.exports = User;
