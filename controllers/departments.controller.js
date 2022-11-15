const Department = require("../models/Department.model");

module.exports.depatrmentsController = {
  async addDep(req, res) {
    try {
      const data = await Department.create({ name: req.body.name });
      return res.json(data);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },
  async delDep(req, res) {
    try {
      await Department.findByIdAndDelete(req.params.id);
      const data = await Department.find();
      return res.json(data);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },
};
