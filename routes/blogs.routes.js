const router = require("express").Router();
const {
  getBlogs,
  postBlog,
  deleteBlog,
  updateBlog,
} = require("../controllers/blog.controllers");

router.get("/", getBlogs);
router.post("/", postBlog);
router.delete("/:id", deleteBlog);
router.put("/:id", updateBlog);

module.exports = router;
