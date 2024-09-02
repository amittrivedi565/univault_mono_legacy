const db = require("../../models")
/**
 * @Rout: GET /uni
**/
exports.branchGet = {
    controller: async (req, res) => { 
        try {
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
        res.render("../views/client/branch",{title :"TBA",uniQuery})
        } catch (error) {
            res.send(error)
        }
  }};
  