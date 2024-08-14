const { where } = require("sequelize");
const db = require("../../models")
exports.semGet = {
    controller: async (req, res) => {
      const data1 = await db.sems.findAll({order: ['name'],
         where : {
            year_id : req.params.id,
         }
      },
      )
      const data2 = await db.years.findAll({where :{ id : req.params.id}})
     res.render("../views/client/sem.ejs",{
        title :"Semesters" , data1,data2
     })
  }};
