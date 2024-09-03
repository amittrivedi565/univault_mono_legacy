const db = require("../../models");
const { celebrate, Joi, Segments } = require("celebrate");

// Get Courses
exports.getCourse = {
  controller: async (req, res) => {
    try {
      // Query To Find Courses With Branch ID
      const courseData = await db.courses.findAll({
        where: {
          uniId: req.params.id,
        },
        order: ["name"],
      });
      res.render("../views/admin/course.ejs", { courseData });
    } catch (error) {
      console.log(error);
      res.status(201).send("Internal Error");
    }
  },
};

// Create Course
exports.postCourse = {
  // Validate Incoming Data
  validator: celebrate({
    [Segments.BODY]: Joi.object().keys({
      shortname: Joi.string().required(),
      name: Joi.string().required(),
      desc: Joi.string().min(0).max(2500).required(),
      tags: Joi.string().required(),
      id: Joi.string().optional(),
    }),
  }),

  controller: async (req, res) => {
    try {
      // Incoming Data From Body
      const data = {
        shortname: req.body.shortname,
        name: req.body.name,
        desc: req.body.desc,
        tags: req.body.tags,
        uniId: req.params.id,
      };
      const checkCourse = await db.courses.findOne({
        where: {
          name: req.body.name,
          shortname : req.body.shortname
        },
      });
      if (checkCourse) return res.send("Course Already Exists");
      await db.courses.create(data)
      res.redirect("back")
    } catch (error) {
      console.log(error);
      res.status(201).send("Internal Error");
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
          id: req.params.id,
        },
      });
      res.redirect("back");
    } catch (error) {
      console.log(error)
      res.status(201).send("Internal Error");
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
      console.log(error)
      res.status(201).send("Internal Error");
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
      console.log(error)
      res.status(201).send("Internal Error");
    }
  },
};
