const db = require("../../models");
const { celebrate, Joi, Segments } = require("celebrate");

exports.createYearGet = {
  controller: async (req, res) => {
    try {

      const courseData = await db.courses.findAll({});
      const yearData = await db.years.findAll({
        where: {
          courseId: req.params.id,
        },order : ['name']
      });
      res.render("../views/admin/year.ejs", { yearData, courseData });
    } catch (error) {
      console.log(error);
    }
  },
};

// Create Year 
exports.createYearPost = {

  // Validating Incoming Data
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
      // Request Body Data
      const yearData = {
        name: req.body.name,
        value : req.body.value,
        course_name: req.params.course_name,
        courseId: req.params.id,
      };
      // Check If Course Already Exists ? 
      const courseCheck = await db.courses.findOne({
        where: {
          id: req.params.id
        },
      });
      // Check If Year Already Exists ? 
      const yearCheck = await db.years.findOne({
        where: {
          name: req.body.name,
          courseId: req.params.id,
        },
      });

      if (!courseCheck) {
        res.send("No Course Exists")
      }
      if (yearCheck) {
        res.send("Year Alread Exists")
      }
      // Create Year Record
      await db.years.create(yearData);
      res.redirect("back");

    } catch (error) {
      console.log(error);
    }
  },
};

// Delete Year
exports.deleteYear = {
  controller: async (req, res) => {
    try {
      // Check Is Valid ID or Not?
      const deleteCheck = await db.years.findOne({id:req.params.id})

      if (!deleteCheck) {
        res.send("Wrong Year Id")
      }
      // Delete Year Record
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


