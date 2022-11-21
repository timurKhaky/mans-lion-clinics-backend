const Invite = require("../../models/Invite.model");

module.exports = async (req, res, next) => {
  try {
    const { code } = req.headers;

    const invites = await Invite.find();
    const condidate = invites.filter((item) => item.list.includes(code));
    if (condidate.length > 0) {
      await Invite.findByIdAndUpdate(condidate[0]._id, {
        $pull: {
          list: code,
        },
      });
      req.role = condidate[0].role;
    } else {
      req.role = "user";
    }
    next();
  } catch (error) {
    res.json({ error: error.message });
  }
};
