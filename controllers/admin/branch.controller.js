const db = require("../../models");
const { celebrate, Joi, Segments } = require("celebrate");

// Create Branch Get
exports.getBranch = {
  controller: async (req, res) => {
    try {

      const Query = await db.university.findAll({
        where: {
          shortname: req.params.university,
        },
        include: [
          {
            where : {
              shortname : req.params.course,
            },
            model: db.courses,
            as: "Course",
            include : [{
              model : db.branches , as : "Branch",
              where : {
                courseId : req.params.id
              }
            }]
          },
        ],
      });
      

      // University Id for breadcrumb
      let u ;
      Query.forEach(University => {
        u = University.id
      });

      const breadcrumb = [
        {
          label : "Home",
          link : "/close/university",
          isLink : true 
        },
        {
          label : req.params.university,
          link : `/close/${req.params.university}/${u}`,
          isLink : true 
        },
        {
          label : req.params.course,
          isLink : false 
        }
      ]

      res.render("../views/admin/branch.ejs",{Query,title : "Branch",breadcrumb});
    } catch (error) {
      console.log(error);
      res.status(201).send("Internal Error");
    }
  },
};

// Create Branch Post
exports.postBranch = {
  // Validating Incoming Data
  validator: celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      shortname: Joi.string().required(),
      tags: Joi.string().required(),
      desc: Joi.string().min(0).max(2500).required(),
    }),
  }),
  controller: async (req, res) => {
    try {
      // Incoming Body Data
      const data = {
        name: req.body.name,
        shortname: req.body.shortname,
        desc: req.body.desc,
        tags: req.body.tags,
        courseId: req.params.id,
      };
      // Query For Branch to Find One With Name
      const branchExists = await db.branches.findOne({
        where: {
          name: req.body.name,
          shortname: req.body.name,
        },
      });
      // Check If Branch Exists
      if (branchExists) return res.send("Branch Already Exists");
      await db.branches.create(data);
      res.redirect("back");
    } catch (error) {
      console.log(error.message);
      res.status(201).send(error);
    }
  },
};

// Delete Branch
exports.deleteBranch = {
  controller: async (req, res, next) => {
    try {
      // Check If Incoming ID is Valid or Not
      const checkID = await db.branches.findOne({
        where: {
          id: req.params.id,
        },
      });

      if (!checkID) return res.send("Invalid ID");

      // Delete Branch With ID
      const branchDelete = await db.branches.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.redirect("back");
    } catch (error) {
      console.log(error);
      res.status(201).send("Internal Error");
    }
  },
};
