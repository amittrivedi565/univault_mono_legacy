const db = require("../../models");
const { celebrate, Joi, Segments } = require("celebrate");

exports.createSemGet = {
  controller: async (req, res) => {
    try {

      // Find Sememster With Year ID
      const semData = await db.sems.findAll({
        where: {
          yearId: req.params.id,
        }, order  : ['name']
      });

      res.render("../views/admin/sem.ejs", { semData });
    } catch (error) {}
  },
};

exports.createSemPost = {
  // Validate Incoming Data
  validator: celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      year_name: Joi.string().required(),
      yearId: Joi.string().required(),
    }),
  }),
  controller: async (req, res) => {
    try {

      // Request Body Data
      const semRecord = {
        name: req.body.name,
        year_name: req.params.year_name,
        yearId: req.params.id,
      };

      // Check If Semester Exists?
      const semCheck = await db.sems.findOne({ where : {
        name : req.body.name,
        yearId : req.params.id
      } });

      if (semCheck) {
        res.send("Already Exists");
      } else {
        // Create Semester Record
        await db.sems.create(semRecord);
        res.redirect("back");
      }
    } catch (error) {
      console.log(error);
    }
  },
};
