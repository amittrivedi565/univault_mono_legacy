const Sequelize = require("sequelize");
const { validate } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  const College = sequelize.define("college", {
    college_id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    college_name: {
      type: DataTypes.STRING,
      allowNull: false,
      // unique : true
    },
    college_desc: {
      type: "LONGTEXT",
      allowNull: false,
      // unique : true

    },
    college_tags: {
      type: DataTypes.STRING,
      allowNull: false,

    },
  // If don't want updatedAt
  },{
    timestamps : false
  });
  return College;
};
