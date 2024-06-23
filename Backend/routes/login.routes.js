const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/user.model");
require("dotenv").config();

router.post("/signup", async (req, res) => {
  const { name, email, password, role } = req.body;
  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };
  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    return res.status(400).json({ message: "Email is taken" });
  }
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (!validateEmail(email)) {
    return res.status(400).json({ message: "Invalid email" });
  }
  const newUser = new User({
    name: name,
    email: email,
    password: password,
    role: role || "user",
  });
  try {
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
