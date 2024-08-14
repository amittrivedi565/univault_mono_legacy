const { where } = require("sequelize");
const db = require("../../models")
exports.yearGet = {
    controller: async (req, res) => {
      const data1 = await db.years.findAll({order: ['name'],
         where : {
            course_id : req.params.id
         }
      },
      )
      const data2 = await db.courses.findAll({where :{ id : req.params.id}})
      const branch = await db.courses.findAll({nest : false, where: { id: req.params.id },
         include:[{
         model:db.branches,as : "branch"}],
          },
         );
     res.render("../views/client/year.ejs",{
        title :"Year" , data1 , data2 ,branch
     })
  }};
  