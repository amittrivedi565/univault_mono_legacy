const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Subject = sequelize.define(
    "subject",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      desc: {
        type: "LONGTEXT",
        allowNull: false,
      },
      tags: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      timestamps: false,
    }
  );
  return Subject;
};
