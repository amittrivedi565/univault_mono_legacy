const db = require("../../models");
const { celebrate, Joi, Segments } = require("celebrate");

exports.createYearGet = {
  controller: async (req, res) => {
    try {
      const courseData = await db.courses.findAll({});
      const yearData = await db.years.findAll({
        where: {
          course_id: req.params.id,
        },order : ['name']
      });
      res.render("../views/admin/year.ejs", { yearData, courseData });
    } catch (error) {
      console.log(error);
    }
  },
};

// Create year 
exports.createYearPost = {

  // validating incoming data
  validator: celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      value: Joi.string().required(),
      course_id: Joi.string().optional(),
      course_name: Joi.string().optional(),
    }),
  }),

  controller: async (req, res) => {
    try {
      const yearData = {
        name: req.body.name,
        value : req.body.value,
        course_name: req.params.course_name,
        course_id: req.params.id,
      };

      const courseCheck = await db.courses.findOne({
        where: {
          id: req.params.id
        },
      });

      const yearCheck = await db.years.findOne({
        where: {
          name: req.body.name,
          course_id: req.params.id,
        },
      });

      if (!courseCheck) {
        res.send("No Course Exists")
      }
      if (yearCheck) {
        res.send("Year Alread Exists")
      }

      await db.years.create(yearData);
      res.redirect("back");

    } catch (error) {
      console.log(error);
    }
  },
};

// Delete year
exports.deleteYear = {
  controller: async (req, res) => {
    try {
      const deleteRecord = await db.years.destroy({
        where: {
          id: req.params.id
        },
      });
      res.redirect("back")
    } 
    catch (error) {
      console.log(error);
    }
  },
};


