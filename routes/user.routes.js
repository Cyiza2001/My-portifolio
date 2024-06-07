const {
  createUser,
  getUser,
  deleteUser,
  deleteAllUsers,
  updateUser,
} = require("../controllers/user.controllers");
const checkAdminRole = require("../middlewares/checkAdminRole.middleware");
// const Router = require("express");
const express = require("express");

const userRoutes = express.Router();

userRoutes.post("/admin", createUser);
userRoutes.get("/admin", getUser);
userRoutes.delete("/admin/:id", deleteUser);
userRoutes.delete("/admin", deleteAllUsers);
userRoutes.put("/admin/:id", updateUser);

module.exports = userRoutes;
