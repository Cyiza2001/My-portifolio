const Like = require("../models/like.model");

const likeBlog = async (req, res) => {
  const { blogId } = req.body;
  const userId = req.user._id;

  try {
    // Check if the like already exists
    const existingLike = await Like.findOne({ blogId, userId });
    if (existingLike) {
      const unlike = await Like.findOneAndDelete({ blogId, userId });
      return res.status(400).json(unlike, "the blog is unliked");
    }

    // Create a new like
    const like = new Like({ blogId, userId });
    await like.save();

    res.status(201).json({ message: "Blog post liked", like });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const unlikeBlog = async (req, res) => {
  const { blogId } = req.body;
  const userId = req.user._id;

  try {
    // Find and delete the like
    const like = await Like.findOneAndDelete({ blogId, userId });
    if (!like) {
      return res
        .status(400)
        .json({ message: "You have not liked this blog post" });
    }

    res.status(200).json({ message: "Blog post unliked" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const getLikes = async (req, res) => {
  const { blogId } = req.params;

  try {
    // Find all likes for the given blog post
    const likes = await Like.find({ blogId });

    res.status(200).json({ likes });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

module.exports = { likeBlog, getLikes };
