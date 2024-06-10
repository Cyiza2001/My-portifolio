const express = require("express");
const router = express.Router();
const { likeBlog, getLikes } = require("../controllers/like.controllers");
const authenticateToken = require("../middlewares/auth.middleWare");

router.post("/like", authenticateToken, likeBlog);
router.get("/likes/:blogId", getLikes);

module.exports = router;
