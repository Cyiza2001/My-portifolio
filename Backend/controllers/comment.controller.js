const Comment = require("../models/comment.model");

const addComment = async (req, res) => {
  const { blogId, message } = req.body;
  const userId = req.user?.userId;

  if (!message) {
    return res.status(400).json({ message: "Message is required" });
  }

  try {
    const comment = new Comment({ blogId, userId, message });
    await comment.save();

    res.status(201).json({ message: "Comment added", comment });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
const deleteComment = async (req, res) => {
  const { id: commentId } = req.params;
  const userId = req.user?.userId; // Ensure the userId from the authenticated user

  try {
    const comment = await Comment.findOneAndDelete({ _id: commentId, userId });
    if (!comment) {
      return res
        .status(404)
        .json({ message: "Comment not found or not authorized" });
    }
    res.status(200).json({ message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const editComment = async (req, res) => {
  const { id: commentId } = req.params;
  const { message } = req.body;
  const userId = req.user?.userId; // Ensure the userId from the authenticated user

  if (!message) {
    return res.status(400).json({ message: "Message is required" });
  }

  try {
    const comment = await Comment.findOneAndUpdate(
      { _id: commentId, userId },
      { message },
      { new: true }
    );
    console.log(commentId, userId, message);
    if (!comment) {
      return res
        .status(404)
        .json({ message: "Comment not found or not authorized" });
    }

    res.status(200).json({ message: "Comment updated", comment });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const getComments = async (req, res) => {
  const { blogId } = req.params;

  try {
    const comments = await Comment.find({ blogId }).populate(
      "userId",
      "Firstname"
    );
    res.status(200).json({ comments });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

module.exports = { addComment, getComments, deleteComment, editComment };
