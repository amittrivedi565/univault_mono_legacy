const { where } = require("sequelize");
const db = require("../../models")
exports.courseGet = {
    controller: async (req, res) => {
      const data = await db.courses.findAll({order: ['name'],
         where : {
            branch_id : req.params.id
         }
      },
      )
     res.render("../views/client/course.ejs",{
        title :"Course" , data
     })
  }};
  