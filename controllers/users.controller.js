const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.usersController = {
  async signUp(req, res) {
    try {
      const { fullName, login, password, schedule, birthDay, jobTitle } =
        req.body;

      const hash = await bcrypt.hash(
        password,
        Number(process.env.BCRYPT_ROUNDS)
      );
      const data = await User.create({
        birthDay,
        jobTitle: jobTitle,
        fullName,
        login,
        password: hash,
        role: req.role,
        schedule: schedule,
      });

      if (!!req.file) {
        await User.findByIdAndUpdate(
          data._id,
          {
            avatarImg: req.file.path,
          },
          { new: true }
        );
      }
      return res.json("Пользователь успешно зарегистрирован");
    } catch (error) {
      return res.json({ error: error.message });
    }
  },
  async signIn(req, res) {
    const { login, password } = req.body;
    const condidate = await User.findOne({ login }).populate(
      "department",
      "name"
    );
    if (!condidate) {
      return res
        .status(401)
        .json({ error: "Ошибка авторизации. Пользователь не найден." });
    }
    const valid = await bcrypt.compare(password, condidate.password);
    if (!valid) {
      return res
        .status(401)
        .json({ error: "Ошибка авторизации. Пользователь не найден." });
    }
    try {
      const payload = { id: condidate.id, login: condidate.login };
      const token = jwt.sign(payload, process.env.SECRET_JWT_KEY, {
        expiresIn: "24h",
      });
      res.json({
        token,
        fullName: condidate.fullName,
        department: condidate.department,
      });
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  async addImg(req, res) {
    try {
      const data = await User.findByIdAndUpdate(
        req.params.id,
        {
          avatarImg: req.file.path,
        },
        { new: true }
      );
      return res.json(data);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },
};
