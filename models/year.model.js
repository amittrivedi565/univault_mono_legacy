const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Year = sequelize.define("Year", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name:{
      type: DataTypes.STRING,
      allowNull: false
    }
    },{
    timestamps : false
  });
  return Year;
};
