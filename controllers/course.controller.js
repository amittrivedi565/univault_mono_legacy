const { where } = require("sequelize");
const db = require("../models");
const { celebrate, Joi, Segments } = require("celebrate");


// Get all courses by branch get request
exports.CourseGet = {
  controller: async (req, res) => {
    try {
       
      const branchData = await db.branches.findAll()

      const courseData = await db.courses.findAll({
        where: {
          branch_id: req.params.id
        },
      });

      res.render("../views/course.ejs", {
        branchData,
        courseData
      });
    } catch (error) {
      console.log(error);
    }
  },
};


exports.createCourse = {
  validator: celebrate({
    [Segments.BODY]: Joi.object().keys({
      course_code: Joi.string().required(),
      course_name: Joi.string().required(),
      course_desc: Joi.string().min(0).max(500).required(),
      course_tags: Joi.string().required(),
      branch_id: Joi.string().optional(),
    }),
  }),

  controller: async (req, res) => {
    const data = {
      course_code: req.body.course_code,
      course_name: req.body.course_name,
      course_desc: req.body.course_desc,
      course_tags: req.body.course_tags,
      branch_id: req.params.id,
    };

    const courseExists = await db.courses.findOne({
      where: {
        course_code: req.body.course_code,
        course_name: req.body.course_name,
        branch_id: req.params.id,
      },
    });

    if (courseExists) {
      res.send("Course Already Exists");
    } else {
      await db.courses.create(data);
      res.redirect("back");
    }
  },
};





// Delete course by branch
exports.deleteCourse = {
  controller: async (req, res) => {
    const id = req.params.id;
    try {
      const id = req.params.id;
      const deleteRecord = await db.courses.destroy({
        where: {
          course_id: id,
        },
      });
      res.redirect("/api/close/branch");
      console.log(deleteRecord);
    } catch (error) {
      console.log(error);
    }
  },
};
