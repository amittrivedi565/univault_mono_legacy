const { where } = require("sequelize");
const db = require("../../models")
exports.branchGet = {
    controller: async (req, res) => {
        
        const uniQuery = await db.university.findAll({
                where : {
                    id : req.params.id
                }
            }
        );
        const branchQuery = await db.branches.findAll({order : ['name'],
           where : {
               uni_id  : req.params.id
           }
        });

        res.render("../views/client/branch.ejs",{title :"Branch" , branchQuery , uniQuery})
  }};
  