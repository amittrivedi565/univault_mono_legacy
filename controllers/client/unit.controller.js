const db = require("../../models");
/**
 * @Rout: GET /uni/branch/course/year
**/
exports.unitGet = {
  controller: async (req, res) => {
      try {
         const uniQuery  = await db.university.findAll({
            where : {
               shortname : req.params.uni
            },
            include : [{
               model : db.branches , as : 'branch',
               where : {
                  shortname : req.params.branch
               },
               include : [{
                  model : db.courses , as : 'course',
                  where : {
                     code : req.params.course
                  },
                  include : [{
                     model : db.years , as : 'years',
                     where : {
                        value: req.params.year
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
         res.render('../views/client/subject',{title : 'Subject',uniQuery})
      } catch (error) {
         console.log(error)
      }
  }
};
