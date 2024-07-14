const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define("course", {
    course_id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    course_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    course_code:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    course_desc: {
      type:"LONGTEXT",
      allowNull: false,
    },
    course_tags: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },{
    timestamps : false
  });
  return Course;
};
