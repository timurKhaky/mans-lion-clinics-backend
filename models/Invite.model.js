const mongoose = require("mongoose");

const InviteSchema = mongoose.Schema(
  {
    role: { type: String, required: true },
    list: [{ type: String, unique: true }],
  },
  { timestamps: true }
);

const Invite = mongoose.model("Invite", InviteSchema);
module.exports = Invite;
