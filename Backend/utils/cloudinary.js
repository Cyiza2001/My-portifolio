const cloudinary = require("cloudinary").v2;
console.log("kibwa", process.env.CLOUDINARY_API_KEY);
cloudinary.config({
  cloud_name: "dj4xvns77",
  api_key: "997485674676454",
  api_secret: "JWWAyM2l3z9V0BZfsy3jOe2gJKM",
});

module.exports = cloudinary;
