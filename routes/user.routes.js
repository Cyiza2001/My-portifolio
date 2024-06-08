const {
  createUser,
  getUser,
  deleteUser,
  deleteAllUsers,
  updateUser,
} = require("../controllers/user.controllers");
const authenticateToken = require("../middlewares/auth.middleWare");
const checkAdminRole = require("../middlewares/checkAdminRole.middleware");
// const Router = require("express");
const express = require("express");

const userRoutes = express.Router();

userRoutes.post("/post/admin", authenticateToken, checkAdminRole, createUser);
userRoutes.get("/get/admin", authenticateToken, getUser);
userRoutes.delete(
  "/deleteOne/admin/:id",
  authenticateToken,
  checkAdminRole,
  deleteUser
);
userRoutes.delete(
  "/deleteAll/admin",
  authenticateToken,
  checkAdminRole,
  deleteAllUsers
);
userRoutes.put("/put/admin/:id", authenticateToken, updateUser);

module.exports = userRoutes;
