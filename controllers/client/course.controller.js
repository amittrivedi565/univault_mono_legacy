const { errors } = require("celebrate");
const db = require("../../models");
const flash = require('connect-flash')
/**
 * @Rout: GET /:uni
 **/
exports.getCourse = {
  controller: async (req, res) => {
    try {
      var checkUni = await db.university.findOne({where:{
        shortname : req.params.uni
     }})
     if(!checkUni) {
      req.flash("error","No University Exists With This ID")
    }
      const uniQuery = await db.university.findAll({
        where: {
          shortname: req.params.uni,
        },
        include: [
          {
            model: db.courses,
            as: "Course",
            attributes: {
              exclude: ["desc", "tags", "id", "uniId"],
            },
          },
        ],
      });
      res.render("../views/client/course", {uniQuery , message : req.flash("error")});
    } catch (error) {
      console.log(error);
      res.status(201).send("Internal Error");
    }
  },
};
