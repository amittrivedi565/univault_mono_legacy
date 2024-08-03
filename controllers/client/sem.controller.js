const { where } = require("sequelize");
const db = require("../../models")
exports.semGet = {
    controller: async (req, res) => {
      const data = await db.sems.findAll({order: ['name'],
         where : {
            year_id : req.params.id
         }
      },
      )
     res.render("../views/client/sem.ejs",{
        title :"Semesters" , data
     })
  }};
  