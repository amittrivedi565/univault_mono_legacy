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
      const adminData = await db.admins.findOne()
      res.render("../views/admin/university",{uniData,adminData});
    } catch (error) {
      console.log(error);
      res.status(201).send("Internal Error");
    }
  },
};

// Create University Post
exports.createUniPost = {

  // Validating Incoming Data
  validator: celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      shortname : Joi.string().required(),
      tags: Joi.string().required(),
      desc: Joi.string().min(0).max(2500).required(),
      imgUrl: Joi.string().optional(),
      imgName: Joi.string().optional(),
      pdf: Joi.optional(),
      admin_id: Joi.string().optional(),
    }),
  }),

  controller: async (req, res) => {
    try {
      // Request Body Data
      const data = {
        name: req.body.name,
        shortname : req.body.shortname,
        desc: req.body.desc,
        tags: req.body.tags,
        imgUrl: req.file.location,
        imgName: req.file_name,
        adminId: req.admin_id,
      };
      // Check If University Already Exists?
      const uniCheck = await db.university.findOne({
        where: { name: req.body.name }
      });

      if(uniCheck) return res.send("University / College Already Exists");
      // Create University Record
      await db.university.create(data);
      res.redirect("back");
    } catch (error) {
      console.log(error);
      res.status(201).send("Internal Error");
    }
  },
};

// Delete University
exports.deleteUni = {
  controller: async (req, res, next) => {
    try {
          const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: req.params.file_name,
          };
          // Deleting S3 Object (University Logo)
          s3.deleteObject(params, (error, data) => {
            if (error) {
              res.status(500).send(error);
            }
          });
          // Delete University Record
          await db.university.destroy({
            where: { id: req.params.id },
          });
          res.redirect("back");
    } catch (error) {
      console.log(error);
      res.status(201).send("Internal Error");
    }
  },
};

// Get University Description
exports.getDesc = {
  controller: async (req, res) => {
    try {
      const uniData = await db.university.findOne({
        where: { id: req.params.id },
      });
      res.send("Description : " + uniData.desc);
    } catch (error) {
      console.log(error);
      res.status(201).send("Internal Error");
    }
  },
};

// Get University Tags
exports.getTag = {
  controller: async (req, res) => {
    try {
      const uniData = await db.university.findOne({
        where: { id: req.params.id },
      });
      res.send("Tags : " + uniData.tags);
    } catch (error) {
      console.log(error);
      res.status(201).send("Internal Error");
    }
  },
};
