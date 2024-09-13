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

db.admins = require("./admin.model")(sequelize, DataTypes);

db.actions = require("./admin_actions.model")(sequelize, DataTypes);

db.university = require("./university.model")(sequelize, DataTypes);

db.branches = require("./branch.model")(sequelize, DataTypes);

db.courses = require("./course.model")(sequelize, DataTypes);

db.years = require("./year.model")(sequelize, DataTypes);

db.sems = require("./semester.model")(sequelize, DataTypes);

db.subjects = require("./subject.model")(sequelize, DataTypes);

db.unit = require("./unit.model")(sequelize, DataTypes);

// 1 : M (Admin : Actions)
db.admins.hasMany(db.actions, {
  foreignKey: "adminId",
  as: "Action",
  onDelete: "SET NULL",
  hooks: true
})
db.actions.belongsTo(db.admins,{
  foreignKey: "adminId",
  as: "Admin",
  onDelete: "SET NULL",
  hooks: true
})

// 1 : M (Admin : Universities)
db.admins.hasMany(db.university, {
  foreignKey: "adminId",
  as: "University",
  onDelete: "CASCADE",
  hooks: true
});

db.university.belongsTo(db.admins,{
  foreignKey: "adminId",
  as: "Admin",
  onDelete: "CASCADE",
  hooks: true
});

// 1 : M (University : Courses)
db.university.hasMany(db.courses, {
  foreignKey: "uniId",
  as: "Course",
  onDelete: "CASCADE",
  hooks: true
});

db.courses.belongsTo(db.university, {
  foreignKey: "uniId",
  as: "University",
  onDelete: "CASCADE",
  hooks :true
});


// 1 : M (Course : Branches)
db.courses.hasMany(db.branches, {
  foreignKey: "courseId",
  as: "Branch",
  onDelete: "CASCADE",
  hooks: true
});
db.branches.belongsTo(db.courses, {
  foreignKey: "courseId",
  as: "Course",
  onDelete: "CASCADE",
  hooks :true
});

// 1 : M (Branch : Years)
db.branches.hasMany(db.years, {
  foreignKey: "branchId",
  as: "Year",
  onDelete: "CASCADE",
  hooks :true
});
db.years.belongsTo(db.branches, {
  foreignKey: "branchId",
  as: "Branch",
  onDelete: "CASCADE",
  hooks :true
});


// 1 : M (Year : Semesters)
db.years.hasMany(db.sems, {
  foreignKey: "yearId",
  as: "Semester",
  onDelete: "CASCADE",
  hooks :true
});

db.sems.belongsTo(db.years, {
  foreignKey: "yearId",
  as: "Year",
  onDelete: "CASCADE",
  hooks :true
});


// 1 : M (Semester : Subjects)
db.sems.hasMany(db.subjects, {
  foreignKey: "semId",
  as: "Subject",
  onDelete: "CASCADE",
  hooks :true
});

db.subjects.belongsTo(db.sems, {
  foreignKey: "semId",
  as: "Semester",
  onDelete: "CASCADE",
  hooks :true
});


// 1 : M (Subject : Units)
db.subjects.hasMany(db.unit, {
  foreignKey: "subId",
  as: "Unit",
  onDelete: "CASCADE",
  hooks :true
});

db.unit.belongsTo(db.subjects, {
  foreignKey: "subId",
  as: "Subject",
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
