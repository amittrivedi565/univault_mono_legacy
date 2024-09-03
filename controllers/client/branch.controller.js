
const db = require("../../models")
/**
 * @Rout: GET /uni/branch
**/
exports.getBranch = {
   controller : async(req,res)=>{
      try {
         const uniQuery = await db.university.findAll({
            where : {
               shortname : req.params.uni
            },
            include : [{
               model : db.courses , as : "Course",
               where : {
                  shortname : req.params.course    
               },
               include : [{
                  model : db.branches , as : "Branch"
               }]
            }]
         })

         res.render("../views/client/branch", {uniQuery});
      } catch (error) {
         res.send(error)
      }
   }
}
  
