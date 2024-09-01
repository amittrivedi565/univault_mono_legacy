const db = require("../../models")
exports.branchGet = {
    controller: async (req, res) => { 
        const uniQuery = await db.university.findAll({
                where : {
                    name : req.params.name
                },
                include : [{
                    model : db.branches , as : "branch"
                }]
            }
        );
        res.render("../views/client/branch.ejs",{title :"Branch" , uniQuery})
  }};
  