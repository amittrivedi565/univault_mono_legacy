const { allow } = require("joi");
const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define("Course", {
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
    shortname:{
      type: DataTypes.STRING,
      allowNull: false
    },
    desc: {
      type:"LONGTEXT",
      allowNull: false
    },
    tags: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },{
    timestamps : false
  });
  return Course;
};
