const dbConfig = require("../config/db.config");
const { Sequelize, DataTypes } = require("sequelize");
const uuidv4 = require("uuid").v4;
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: console.log,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => {
    console.log("Error" + err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.admins = require("./admin.models")(sequelize, DataTypes);

db.university = require("./uni.model")(sequelize, DataTypes);

db.branches = require("./branch.models")(sequelize, DataTypes);

db.courses = require("./course.models")(sequelize, DataTypes);

db.years = require("./year.model")(sequelize, DataTypes);

db.sems = require("./sem.models")(sequelize, DataTypes);

db.subjects = require("./sub.models")(sequelize, DataTypes);

db.notes = require("./notes.model")(sequelize, DataTypes);


// 1 : M (Admin : Colleges)
db.admins.hasMany(db.university, {
  foreignKey: "adminId",
  as: "unis",
  onDelete: "CASCADE",
  hooks: true
});

db.university.belongsTo(db.admins,{
  foreignKey: "adminId",
  as: "admin",
  onDelete: "CASCADE",
  hooks: true
});

// 1 : M (University : Courses)
db.university.hasMany(db.courses, {
  foreignKey: "uniId",
  as: "course",
  onDelete: "CASCADE",
  hooks: true
});

db.courses.belongsTo(db.university, {
  foreignKey: "uniId",
  as: "unis",
  onDelete: "CASCADE",
  hooks :true
});


// 1 : M (Course : Branches)
db.courses.hasMany(db.branches, {
  foreignKey: "courseId",
  as: "branch",
  onDelete: "CASCADE",
  hooks: true
});
db.branches.belongsTo(db.courses, {
  foreignKey: "courseId",
  as: "course",
  onDelete: "CASCADE",
  hooks :true
});

// 1 : M (Branch : Years)
db.branches.hasMany(db.years, {
  foreignKey: "branchId",
  as: "years",
  onDelete: "CASCADE",
  hooks :true
});
db.years.belongsTo(db.branches, {
  foreignKey: "branchId",
  as: "branch",
  onDelete: "CASCADE",
  hooks :true
});


// 1 : M (Year : Sems)
db.years.hasMany(db.sems, {
  foreignKey: "yearId",
  as: "semester",
  onDelete: "CASCADE",
  hooks :true
});

db.sems.belongsTo(db.years, {
  foreignKey: "yearId",
  as: "years",
  onDelete: "CASCADE",
  hooks :true
});


// 1 : M (Sem : Subjects)
db.sems.hasMany(db.subjects, {
  foreignKey: "semId",
  as: "subject",
  onDelete: "CASCADE",
  hooks :true
});

db.subjects.belongsTo(db.sems, {
  foreignKey: "semId",
  as: "semester",
  onDelete: "CASCADE",
  hooks :true
});


// 1 : M (Suject : Notes)
db.subjects.hasMany(db.notes, {
  foreignKey: "subId",
  as: "notes",
  onDelete: "CASCADE",
  hooks :true
});

db.notes.belongsTo(db.subjects, {
  foreignKey: "subId",
  as: "subject",
  onDelete: "CASCADE",
  hooks :true
});

db.sequelize.sync({ force: false }).then(async () => {
  // let data = ({
  //   email: "abc",
  //   name: "admin",
  //   password: bcrypt.hashSync("123", salt),
  // })
  // await db.admins.create(data)
});

module.exports = db;
