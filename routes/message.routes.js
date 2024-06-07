const router = require("express").Router();
const {
  getMessage,
  postMessage,
  deleteMessage,
  updateMessage,
} = require("../controllers/message.controllers");

router.get("/", getMessage);
router.post("/", postMessage);
router.delete("/:id", deleteMessage);
router.put("/:id", updateMessage);

module.exports = router;
