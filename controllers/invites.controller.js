const Invite = require("../models/Invite.model");

module.exports.invitesController = {
  async createInvates(req, res) {
    try {
      const { role, list } = req.body;
      const data = await Invite.create({
        role,
        list,
      });
      return res.json(data);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },
  async addInvites(req, res) {
    try {
      const { list } = req.body;
      const invites = await Invite.find();
      const test = invites.filter((item) => item.list.includes(list));
      if (test.length > 0) {
        return res.json({ error: "значение должно быть уникальным" });
      }
      const data = await Invite.findByIdAndUpdate(
        req.params.id,
        {
          $push: { list: list },
        },
        { new: true }
      );
      return res.json(data);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },
};
