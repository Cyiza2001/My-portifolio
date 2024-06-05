require("dotenv").config();
const decodeToken = require("../utils/decodeToken");
const jwt = require("jsonwebtoken");

const checkAdminRole = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header is missing" });
  }
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token is missing" });
  }

  try {
    const decoded = await decodeToken(token);
    console.log(
      decoded.role === "admin",
      "ubuse kuki admin barikumwaka uburenganzira"
    );
    if (decoded.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Access forbidden: you are not an admin" });
    }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = checkAdminRole;
