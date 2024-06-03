const createUser = require("../controllers/user.controllers");
// const Router = require("express");
const express = require("express");

const userRoutes = express.Router();

userRoutes.post("/", createUser);
userRoutes.get("/", checker, DataTransfer);

module.exports = userRoutes;
