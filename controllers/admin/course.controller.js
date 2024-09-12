const { where, QueryTypes } = require("sequelize");
const db = require("../../models");
const { celebrate, Joi, Segments } = require("celebrate");

// Get Courses
exports.getCourse = {
  controller: async (req, res) => {
    try {

      const Query = await db.university.findAll({
        where : {
          id : req.params.id
        },
        include : [{
          model : db.courses , as : "Course"
        }]
      });

      const breadcrumb = [
        {
          label : "Home",
          link : "/close/university",
          isLink : true 
        },
        {
          label : req.params.university,
          isLink : false 
        }
      ]
      res.render("../views/admin/course.ejs",{Query , title : "Course",breadcrumb});
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
      name: Joi.string().required(),
      shortname: Joi.string().required(),
      desc: Joi.string().min(0).max(2500).required(),
      tags: Joi.string().required()
    }),
  }),

  controller: async (req, res) => {
    try {
      // Incoming Data From Body
      const data = {
        name: req.body.name,
        shortname: req.body.shortname,
        desc: req.body.desc,
        tags: req.body.tags,
        uniId: req.params.id
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
          id: req.params.id
        },
      });
      res.redirect("back");
    } catch (error) {
      console.log(error)
      res.status(201).send("Internal Error");
    }
  },
};
