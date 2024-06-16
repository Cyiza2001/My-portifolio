const router = require("express").Router();
const {
  getNotification,
  postNotification,
  deleteNotification,
  deleteAllNotifications,
  updateNotification,
} = require("../controllers/notification.controllers");
const authenticateToken = require("../middlewares/auth.middleWare");
const checkAdminRole = require("../middlewares/checkAdminRole.middleware");

router.get("/", authenticateToken, checkAdminRole, getNotification);
router.post("/", authenticateToken, checkAdminRole, postNotification);
router.delete("/:id", authenticateToken, checkAdminRole, deleteNotification);
router.delete("/", authenticateToken, checkAdminRole, deleteAllNotifications);
router.put("/:id", authenticateToken, checkAdminRole, updateNotification);
module.exports = router;
