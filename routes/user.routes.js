const createUser = require("../controllers/user.controllers");
const checkAdminRole = require("../middlewares/checkAdminRole.middleware");
// const Router = require("express");
const express = require("express");

const userRoutes = express.Router();

userRoutes.post("/admin", checkAdminRole, createUser);

// userRoutes.get("/",  DataTransfer);

module.exports = userRoutes;
