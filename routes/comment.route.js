const {
  getComments,
  addComment,
  deleteComment,
  editComment,
} = require("../controllers/comment.controller");
const authenticateToken = require("../middlewares/auth.middleWare");
const router = require("express").Router();

router.get("/:blogId", authenticateToken, getComments);
router.delete("/:id", authenticateToken, deleteComment);
router.post("/", authenticateToken, addComment);
router.put("/:id", authenticateToken, editComment);

module.exports = router;
