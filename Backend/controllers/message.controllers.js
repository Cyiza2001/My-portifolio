const Message = require("../models/message.model");

const getMessage = async (req, res) => {
  try {
    const messages = await Message.find({});
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message }, "no messages found");
  }
};

const postMessage = async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;
    const newMessage = {
      name: name,
      phone: phone,
      email: email,
      message: message,
    };

    const createdMessage = await Message.create(newMessage);
    res.status(200).json(createdMessage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await Message.findById(id);
    if (!message) return res.status(404).json("message not found");
    await Message.findByIdAndDelete(id);
    res.status(200).json("message deleted successfully");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, email, message } = req.body;
    const myMessage = await Message.findById(id);
    if (!myMessage) return res.status(404).json("Message not found!");
    const data = {
      name: name || myMessage.name,
      phone: phone || myMessage.phone,
      email: email || myMessage.email,
      message: message || myMessage.message,
    };

    const updatedMessage = await Message.findByIdAndUpdate(id, data, {
      new: true,
    });
    res.status(200).json(updatedMessage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getMessage,
  postMessage,
  deleteMessage,
  updateMessage,
};
