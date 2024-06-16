const router = require("express").Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");

const {
  getBlogs,
  postBlog,
  deleteBlog,
  updateBlog,
} = require("../controllers/blog.controllers");

router.get("/", getBlogs);
router.post("/", upload.single("image"), postBlog);
router.delete("/:id", deleteBlog);
router.put("/:id", upload.single("image"), updateBlog);

module.exports = router;
