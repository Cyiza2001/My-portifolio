const router = require("express").Router();
const Blog = require("../models/blog.model");
// const cloudinary = require("../utils/cloudinary");
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
    const imageUrl = req.file.path;
    const imagePublicId = req.file.filename;
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
    if (!blog) return res.status(404).json("blog does not exist");
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

    const blog = await Blog.findByIdAndUpdate(id);
    if (!blog) return res.status(404).json("blog does not exist");
    if (req.file) {
      await cloudinary.uploader.destroy(blog.imagePublicId);
      updateData.imageUrl = req.file.path;
      updateData.imagePublicId = req.file.filename;
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
