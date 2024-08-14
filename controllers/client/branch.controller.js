const { where } = require("sequelize");
const db = require("../../models")
exports.branchGet = {
    controller: async (req, res) => {
         const data1 = await db.branches.findAll({order: ['name'],where : {uni_id : req.params.id}})
         const data2 = await db.university.findAll({where :{ id : req.params.id}})
         res.render("../views/client/branch.ejs",{title :"Branch" , data1 , data2})
  }};
  