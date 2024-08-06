const User = require("../model/user_model");
const bcrypt = require("bcryptjs");
const getRandomUrl = require("../model/profileImages");
const generateToken = require("../../utils/generateToken");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if username or email already exists
    const existingUser = await User.findOne({ username });
    const existingEmail = await User.findOne({ email });

    if (existingUser || existingEmail) {
      return res
        .status(400)
        .json({ error: "Username or email already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Get a random profile picture URL
    const profilePicture = await getRandomUrl();

    // Create the user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      profilePicture: profilePicture || "", // Use the random URL or an empty string if none is found
    });

    // Generate a token for the new user
    const token = generateToken(newUser._id);

    // Set token in cookie
    res.cookie("jwt", token, {
      httpOnly: true, // Prevent client-side access to the cookie
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "None", // Cross-site cookies (use 'Strict' or 'Lax' if not using cross-site)
      maxAge: 3600000, // Cookie expiration in milliseconds (1 hour)
    });

    // Send the response with the user details and token
    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      profilePicture: newUser.profilePicture,
      token, // Include the token in the response
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    console.log(user);
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Username or Password" });
    }

    // Update isActive field
    user.isActive = true;
    await user.save();

    // Generate token and set it in the cookies
    // await generateToken(user._id);
    // Generate token
    const token = generateToken(user._id);

    // Set token in cookie
    res.cookie("jwt", token, {
      httpOnly: true, // Prevent client-side access to the cookie
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "None", // Cross-site cookies (use 'Strict' or 'Lax' if not using cross-site)
      maxAge: 3600000, // Cookie expiration in milliseconds (1 hour)
    });

    // Exclude password field manually before sending response
    console.log(user);
    const { password: pwd, ...userWithoutPassword } = user.toObject();
    userWithoutPassword.token = token; // Add token to response body
    console.log(`without: ${userWithoutPassword}`);
    return res.status(200).json(userWithoutPassword);
  } catch (error) {
    if (!res.headersSent) {
      return res.status(500).json({ message: error.message });
    }
    console.error("Error after headers sent:", error);
  }
};

exports.logout = async (req, res) => {
  try {
    // Retrieve the user ID from the request parameters
    const { userId } = req.params;

    // Clear the JWT cookie
    res.cookie("jwt", "", { maxAge: 0 });

    // Find the user by ID and update the isActive field
    const user = await User.findById(userId);
    if (user) {
      user.isActive = false;
      const date = new Date();

      // Offset in milliseconds (1 hour = 3600000 milliseconds)
      const offset = 1 * 60 * 60 * 1000; // GMT+1
      const localDate = new Date(date.getTime() + offset);
      user.lastActive = localDate; // Set lastActive to the current time
      await user.save();
      res.status(200).json({ message: "Logged out Successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
