const db = require("../../models");
exports.homeGet = {
  controller: async (req, res) => {
    const uniQuery = await db.university.findAll({ order: ["name"] });
    res.render("../views/client/home.ejs", {
      title: "Home",
      uniQuery,
    });
  },
};
