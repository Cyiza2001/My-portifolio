const router = require("express").Router();
const Blog = require("../models/blog.model");
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
    const blog = await Blog.create(req.body);
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
    const blog = await Blog.findByIdAndUpdate(id, req.body);
    if (!blog) return res.status(404).json("blog does not exist");

    res.status(200).json("product updated successfully");
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
