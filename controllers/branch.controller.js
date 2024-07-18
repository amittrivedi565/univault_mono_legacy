const { where } = require("sequelize");
const db = require("../models");
const { celebrate, Joi, Segments } = require("celebrate");

// Create Branch Get
exports.createBranchGet = {
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

// Delete branch corresponding courses
exports.deleteBranch = {
  controller: async (req, res, next) => {
    try {
      const id = req.params.id;
      const isValid = await db.branches.findOne({
        where: {
          branch_id: id,
        },
      });

      if (!isValid) {
        console.log("invalid id ");
      } else {
        const branchDelete = await db.branches.destroy({
          where: {
            branch_id: id,
          },
        });
        res.redirect("back");
      }
    } catch (error) {
      console.log(error.message);
    }
  },
};

exports.getDesc = {
  controller: async (req, res) => {
    try {
      const branchData = await db.branches.findOne({
        where: {
          branch_id: req.params.id,
        },
      });
      res.send("Description : " + branchData.branch_desc);
    } catch (error) {
      console.log(error.message);
    }
  },
};

exports.getTag = {
  controller: async (req, res) => {
    try {
      const branchData = await db.branches.findOne({
        where: {
          branch_id: req.params.id,
        },
      });
      res.send("Tags : " + branchData.branch_tags);
    } catch (error) {
      console.log(error.message);
    }
  },
};
