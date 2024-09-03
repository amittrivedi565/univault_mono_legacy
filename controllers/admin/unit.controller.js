const db = require("../../models");
const { celebrate, Joi, Segments } = require("celebrate");
const S3 = require("aws-sdk").S3;


// S3 Configuration
const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS,
  secretAccessKey: process.env.AWS_SECRET,
  region: process.env.AWS_REGION,
});

exports.getUnit = {
  controller: async (req, res) => {
    try {
      // Find Notes With Subject ID 
      const noteData = await db.notes.findAll({
        where: {
          subId: req.params.id,
        }, order : ['name']
      });
      res.render("../views/admin/unit.ejs", { noteData });
    } catch (error) {
      console.log(error);
    }
  },
};

exports.postUnit = {
  // Validate Incoming Data From Body
  validator: celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      desc: Joi.string().min(0).max(500).required(),
      tags: Joi.string().required(),
      pdf_name : Joi.optional(),
      pdf : Joi.optional(),
      subId: Joi.optional(),
    }),
  }),

  controller: async (req, res) => {
    try {
        // Request Body Data
        const data = {
            name: req.body.name,
            desc: req.body.desc,
            tags: req.body.tags,
            url : req.file.location,
            pdf_name : req.file_name,
            subId: req.params.id,
          };
          // Check If Note Exists 
          const noteExists = await db.notes.findOne({
            where: {
              name: req.body.name,
            },
          });
          // If Exits Stop 
          if (noteExists) {
             res.send("already exists!")
          } else {
            // Create Note Record
            await db.notes.create(data);
            res.redirect("back");
          }
    } catch (error) {
        res.send(error.message)
    }
  },
};
 
// Delete Note By ID
exports.deleteNote = {
  controller: async (req, res) => {
    try {
      // Logic For S3 Object Deletion By Using Filename
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: req.params.file_name,
      };
      // Delete Note PDF 
      s3.deleteObject(params, (error, data) => {
        if (error) {
          res.status(500).send(error);
        }
      });
      // Delete Note Record In Sql
      await db.notes.destroy({
        where: {
          id: req.params.id
        },
      });
      res.redirect("back");
    } catch (error) {
      console.log(error);
    }
  },
};

// Get Note Description
exports.getDesc = {
  controller: async (req, res) => {
    try {
      // Find Note Description
      const noteData = await db.notes.findOne({
        where: {
            id: req.params.id,
        },
      });
      res.json("Description : " + noteData.desc);
    } catch (error) {
      res.send(error.message)
    }
  },
};
// Get Note Tags
exports.getTag = {
  controller: async (req, res) => {
    try {
      // Find Note Tags
      const noteData = await db.notes.findOne({
        where: {
          id: req.params.id,
        },
      });
      res.json("Tags : " + noteData.tags);
    } catch (error) {
      res.send(error.message)
    }
  },
};
