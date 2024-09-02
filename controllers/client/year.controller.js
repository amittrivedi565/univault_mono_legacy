const db = require("../../models")
/**
 * @Rout: GET /uni/branch/course
**/
exports.yearGet = {
   controller : async(req,res)=>{
      try {
         const uniQuery = await db.university.findAll({
            where : {
               shortname : req.params.uni
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
                     model : db.years , as : "years",
                  }]
               }]
            }]
         })
         res.render('../views/client/year',{title : 'Year',uniQuery})
      } catch (error) {
         res.send(error)
      }
   }
}
  