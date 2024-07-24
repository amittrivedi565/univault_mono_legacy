const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Semester = sequelize.define("semester", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year_id : {
      type: Sequelize.UUID,
      allowNull : false
    },
    year_name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    timestamps : false
  });
  return Semester;
};
