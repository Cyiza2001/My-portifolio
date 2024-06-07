const mongoose = require("mongoose");
const notificationSchema = mongoose.Schema({
  name: {
    type: string,
    required: true,
  },
  type: {
    type: string,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
