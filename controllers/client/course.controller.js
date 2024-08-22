const { where } = require("sequelize");
const db = require("../../models")
exports.courseGet = {
   controller : async(req,res)=>{
      const branchQuery = await db.branches.findAll({
         order : ['name'],
         where : {
            id : req.params.id
         },
         include : [{
            model : db.courses , as : "course"
         }]
      })
      res.render('../views/client/course.ejs',{title : 'Course',branchQuery})
   }
}
  