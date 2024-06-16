// const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv");
// const User = require("../models/user.model");

// dotenv.config();
// const generateToken = (user) => {
//   const token = jwt.sign(
//     { id: user.id, role: user.role, email: user.email },
//     process.env.ACCESS_TOKEN_SECRET,
//     {
//       expiresIn: "10d",
//     }
//   );
//   return token;
// };
// module.exports = generateToken;
