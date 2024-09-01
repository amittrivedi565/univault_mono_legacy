const db = require("../../models")
exports.courseGet = {
   controller : async(req,res)=>{
      const uniQuery = await db.university.findAll({
         where : {
            name : req.params.uni
         },
         include : [{
            model : db.branches , as : "branch",
            include : [{
               model : db.courses , as : "course"
            }]
         }]
      })
      res.render('../views/client/course.ejs',{title : 'Course',uniQuery})
   }
}
  