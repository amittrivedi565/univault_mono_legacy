const db = require("../../models")
/**
 * @Rout: GET /uni/branch
**/
exports.courseGet = {
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
                  model : db.courses , as : "course"
               }]
            }]
         })
         res.render('../views/client/course.ejs',{title : 'Course',uniQuery})
      } catch (error) {
         console.log(error)
      }
   }
}
  