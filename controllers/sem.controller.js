const { where } = require("sequelize");
const db = require("../models");
const { celebrate, Joi, Segments } = require("celebrate");


exports.createSemGet = {
  controller: async (req, res) => {
    try {
      const semData = await db.sems.findAll({
        where: {
          year_id: req.params.id,
        },
      });

      res.render("../views/admin/sem.ejs", { semData });
    } catch (error) {}
  },
};

exports.createSemPost = {
  validator: celebrate({
    [Segments.BODY]: Joi.object().keys({
      sem_name: Joi.string().required(),
      year_name: Joi.string().required(),
      year_id: Joi.string().required(),
    }),
  }),
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
        await db.sems.create(semRecord);
        res.redirect("back");
      }
    } catch (error) {
      console.log(error);
    }
  },
};
