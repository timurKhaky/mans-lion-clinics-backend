const {Router} = require("express");
const { messageController } = require("../controllers/messages.controller");
const router = Router();

router.post("/message", messageController.addMessage)
router.get("/message/:fromId/:toId", messageController.getMessagesByUser)
 
module.exports = router