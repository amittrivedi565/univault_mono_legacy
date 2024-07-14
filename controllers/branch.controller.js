const { where } = require("sequelize");
const db = require("../models");
const { celebrate, Joi, Segments } = require("celebrate");
const flash = require("connect-flash");

// Create Branch Get
exports.createBranchPage = {
  controller: async (req, res) => {
    try {
      const branchData = await db.branches.findAll({});
      res.render("../views/branch.ejs", { branchData });
    } catch (error) {
      console.log(error);
    }
  },
};

// Create Branch Post
exports.createBranchPost = {
  // validating incoming data
  validator: celebrate({
    [Segments.BODY]: Joi.object().keys({
      branch_name: Joi.string().required(),
      branch_tags: Joi.string().required(),
      branch_desc: Joi.string().min(0).max(2500).required(),
    }),
  }),
  controller: async (req, res) => {
    try {
      const data = {
        branch_name: req.body.branch_name,
        branch_desc: req.body.branch_desc,
        branch_tags: req.body.branch_tags,
      };

      const branchExists = await db.branches.findOne({
        where: {
          branch_name: req.body.branch_name,
        },
      });

      if (branchExists) {
        res.send("Error");
      } else {
        await db.branches.create(data);
        res.redirect("back");
      }
    } catch (error) {
      console.log(error);
    }
  },
};


// Delete branch corresponding courses
exports.deleteBranch = {
  controller: async (req, res) => {
    try {
      const id = req.params.id;
      const branchDelete = await db.branches.destroy({
        where: {
          branch_id: id,
        },
      });
      console.log(branchDelete);
      res.redirect("/api/close/branch");
    } catch (error) {
      console.log(error);
    }
  },
};
