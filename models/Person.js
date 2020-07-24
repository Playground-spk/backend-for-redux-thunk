module.exports = (sequelize, dataType) => {
  const Person = sequelize.define("Person", {
    name: {
      type: dataType.STRING,
    },
    age: {
      type: dataType.INTEGER,
    },
  });
  Person.associate = (model) => {
    Person.belongsTo(model.User, { foreignKey: "user_id" });
  };
  return Person;
};
