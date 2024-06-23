const router = require("express").Router();
const {
  getMessage,
  postMessage,
  deleteMessage,
  updateMessage,
} = require("../controllers/message.controllers");
const authenticateToken = require("../middlewares/auth.middleWare");
const checkAdminRole = require("../middlewares/checkAdminRole.middleware");

router.get("/", authenticateToken, checkAdminRole, getMessage);
router.post("/", postMessage);
router.delete("/:id", authenticateToken, checkAdminRole, deleteMessage);
router.put("/:id", updateMessage);

module.exports = router;
