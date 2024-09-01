const db = require("../../models");
const { celebrate, Joi, Segments } = require("celebrate");

// Get Courses
exports.CourseGet = {
  controller: async (req, res) => {
    try {
      // Query To Find Courses With Branch ID 
     const courseData = await db.courses.findAll({
      where : {
        branch_id : req.params.id
      } , order : ['name']
      })

      res.render("../views/admin/course.ejs", { courseData});
    } catch (error) {
      console.log(error)
      res.status(201).send(error);
    }
  },
};

// Create Course
exports.createCourse = {
  // Validate Incoming Data
  validator: celebrate({
    [Segments.BODY]: Joi.object().keys({
      code: Joi.string().required(),
      name: Joi.string().required(),
      desc: Joi.string().min(0).max(2500).required(),
      tags: Joi.string().required(),
      id: Joi.string().optional(),
    }),
  }),

  controller: async (req, res) => {
    // Incoming Data From Body
    const data = {
      code: req.body.code,
      name: req.body.name,
      desc: req.body.desc,
      tags: req.body.tags,
      branch_id: req.params.id,
    };

    // Check If Course Exists ?
    const courseExists = await db.courses.findOne({
      where: { 
        branch_id: req.params.id,
        code: req.body.code,
        name: req.body.name,
      },
    });

    if (courseExists) {
      res.send("Course Already Exists");
    } else {
      const record = await db.courses.create(data);
      res.redirect("back");
    }
  },
};

// Delete Course By Branch ID
exports.deleteCourse = {
  controller: async (req, res) => {
    try {
      // Delete Course Query
      const deleteRecord = await db.courses.destroy({
        where: {
         id : req.params.id
        },
      });
      res.redirect("back");
    } catch (error) {
      res.status(201).send(error);
    }
  },
};

// Get Course Description
exports.getDesc = {
  controller: async (req, res) => {
    try {
      // Course Description Query
      const courseData = await db.courses.findOne({
        where: {
          id: req.params.id,
        },
      });
      res.send("Description : " + courseData.desc);
    } catch (error) {
      res.status(201).send(error);
    }
  },
};

// Get Course Tags
exports.getTag = {
  controller: async (req, res) => {
    try {
      // Course Tag Query
      const courseData = await db.courses.findOne({
        where: {
          id: req.params.id,
        },
      });
      res.send("Tags : " + courseData.tags);
    } catch (error) {
      res.status(201).send(error);
    }
  },
};
