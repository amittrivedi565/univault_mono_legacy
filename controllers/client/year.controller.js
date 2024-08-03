const { where } = require("sequelize");
const db = require("../../models")
exports.yearGet = {
    controller: async (req, res) => {
      const data = await db.years.findAll({order: ['name'],
         where : {
            course_id : req.params.id
         }
      },
      )
     res.render("../views/client/year.ejs",{
        title :"Year" , data
     })
  }};
  