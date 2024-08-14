const { where } = require("sequelize");
const db = require("../../models")
exports.courseGet = {
    controller: async (req, res) => {
      const data1 = await db.courses.findAll({order: ['name'],
         where : {
            branch_id : req.params.id
         }
      },
      )
      const data2 = await db.branches.findAll({where :{ id : req.params.id}})
     res.render("../views/client/course.ejs",{
        title :"Course" , data1,data2
     })
  }};
  