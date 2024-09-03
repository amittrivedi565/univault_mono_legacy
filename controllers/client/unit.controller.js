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
               model : db.courses , as : 'Course',
               where : {
                  shortname : req.params.course
               },
               include : [{
                  model : db.branches , as : 'Branch',
                  where : {
                     shortname : req.params.branch
                  },
                  include : [{
                     model : db.years , as : 'Year',
                     where : {
                        name: req.params.year
                     },
                     include : [{
                        model : db.sems , as : 'Semester',
   
                        include : [{
                           model : db.subjects , as : 'Subject'
                        }]
                     }]
                  }]
               }]
            }]
         })
         res.render('../views/client/subject',{uniQuery})
      } catch (error) {
         res.send(error)
      }
  }
};
