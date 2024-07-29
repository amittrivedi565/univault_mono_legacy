const db = require("../../models")
exports.branchGet = {
    controller: async (req, res) => {
    //   const uniData = await db.university.findAll({order :["name"]})
     res.render("../views/client/branch.ejs",{
        title :"Branch"
     })
  }};
  