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

// const express = require("express");
// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const Blog = require("./models/blog"); // Adjust the path as needed

// const router = express.Router();

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "blog-images", // Folder name in Cloudinary
//     allowed_formats: ["jpg", "png"],
//   },
// });

// const upload = multer({ storage: storage });

// router.post("/blogs", upload.single("image"), async (req, res) => {
//   try {
//     const { title, description } = req.body;
//     const imageUrl = req.file.path; // Cloudinary URL
//     const imagePublicId = req.file.filename; // Cloudinary public ID

//     const blog = new Blog({
//       title,
//       description,
//       imageUrl,
//       imagePublicId,
//     });

//     await blog.save();
//     res.status(201).json(blog);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;

// const cloudinary = require("../utils/cloudinary");
// const upload = require("../utils/multer");
// const Image = require("../models/image.model");

// router.post("/", upload.single("image"), async (req, res) => {
//   try {
//     const result = await cloudinary.uploader.upload(req.file.path);
//     //let's create an instance of the user
//     let userImage = new Image({
//       name: req.body.name,
//       avatar: req.body.avatar,
//       cloudinary_id: result.public_id,
//     });

//     await userImage.save();
//     res.json(userImage);
//   } catch (error) {
//     console.log(error);
//   }
// });

// router.get("/", async (req, res) => {
//   try {
//     let userImage = await Image.find();
//     res.json({ userImage });
//   } catch (error) {
//     console.log(error);
//   }
// });

// router.delete("/:id", async (req, res) => {
//   try {
//     let userImage = await Image.findById(req.params.id);
//     console.log(req.params.id);
//     console.log(userImage.cloudinary_id);
//     await cloudinary.uploader.destroy(userImage.cloudinary_id);
//     await Image.deleteOne(userImage);
//     res.json(userImage);
//   } catch (error) {
//     console.log(error);
//   }
// });

// router.put("/", upload.single("image"), async (req, res) => {
//   try {
//     let userImage = await Image.findById(req.params.id);
//     await cloudinary.uploader.destroy(userImage.cloudinary_id);
//     await cloudinary.uploader.upload(req.file.path);
//     const data = {
//       name: req.body.name || userImage.name,
//       avatar: result.secure._url || userImage.avatar,
//       cloudinary_id: result.public_id || userImage.cloudinary_id,
//     };
//     userImage = await userImage.findByIdAndUpdate(req.params.id, data, {
//       new: true,
//     });
//     res.json(userImage);
//   } catch (error) {
//     console.log(error);
//   }
// });

// module.exports = router;
