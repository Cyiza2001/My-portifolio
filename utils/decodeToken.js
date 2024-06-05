const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const decodeToken = (token) => {
  try {
    const verifiedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(verifiedToken.email, verifiedToken.role, "wahatwitse man");
    return verifiedToken;
  } catch (err) {
    console.log(err, "wahiye sha");
    return null;
  }
};

module.exports = decodeToken;
// const checkroles=(res,req,next)
// const token = req.headers
//   if (token) {
//     const decode =jwt.verify(token, process.env.process.env.ACCESS_TOKEN_SECRET);
//     if(decoded.role === admiin){
//         next()
//     }
//     else{
//         res.status(401).json({message:"you are not an admin"})
//     }
//   }
