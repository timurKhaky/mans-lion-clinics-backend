const e = require("express");
const PatientRecord = require("../models/PatientRecord.model");
const User = require("../models/User.model");

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
      const condidate = await PatientRecord.findById(req.params.id);
      if (condidate._doctorId.toString() === req.user.id.toString()) {
        await PatientRecord.findByIdAndDelete(req.params.id);
        const data = await PatientRecord.find({
          _doctorId: req.user.id,
        }).populate({
          path: "_doctorId _patientId",
          select: "fullName jobTitle",
        });

        return res.json(data);
      } else {
        return res.json({
          error: "Попытка удаления записи другого врача",
        });
      }
    } catch (error) {
      return res.json({ error: error.message });
    }
  },
  // async getRecordByPatien(req, res) {
  //   try {
  //     const data = await PatientRecord.find({
  //       _patientId: req.user.id,
  //     }).populate({
  //       path: "_doctorId _patientId",
  //       select: "fullName jobTitle",
  //     });
  //     return res.json(data);
  //   } catch (error) {
  //     return res.json({ error: error.message });
  //   }
  // },
  async getRecordByDoctor(req, res) {
    try {
      const data = await PatientRecord.find({
        _doctorId: req.params.id,
      }).populate({
        path: "_doctorId _patientId",
        select: "fullName jobTitle",
      });
      return res.json(data);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },
  async getRecordByRole(req, res) {
    try {
      const user = await User.findById(req.user.id);
      let filter =
        user.role === "doctor"
          ? { _doctorId: req.user.id }
          : { _patientId: req.user.id };
      const recordList = await PatientRecord.find(filter).populate({
        path: "_doctorId _patientId",
        select: "fullName jobTitle",
      });
      return res.json(recordList);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },
};
