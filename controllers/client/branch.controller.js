const { Json } = require("sequelize/lib/utils");
const db = require("../../models")
exports.branchGet = {
    controller: async (req, res) => { 
        const uniQuery = await db.university.findAll({
                attributes : {
                    exclude : ['url','img_name','admin_id']
                },
                where : {
                    shortname : req.params.uni
                },
                include : [{
                    model : db.branches , as : "branch",
                    attributes : {
                        exclude : ['desc','tags','id','uni_id']
                    }
                }]
            }
        );
        res.render("../views/client/branch.ejs",{title : "Hello",uniQuery})
  }};
  