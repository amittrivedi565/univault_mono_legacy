const db = require("../../models")
exports.yearGet = {
    controller: async (req, res) => {
      const uniQuery = await db.university.findAll({
         where : {
            name : req.params.uni
         },
         include : [{
            model : db.branches , as : "branch",
            where : {
               shortname : req.params.branch
            },
            include : [{
               model : db.courses , as : "course",
               where : {
                  code : req.params.course,
               },
               include : [{
                  model : db.years , as : "years"
               }]
            }]
         }]
      })
      res.render('../views/client/year',{title : 'Year',uniQuery})
    }
   }

  