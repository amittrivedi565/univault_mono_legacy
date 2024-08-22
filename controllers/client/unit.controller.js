const { where } = require("sequelize");
const db = require("../../models");
const { raw } = require("body-parser");
const { DynamoDB } = require("aws-sdk");
exports.unitGet = {
  controller: async (req, res) => {
      const branchQuery  = await db.branches.findAll({
         where : {
            id : req.params.id
         },
         order : ['name'],
         include : [{
            model : db.courses , as : 'course',
            include : [{
               model : db.years , as : 'years',
               where : {
                  id : req.params.year_id
               },
               include : [{
                  model : db.sems , as : 'semester',
                  include : [{
                     model : db.subjects , as : 'subject'
                  }]
               }]
            }]
         }]
      })
      res.render('../views/client/subject',{title : 'Subject',branchQuery})
  }
};
