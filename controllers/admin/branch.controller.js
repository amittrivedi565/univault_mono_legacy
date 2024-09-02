const db = require("../../models");
const { celebrate, Joi, Segments } = require("celebrate");

// Create Branch Get
exports.createBranchGet = {
  controller: async (req, res) => {
    try {
      // query to find branch where university id matches
      const branchData = await db.branches.findAll({where : {
        uniId : req.params.id
      },order : ['name']});
      res.render("../views/admin/branch.ejs", { branchData});
    } catch (error) {
      console.log(error);
    }
  },
};

// Create Branch Post
exports.createBranchPost = {
  // Validating Incoming Data
  validator: celebrate({
    [Segments.BODY]: Joi.object().keys({
      shortname: Joi.string().required(),
      name: Joi.string().required(),
      tags: Joi.string().required(),
      desc: Joi.string().min(0).max(2500).required(),
    }),
  }),
  controller: async (req, res) => {
    try {
      // Incoming Body Data
      const data = {
        shortname : req.body.shortname,
        name: req.body.name,
        desc: req.body.desc,
        tags: req.body.tags,
        uniId : req.params.id,
      };
      // Query For Branch to Find One With Name
      const branchExists = await db.branches.findOne({
        where: {
          name: req.body.name,
        },
      });
      // Check If Branch Exists
      if (branchExists) {
        res.send("branch already exists");
      } else {
        await db.branches.create(data);
        res.redirect("back");
      }
    } catch (error) {
      console.log(error.message);
    }
  },
};

// Delete Branch
exports.deleteBranch = {
  controller: async (req, res, next) => {
    try {

      // Check If Incoming ID is Valid or Not 
      const isValid = await db.branches.findOne({
        where: {
          id: req.params.id
        },
      });
      if (!isValid) {
        console.log("Invalid ID");
      } else {
        // Delete Branch With ID
        const branchDelete = await db.branches.destroy({
          where: {
            id: id,
          },
        });
        res.redirect("back");
      }
    } catch (error) {
      console.log(error.message);
    }
  },
};

// Get Branch Description
exports.getDesc = {
  controller: async (req, res) => {
    try {
      // Branch Description With ID
      const branchData = await db.branches.findOne({
        where: {
          id: req.params.id,
        },
      });
      res.send("Description : " + branchData.desc);
    } catch (error) {
      console.log(error.message);
    }
  },
};

// Get Branch Tags
exports.getTag = {
  controller: async (req, res) => {
    try {
      // Branch Tag With ID
      const branchData = await db.branches.findOne({
        where: {
          id: req.params.id,
        },
      });
      res.send("Tags : " + branchData.tags);
    } catch (error) {
      console.log(error.message);
    }
  },
};
