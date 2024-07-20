const { where } = require("sequelize");
const db = require("../models");

exports.createSemGet = {
  controller: async (req, res) => {
    try {
      const semData = await db.sem.findAll({
        where: {
          year_id: req.params.id,
        },
      });

      res.render("../views/admin/sem.ejs", { semData });
    } catch (error) {}
  },
};

exports.createSemPost = {
  controller: async (req, res) => {
    try {
      const semRecord = {
        sem_name: req.body.sem_name,
        year_name: req.params.year_name,
        year_id: req.params.id,
      };
      const semCheck = await db.sem.findOne({ where : {
        year_id : req.params.id,
        sem_name : req.body.sem_name

      } });
      if (semCheck) {
        res.send("Already Exists");
      } else {
        await db.sem.create(semRecord);
        res.redirect("back");
      }
    } catch (error) {
      console.log(error);
    }
  },
};
