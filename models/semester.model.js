const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Semester = sequelize.define("Semester", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    yearId : {
      type: Sequelize.UUID,
      allowNull : false
    },
  },
  {
    timestamps : false
  });
  return Semester;
};
