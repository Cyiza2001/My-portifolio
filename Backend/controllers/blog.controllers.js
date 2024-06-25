const router = require("express").Router();
const Blog = require("../models/blog.model");
const cloudinary = require("../utils/cloudinary");

//get a blog from the database
const getBlogs = async (req, res) => {
  try {
    const blog = await Blog.find({});
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//post a blog in the database

const postBlog = async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = await cloudinary.uploader.upload(req.file.path);
    console.log(image.url);
    const imageUrl = image.url;

    const imagePublicId = image.public_id;
    const blog = new Blog({
      title,
      description,
      imageUrl,
      imagePublicId,
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//delete a blog from the database
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) return res.status(404).json({ message: "blog does not exist" });
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//update an existing blog

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    let updateData = { title, description };

    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json("blog does not exist");
    if (req.file) {
      await cloudinary.uploader.destroy(blog.imagePublicId);
      const image = await cloudinary.uploader.upload(req.file.path);
      console.log(image);
      updateData.imageUrl = image.url;
      updateData.imagePublicId = image.public_id;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.json(updatedBlog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getBlogs,
  postBlog,
  deleteBlog,
  updateBlog,
};
