const router = require("express").Router();
const {
  getNotification,
  postNotification,
  deleteNotification,
  deleteAllNotifications,
  updateNotification,
} = require("../controllers/notification.controllers");

router.get("/", getNotification);
router.post("/", postNotification);
router.delete("/:id", deleteNotification);
router.delete("/", deleteAllNotifications);
router.put("/:id", updateNotification);
module.exports = router;
