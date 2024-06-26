const router = require("express").Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const authenticateToken = require("../middlewares/auth.middleWare");
const checkAdminRole = require("../middlewares/checkAdminRole.middleware");

const {
  getBlogs,
  postBlog,
  deleteBlog,
  updateBlog,
} = require("../controllers/blog.controllers");

router.get("/", authenticateToken, checkAdminRole, getBlogs);
router.post(
  "/",
  authenticateToken,
  checkAdminRole,
  upload.single("image"),
  postBlog
);
router.delete("/:id", authenticateToken, checkAdminRole, deleteBlog);
router.put(
  "/:id",
  authenticateToken,
  checkAdminRole,
  upload.single("image"),
  updateBlog
);

module.exports = router;
