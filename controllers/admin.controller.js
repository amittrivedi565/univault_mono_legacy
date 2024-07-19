const db = require("../models");

exports.adminGet = {
    controller: async (req, res) => {
     res.render("../views/dashboard.ejs")
  }};
  