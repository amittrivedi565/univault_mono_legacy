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
      tags: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pdf_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      sub_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      sub_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  return Note;
};
