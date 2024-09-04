const db = require("../../models")
/**
 * @Rout: GET /uni/branch/course
**/
exports.getYear = {
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
                  model : db.branches , as :  "Branch",
                  where : {
                     shortname : req.params.branch,
                  },
                  include : [{
                     model : db.years , as : "Year",
                  }]
               }]
            }]
         })
         res.render('../views/client/year',{uniQuery})
      } catch (error) {
         console.log(error);
         res.status(201).send("Internal Error");
      }
   }
}
  