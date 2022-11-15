const e = require("express");
const PatientRecord = require("../models/PatientRecord.model");

module.exports.patientRecordsController = {
  async addRecord(req, res) {
    try {
      const { _doctorId, date, time } = req.body;
      const condidate = await PatientRecord.find({ _doctorId });
      const userFilter = condidate.filter(
        (item) =>
          item.date === date &&
          item._patientId.toString() === req.user.id.toString()
      );
      const timeFilter = condidate.filter(
        (item) => item.date === date && item.time === time
      );
      if (timeFilter.length > 0) {
        return res.json({ error: "У врача уже есть запись на это время" });
      }
      if (userFilter.length > 0) {
        return res.json({
          error: `вы уже записаны к врачу в этот день. время записи: ${userFilter[0].time} `,
        });
      }
      const data = await PatientRecord.create({
        _doctorId,
        date,
        time,
        _patientId: req.user.id,
      });
      const result = await PatientRecord.findById(data._id).populate({
        path: "_doctorId _patientId",
        select: "fullName",
      });
      return res.json(result);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },
  async delRecord(req, res) {
    try {
      const condidate = await PatientRecord.findByIdAndUpdate(req.params.id);
      if (condidate._id.toString() === req.user.id.toString()) {
        await PatientRecord.findByIdAndDelete(req.user.id);
        const data = await PatientRecord.find({ _patientId: req.user.id });
        return res.json(data);
      } else {
        return res.json({
          error: "Попытка удаления записи другого пользователя",
        });
      }
    } catch (error) {
      return res.json({ error: error.message });
    }
  },
  async getRecordByPatien(req, res) {
    try {
      const data = await PatientRecord.find({
        _patientId: req.user.id,
      }).populate({
        path: "_doctorId _patientId",
        select: "fullName",
      });
      return res.json(data);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },
  async getRecordByDoctor(req, res) {
    try {
      const data = await PatientRecord.find({
        _doctorId: req.params._doctorId,
      }).populate({
        path: "_doctorId _patientId",
        select: "fullName",
      });
    } catch (error) {
      return res.json({ error: error.message });
    }
  },
};
