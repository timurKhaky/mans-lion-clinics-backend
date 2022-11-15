const { Router } = require("express");
const {
  depatrmentsController,
} = require("../controllers/departments.controller");

const router = Router();

router.post("/", depatrmentsController.addDep);
router.delete("/:id", depatrmentsController.delDep);

module.exports = router;
