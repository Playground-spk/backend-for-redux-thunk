const db = require("../models");

const getAllPersonBelongToUser = async (req, res) => {
  const userId = Number(req.user.id);
  console.log(userId);
  const data = await db.Person.findAll({ where: { user_id: userId } });
  res.status(200).send(data);
};

const addPeron = async (req, res) => {
  const { name, age } = req.body;
  const user_id = req.user.id;

  await db.Person.create({ name, age, user_id });
  res.status(201).send("person created !");
};

const editPerson = async (req, res) => {
  const { name, age } = req.body;
  const targetId = Number(req.params.id);
  const updatePerson = {};
  for (key in req.body) {
    updatePerson[key] = req.body[key];
  }
  await db.Person.update(updatePerson, { where: { id: targetId } });
  res.status(200).send("Person is already update");
};

const deletePerson = async (req, res) => {
  await db.Person.destroy({ where: { id: Number(req.params.id) } });
  res.status(204).send();
};

module.exports = {
  getAllPersonBelongToUser,
  editPerson,
  addPeron,
  deletePerson,
};
