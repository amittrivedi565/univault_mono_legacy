const { where } = require("sequelize");
const db = require("../../models");
const { celebrate, Joi, Segments } = require("celebrate");


// Create University Get
exports.createUniGet = {
    controller: async (req, res) => {
      try {
        const uniData = await db.university.findAll({
          order : ['name']
        });
        const adminData = await db.admins.findOne()
        res.render("../views/admin/uni.ejs", { uniData ,adminData});
      } catch (error) {
        console.log(error);
      }
    },
  };
  
  // Create University Post
  exports.createUniPost = {
    // validating incoming data
    validator: celebrate({
      [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        tags: Joi.string().required(),
        desc: Joi.string().min(0).max(2500).required(),
        admin_id: Joi.string().required(),
      }),
    }),
    controller: async (req, res) => {
      try {
        const data = {
          name: req.body.name,
          desc: req.body.desc,
          tags: req.body.tags,
          admin_id : req.body.admin_id
        };
        console.log(data)
        const uniExists = await db.university.findOne({
          where: {
            name: req.body.name,
          },
        });
  
        if (uniExists) {
          res.send("branch already exists");
        } else {
          await db.university.create(data);
          res.redirect("back");
        }
      } catch (error) {
        console.log(error.message);
      }
    },
  };
  


  // Delete branch corresponding courses
exports.deleteUni = {
  controller: async (req, res, next) => {
    try {
      const id = req.params.id;
      const isValid = await db.university.findOne({
        where: {
          id: id,
        },
      });

      if (!isValid) {
        console.log("invalid id ");
      } else {
        const uniDelete = await db.university.destroy({
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

exports.getDesc = {
  controller: async (req, res) => {
    try {
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

exports.getTag = {
  controller: async (req, res) => {
    try {
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
