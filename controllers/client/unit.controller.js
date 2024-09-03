const db = require("../../models");
/**
 * @Rout: GET /uni/branch/course/year
**/
exports.getUnit = {
  controller: async (req, res) => {
      try {
         const uniQuery  = await db.university.findAll({
            where : {
               shortname : req.params.uni
            },
            include : [{
               model : db.courses , as : 'course',
               where : {
                  shortname : req.params.course
               },
               include : [{
                  model : db.branches , as : 'branch',
                  where : {
                     shortname : req.params.branch
                  },
                  include : [{
                     model : db.years , as : 'years',
                     where : {
                        name: req.params.year
                     },
                     include : [{
                        model : db.sems , as : 'semester',
   
                        include : [{
                           model : db.subjects , as : 'subject'
                        }]
                     }]
                  }]
               }]
            }]
         })
         res.render('../views/client/subject',{uniQuery})
         // res.send(uniQuery)
      } catch (error) {
         res.send(error)
      }
  }
};
