const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Year = sequelize.define("years", {
    year_id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    year_name:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    year_value:{
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
