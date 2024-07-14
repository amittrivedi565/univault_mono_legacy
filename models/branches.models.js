const Sequelize = require("sequelize");
const { validate } = require("uuid");
module.exports = (sequelize, DataTypes) => {
  const Branch = sequelize.define("branch", {
    branch_id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    branch_name: {
      type: DataTypes.STRING,
      allowNull: false,
      // unique : true
    },
    branch_desc: {
      type: "LONGTEXT",
      allowNull: false,
      // unique : true

    },
    branch_tags: {
      type: DataTypes.STRING,
      allowNull: false,

    },
  // If don't want updatedAt
  },{
    timestamps : false
  });
  return Branch;
};
