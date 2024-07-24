const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Year = sequelize.define("years", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    value:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    course_id : {
      type: Sequelize.UUID,
      allowNull : false
    },
    course_name:{
      type: DataTypes.STRING,
      allowNull: false,
    },
  },{
    timestamps : false
  });
  return Year;
};
