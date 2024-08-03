const { where } = require("sequelize");
const db = require("../../models")
exports.noteGet = {
    controller: async (req, res) => {
      const data = await db.notes.findAll({order: ['name'],
         where : {
            sub_id : req.params.id
         }
      },
      )
      const subData = await db.subjects.findOne({where: {
         id : req.params.id
      }})
     res.render("../views/client/note.ejs",{
        title :"Notes" , data , subData
     })
  }};
  