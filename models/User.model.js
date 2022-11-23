const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      default: "тестовый ФИО" + Date.now(),
      required: true,
    },
    login: { type: String, unique: true, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "user", required: true },
    avatarImg: { type: String, default: null },
    schedule: {},
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      default: null,
    },
    jobTitle: {},
    birthDay: {},
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
