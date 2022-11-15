const mongoose = require("mongoose");

const PatientRecordSchema = mongoose.Schema(
  {
    _patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    _doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: String,
    time: String,
  },
  { timestamps: true }
);

const PatientRecord = mongoose.model("PatientRecord", PatientRecordSchema);
module.exports = PatientRecord;
