const path = require("node:path");
const db = require("../../models");
const { celebrate, Joi, Segments } = require("celebrate");

// create subject
exports.getSubject = {
  controller: async (req, res) => {
    try {
      // Find Subject With Semester ID
      const subData = await db.subjects.findAll({
        where: {
          semId: req.params.id,
        }, order : ['name']
      });
      // Displaying SemData 
      const semData = await db.sems.findAll({});
      res.render("../views/admin/sub.ejs", { subData, semData });
    } catch (error) {
      console.log(error);
      res.status(201).send("Internal Error");
    }
  }
};

// create subject
exports.postSubject = {
  // Validate Incoming Data
  validator: celebrate({
    [Segments.BODY]: Joi.object().keys({
      code: Joi.string().required(),
      name: Joi.string().required(),
      desc: Joi.string().min(0).max(2500).required(),
      tags: Joi.string().required(),
      semId: Joi.string().optional(),
    }),
  }),

  controller: async (req, res) => {
    try { 
      // Request Body Data
        const data = {
        code: req.body.code,
        name: req.body.name,
        desc: req.body.desc,
        tags: req.body.tags,
        semId : req.params.id
      };
      
      // Check If Subject Exists
      const subjectExists = await db.subjects.findOne({
        where: {
          code: req.body.code,
          name: req.body.name,
          semId: req.params.id
        },
      });

      if (subjectExists) return  res.status(201).send("Internal Error");
        await db.subjects.create(data);
        res.redirect("back");
    } catch (error) {
      console.log(error)
      res.status(201).send("Internal Error");
    }
  }
}

// Delete Subject
exports.deleteSubject = {
  controller: async (req, res) => {
    try {
      // Delete Subject With ID
      const deleteRecord = await db.subjects.destroy({
        where: {
          id: req.params.id
        },
      });
      res.redirect("back");
    } catch (error) {
      console.log(error);
      res.status(201).send("Internal Error");
    }
  }
};
