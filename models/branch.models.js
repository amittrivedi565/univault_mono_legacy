const Sequelize = require("sequelize");
const { validate } = require("uuid");
module.exports = (sequelize, DataTypes) => {
  const Branch = sequelize.define("branch", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      // unique : true
    },
    desc: {
      type: "LONGTEXT",
      allowNull: false,
      // unique : true

    },
    tags: {
      type: DataTypes.STRING,
      allowNull: false,

    },
  // If don't want updatedAt
  },{
    timestamps : false
  });
  return Branch;
};
