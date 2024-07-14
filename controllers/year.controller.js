const db = require("../models");
const { celebrate, Joi, Segments } = require("celebrate");

// Create Year Get
exports.createYearGet = {
  controller: async (req, res) => {
    try {
      const courseData = await db.courses.findAll({});
      const yearData = await db.years.findAll({
        where: {
          course_id: req.params.id,
        },
      });
      res.render("../views/year.ejs", { yearData, courseData });
    } catch (error) {
      console.log(error);
    }
  },
};

// Create Year Post
exports.createYearPost = {
  // validating incoming data
  validator: celebrate({
    [Segments.BODY]: Joi.object().keys({
      year_name: Joi.string().required(),
      year_value: Joi.string().required(),
      course_name: Joi.string().optional(),
      course_id: Joi.string().optional(),
    }),
  }),
  controller: async (req, res) => {
    try {
      const yearRecord = {
        year_name: req.body.year_name,
        year_value : req.body.year_value,
        course_name: req.params.course_name,
        course_id: req.params.id,
      };

      const id = req.params.id;

      const courseChecker = await db.courses.findOne({
        where: {
          course_id: id,
        },
      });
      const yearChecker = await db.years.findOne({
        where: {
          year_name: req.body.year_name,
          course_id: req.params.id,
        },
      });

      if (courseChecker) {
        if (yearChecker) {
          res.send("This year already exists");
        } 
        else 
        {
          await db.years.create(yearRecord);
          res.redirect("back");
        }
      } else {
        res.send("Invalid CourseID");
      }
    } catch (error) {
      console.log(error);
    }
  },
};

exports.deleteYear = {
  controller: async (req, res) => {
    try {
      const deleteRecord = await db.years.destroy({
        where: {
          year_id: req.params.id
        },
      });
      res.redirect("back")
    } 
    catch (error) {
      console.log(error);
    }
  },
};


