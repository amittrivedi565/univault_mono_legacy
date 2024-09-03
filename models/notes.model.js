const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define(
    "notes",
    {
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
      desc: {
        type: "LONGTEXT",
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tags: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pdf_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      subId: {
        type: Sequelize.UUID,
        allowNull: false,
      }
    },
    {
      timestamps: false,
    }
  );
  return Note;
};
