const path = require("node:path");
const db = require("../models");
const { celebrate, Joi, Segments } = require("celebrate");

// create subject
exports.createSubjectGet = {
  controller: async (req, res) => {
    try {
      const subData = await db.subjects.findAll({
        where: {
          sem_id: req.params.id,
        },
      });
      const semData = await db.sem.findAll({});
      res.render("../views/sub.ejs", { subData, semData });
    } catch (error) {
      console.log(error);
    }
  },
};
// create subject
exports.createSubjectPost = {
  validator: celebrate({
    [Segments.BODY]: Joi.object().keys({
      sub_code: Joi.string().required(),
      sub_name: Joi.string().required(),
      sub_desc: Joi.string().min(0).max(500).required(),
      sub_tags: Joi.string().required(),
      sem_id: Joi.string().optional(),
      sem_name: Joi.string().optional(),
    }),
  }),

  controller: async (req, res) => {
    try { 

        
        const data = {
        sub_code: req.body.sub_code,
        sub_name: req.body.sub_name,
        sub_desc: req.body.sub_desc,
        sub_tags: req.body.sub_tags,
        sem_name: req.params.sem_name,
        sem_id: req.params.id,
      };

      const subjectExists = await db.subjects.findOne({
        where: {
          sub_code: req.body.sub_code,
          sub_name: req.body.sub_name,
        },
      });

      if (subjectExists) 
        {
        res.send("Subject Already Exists");
      } 
      else 
      {
        const record = await db.subjects.create(data);
        res.redirect("back");
      }
    } catch (error) {
      res.send(error.message);
    }
  },
}

exports.deleteSubject = {
  controller: async (req, res) => {
    try {
      
      const deleteRecord = await db.subjects.destroy({
        where: {
          sub_id: req.params.id
        },
      });
      res.redirect("back");
    } catch (error) {
      console.log(error);
    }
  },
};


exports.getDesc = {
  controller: async (req, res) => {
    try {
      const subData = await db.subjects.findOne({
        where: {
          sub_id: req.params.id,
        },
      });
      res.send("Description : " + subData.sub_desc);
    } catch (error) {}
  },
};

exports.getTag = {
  controller: async (req, res) => {
    try {
      const subData = await db.subjects.findOne({
        where: {
          sub_id: req.params.id,
        },
      });
      res.send("Tags : " + subData.sub_tags);
    } catch (error) {}
  },
};

