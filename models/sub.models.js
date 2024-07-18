const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Subject = sequelize.define(
    "subject",
    {
      sub_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      sub_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sub_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sub_desc: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sub_tags: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sem_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      note_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  return Subject;
};
