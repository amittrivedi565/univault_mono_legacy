const db = require("../../models")
exports.homeGet = {
    controller: async (req, res) => {
      const branchData = await db.branches.findAll({order :["name"]})
     res.render("../views/client/home.ejs",{
        title : "Home"
     ,branchData})
  }};
  