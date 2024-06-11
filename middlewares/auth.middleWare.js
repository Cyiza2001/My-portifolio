const jwt = require("jsonwebtoken");
require("dotenv").config();

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null)
    return res.sendStatus(401).json({
      message: "login to continue",
    });
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json("failed to verify token");
    req.user = user;
    console.log(req.user);

    next();
  });
}

module.exports = authenticateToken;
