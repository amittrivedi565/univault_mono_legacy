const { where } = require("sequelize");
const db = require("../../models")
exports.subGet = {
    controller: async (req, res) => {
      const data = await db.subjects.findAll({order: ['name'],
         where : {
            sem_id : req.params.id
         }
      },
      )
     res.render("../views/client/subject.ejs",{
        title :"Subjects" , data
     })
  }};
  