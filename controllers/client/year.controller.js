const { where } = require("sequelize");
const db = require("../../models")
exports.yearGet = {
    controller: async (req, res) => {

      const branchQuery = await db.branches.findAll({
         where : {
            id : req.params.id
         },
         include : [{
            model : db.courses , as : 'course',
            where : {
               id : req.params.course_id
            },
            include : [{
               model : db.years , as : 'years',
            }]
         }]
      })
      res.render('../views/client/year',{title : 'Year',branchQuery})
    }
   }

  