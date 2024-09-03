const Sequelize = require("sequelize");
const { validate } = require("uuid");
module.exports = (sequelize, DataTypes) => {
  const Branch = sequelize.define("Branch", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    shortname: {
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
    },
  },{
    timestamps : false
  });
  return Branch;
};
