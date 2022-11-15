const { Router } = require("express");
const { invitesController } = require("../controllers/Invites.controller");

const router = Router();

router.post("/", invitesController.createInvates);
router.patch("/:id", invitesController.addInvites);

module.exports = router;
