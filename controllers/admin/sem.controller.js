const db = require("../../models");
const { celebrate, Joi, Segments } = require("celebrate");

exports.getSem = {
  controller: async (req, res) => {
    try {
      // Find Sememster With Year ID
      const semData = await db.sems.findAll({
        where: {
          yearId: req.params.id,
        }, order  : ['name']
      });
      res.render("../views/admin/sem.ejs", { semData });
    } catch (error) {
      console.log(error)
      res.status(201).send("Internal Error");
    }
  },
};

exports.postSem = {
  // Validate Incoming Data
  validator: celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      yearId: Joi.string().required(),
    }),
  }),
  controller: async (req, res) => {
    try {

      // Request Body Data
      const data = {
        name: req.body.name,
        yearId: req.params.id,
      };

      // Check If Semester Exists?
      const semCheck = await db.sems.findOne({ where : {
        name : req.body.name,
        yearId : req.params.id
      } });
      
      if(semCheck) return  res.status(201).send("Semester Already Exists");
      // Create Semester Record
      await db.sems.create(data);
      res.redirect("back");
    } catch (error) {
      console.log(error);
    }
  },
};
