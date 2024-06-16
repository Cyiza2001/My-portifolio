const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const decodeToken = (token) => {
  try {
    const verifiedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(
      verifiedToken,
      verifiedToken.email,
      verifiedToken.role,
      "wahatwitse man"
    );
    return verifiedToken;
  } catch (err) {
    console.log(err, "wahiye sha");
    return null;
  }
};

module.exports = decodeToken;
