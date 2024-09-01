const db = require("../../models");
exports.adminGet = {
    controller: async (req, res) => {
    // display dashboard page
     res.render("../views/admin/dashboard.ejs")
  }};
  