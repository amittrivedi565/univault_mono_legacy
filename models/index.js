const dbConfig = require("../config/db.config");
const { Sequelize, DataTypes } = require("sequelize");
const uuidv4 = require("uuid").v4;
const bcrypt = require("bcrypt");
const { Hooks } = require("sequelize/lib/hooks");
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

db.branches = require("./branches.models")(sequelize, DataTypes);

db.courses = require("./courses.models")(sequelize, DataTypes);

db.years = require("./year.model")(sequelize, DataTypes);

db.sem = require("./sem.models")(sequelize, DataTypes);

db.subjects = require("./sub.models")(sequelize, DataTypes);


// Association to be applied here using One-Many
db.branches.hasMany(db.courses, {
  foreignKey: "branch_id",
  as: "course",
  onDelete: "CASCADE",
  hooks: true
});
db.courses.belongsTo(db.branches, {
  foreignKey: "branch_id",
  as: "branch",
  onDelete: "CASCADE",
  hooks :true
});


// Association to be applied here using One-Many
db.courses.hasMany(db.years, {
  foreignKey: "course_id",
  as: "years",
  onDelete: "CASCADE",
  hooks :true
});

db.years.belongsTo(db.courses, {
  foreignKey: "course_id",
  as: "course",
  onDelete: "CASCADE",
  hooks :true
});


// Association to be applied here using One-Many
db.years.hasMany(db.sem, {
  foreignKey: "year_id",
  as: "semester",
  onDelete: "CASCADE",
  hooks :true
});

db.sem.belongsTo(db.years, {
  foreignKey: "year_id",
  as: "years",
  onDelete: "CASCADE",
  hooks :true
});

// Association to be applied here using One-Many
db.sem.hasMany(db.subjects, {
  foreignKey: "sem_id",
  as: "subject",
  onDelete: "CASCADE",
  hooks :true
});

db.subjects.belongsTo(db.sem, {
  foreignKey: "sem_id",
  as: "semester",
  onDelete: "CASCADE",
  hooks :true
});

db.sequelize.sync({ force: false }).then(async () => {
  console.log("Re-Sync Done!");
  // let admin = {
  //     id: uuidv4(),
  //     name: "Amit Trivedi",
  //     email: "deevanshukushwah80@gmail.com",
  //     password: bcrypt.hashSync("Sample@125502", salt),
  // // };
  // await db.admins.create(admin);
});

module.exports = db;
