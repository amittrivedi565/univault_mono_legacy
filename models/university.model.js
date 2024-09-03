const Sequelize = require("sequelize");
const { validate } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  const University = sequelize.define("University", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    shortname : {
      type: DataTypes.STRING,
      allowNull: false,
      unique : true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique : true
    },
    desc: {
      type: "LONGTEXT",
      allowNull: false,
    },
    tags: {
      type: DataTypes.STRING,
      allowNull: false,

    },
    imgUrl : {
      type : DataTypes.STRING,
      allowNull:false
    },
    imgName : {
      type : DataTypes.STRING,
      allowNull:false
    },
    adminId: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    adminName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  // If don't want updatedAt
  },{
    timestamps : false
  });
  return University;
};
