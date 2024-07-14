const db = require("../models");

exports.adminPanelGet = {
    controller: async (req, res) => {
     res.render("adminDash")
  }};
  