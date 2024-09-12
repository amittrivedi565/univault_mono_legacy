const db = require("../../models");
exports.adminGet = {
    controller: async (req, res) => {
        const adminData = await db.admins.findAll({})
        const Param = req.query 
        res.render("../views/admin/dashboard.ejs",{adminData , title : "Dashboard"})
  }};
  