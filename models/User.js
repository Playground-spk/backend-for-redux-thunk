module.exports = (sequelize, dataType) => {
  const User = sequelize.define("User", {
    username: {
      type: dataType.STRING,
    },
    password: {
      type: dataType.STRING,
    },
    name: {
      type: dataType.STRING,
    },
  });
  User.associate = (model) => {
    User.hasMany(model.Person, { foreignKey: "user_id" });
  };
  return User;
};
