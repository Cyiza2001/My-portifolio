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

module.exports = createUser;
