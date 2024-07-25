const db = require("../../models");

exports.adminGet = {
    controller: async (req, res) => {
    const branchData = await db.branches.findAll({});
     res.render("../views/admin/dashboard.ejs",{branchData})
  }};
  