const { where } = require("sequelize");
const db = require("../../models");
const { celebrate, Joi, Segments } = require("celebrate");
const S3 = require("aws-sdk").S3;

// S3 Configuration
const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS,
  secretAccessKey: process.env.AWS_SECRET,
  region: process.env.AWS_REGION,
});

// Create University Get
exports.createUniGet = {
  controller: async (req, res) => {
    try {
      const uniData = await db.university.findAll({ order: ["name"] });
      const adminData = await db.admins.findOne();
      res.render("../views/admin/uni.ejs", { uniData, adminData });
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
      url: Joi.string().optional(),
      img_name: Joi.string().optional(),
      admin_id: Joi.string().optional(),
      pdf: Joi.optional(),
    }),
  }),

  controller: async (req, res) => {
    try {
      const data = {
        name: req.body.name,
        desc: req.body.desc,
        url: req.file.location,
        tags: req.body.tags,
        img_name: req.img_name,
        admin_id: req.admin_id,
      };
      const uniExists = await db.university.findOne({
        where: { name: req.body.name },
      });
      if (uniExists) {
        res.send("branch already exists");
      } else {
        const result = await db.university.create(data);
        console.log(result);
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
      
      const isValid = await db.university.findOne({
        where: { id: req.params.id },
      });

        if (!isValid) {
          res.send("~invalid");
        } else {

          const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: req.params.url,
          };

          s3.deleteObject(params, (error, data) => {
            if (error) {
              res.status(500).send(error);
            }
          });
          await db.university.destroy({
            where: { id: req.params.id },
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
      const uniData = await db.university.findOne({
        where: { id: req.params.id },
      });
      res.send("Description : " + uniData.desc);
    } catch (error) {
      console.log(error.message);
    }
  },
};

exports.getTag = {
  controller: async (req, res) => {
    try {
      const uniData = await db.university.findOne({
        where: { id: req.params.id },
      });
      res.send("Tags : " + uniData.tags);
    } catch (error) {
      console.log(error.message);
    }
  },
};
