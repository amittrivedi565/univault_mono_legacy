const { where } = require("sequelize");
const db = require("../../models")
exports.branchGet = {
    controller: async (req, res) => {
      const data = await db.branches.findAll({order: ['name'],
         where : {
            uni_id : req.params.id
         }
      },
      )
     res.render("../views/client/branch.ejs",{
        title :"Branch" , data
     })
  }};
  