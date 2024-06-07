const Notification = require("../models/notification.model");
const { deleteMessage } = require("./message.controllers");

const getNotification = async (req, res) => {
  try {
    const notification = await Notification.find({});
    res.status(200).json(notification);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const postNotification = async (req, res) => {
  try {
    const { name, type, message } = req.body;
    const newNotification = {
      name: name,
      type: type,
      message: message,
    };
    const notification = await Notification.create(newNotification);
    res.status(200).json(notification);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findById(id);
    if (!notification) return res.status(404).json("notification not found");
    await Notification.findByIdAndDelete(id);
    res.status(200).json("notification deleted successfully");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const deleteAllNotifications = async (req, res) => {
  try {
    await Notification.deleteMany({});
    res.status(200).json("All notifications deleted successfully");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const updateNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type, message } = req.body;
    const notification = await Notification.findById(id);
    if (!notification) return res.status(404).json("notification not found");
    notification.name = name;
    notification.type = type;
    notification.message = message;
    await notification.save();
    res.status(200).json(notification);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getNotification,
  postNotification,
  deleteNotification,
  deleteAllNotifications,
  updateNotification,
};
