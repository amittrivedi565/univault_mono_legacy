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
exports.getUniversity = {
  controller: async (req, res) => {
    try {
      const uniData = await db.university.findAll({})
      const adminData = await db.admins.findAll({})
      res.render("../views/admin/university",{uniData,adminData});
    } catch (error) {
      console.log(error);
      res.status(201).send("Internal Error");
    }
  },
};

// Create University Post
exports.postUniversity = {
  
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
      adminId: Joi.string().optional(),
      adminName: Joi.string().optional(),
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
        imgName: req.fileName,
        adminId: req.adminId,
        adminName: req.adminName,
      };
      // Check If University Already Exists?
      const uniCheck = await db.university.findOne({
        where: { name: req.body.name }
      });
      // Check If AdminId is Valid or Not
      const adminCheck = await db.admins.findOne({
        where : {
          id : req.adminId
        }
      })
      if(uniCheck) return res.send("University / College Already Exists");

      if(!adminCheck) return res.send("AdminID is invalid") ;
      
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
exports.deleteUniversity = {
  controller: async (req, res, next) => {
    try {
          const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: req.params.imgName,
          };
          // Deleting S3 Object (University Image)
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
