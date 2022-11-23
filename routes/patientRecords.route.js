const { Router } = require("express");
const {
  patientRecordsController,
} = require("../controllers/patientRecords.controller");

const authMiddleWare = require("./middlewares/auth.middleware");

const router = Router();

router.post("/", authMiddleWare, patientRecordsController.addRecord);
router.delete("/:id", authMiddleWare, patientRecordsController.delRecord);
router.get("/:id", authMiddleWare, patientRecordsController.getRecordByPatien);
router.get("/doctor/:id", patientRecordsController.getRecordByDoctor);

module.exports = router;
