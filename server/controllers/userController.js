const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const generateToken = (id, username, email) => {
  return jwt.sign({ id, username, email }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });
};

// Register a new user
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    const user = await User.create({ username, email, password });

    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id, user.username, user.email),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error("Error during registration: ", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Login an existing user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
      res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id, user.username, user.email),
      });
    } else {
      res.status(400).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Error during login: ", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user profile: ", error);
    res.status(500).json({ message: "Server error" });
  }
};

// update username
const updateUsername = async (req, res) => {
  try {
    const newUsername = req.body.username;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.username = newUsername;
    await user.save();

    const updateUser = {
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id, user.username, user.email),
    };

    res.status(200).json(updateUser);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    console.error("Error updating username: ", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update email
const updateEmail = async (req, res) => {
  try {
    const newEmail = req.body.email;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.email = newEmail;
    await user.save();

    const updateUser = {
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id, user.username, user.email),
    };

    res.status(200).json(updateUser);
  } catch (error) {
    console.error("Error updating email: ", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update password
const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!(await user.comparePassword(currentPassword))) {
      return res.status(400).json({ message: "Invalid password" });
    }

    user.password = newPassword;
    await user.save();

    const updateUser = {
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id, user.username, user.email),
    };

    res.status(200).json(updateUser);
  } catch (error) {
    console.error("Error updating password: ", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete user account
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // await user.remove();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user account: ", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUsername,
  updateEmail,
  updatePassword,
  deleteUser,
};
