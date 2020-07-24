const db = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { username, password, name } = req.body;

  const user = await db.User.findOne({ where: { username } });
  if (user) res.status(400).send("username is already use");

  const salt = bcryptjs.genSaltSync(12);
  const hashedPassword = bcryptjs.hashSync(password, salt);

  await db.User.create({ username, name, password: hashedPassword });
  res.status(201).send("user created");
};

const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await db.User.findOne({ where: { username } });

  const getPassword = (user) => {
    return user ? user.password : "Fake_password";
  };

  const isMatchPassword = bcryptjs.compareSync(password, getPassword(user));

  if (user && isMatchPassword) {
    payload = {
      name: user.name,
      id: user.id,
    };

    const token = jwt.sign(payload, "secret", { expiresIn: 3600 });

    res.status(200).send(token);
  }

  res.status(400).send("username or password is wrong");
};

module.exports = { login, register };
