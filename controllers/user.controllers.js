const User = require("../models/user.model");
const generateToken = require("../utils/token.utils");
const decodeToken = require("../utils/decodeToken");

const createUser = async (req, res) => {
  const { Firstname, email, password, role } = req.body;
  console.log(req.body);
  const userObj = {
    Firstname: Firstname,
    email: email,
    password: password,
    role: role,
  };
  console.log(userObj);
  try {
    const createdUser = await User.create(userObj);
    const token = generateToken(createdUser);
    console.log(token, "iyi niyo token ya nyayo");
    console.log(decodeToken(token));
    res.status(201).json({
      message: "User created successfully",
      data: createdUser,
      token: token,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
const getUser = async (req, res) => {
  try {
    const user = await User.find({});
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message }, "User not found");
  }
};
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) return res.status(404).json("User does not exist");
    await User.findByIdAndDelete(id);
    res.status(200).json("user deleted successfully");
  } catch (err) {
    res.status(500).json({ message: err.message }, "failed to delete user");
  }
};
const deleteAllUsers = async (req, res) => {
  try {
    await User.deleteMany({});
    res.status(200).json("All users deleted successfully");
  } catch (err) {
    res.status(500).json({
      message: err.message,
      description: "Failed to delete all users",
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { Firstname, role, email, password } = req.body;
    const user = await User.findById(id);
    if (!user) return res.status(404).json("User does not exist");
    const updatedData = {
      Firstname: Firstname || user.Firstname,
      role: role || user.role,
      email: email || user.email,
      password: password || user.password,
    };

    const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = {
  createUser,
  getUser,
  deleteUser,
  deleteAllUsers,
  updateUser,
};
