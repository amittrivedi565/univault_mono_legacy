const db = require("../../models");
exports.homeGet = {
  controller: async (req, res) => {
    try {
      const uniQuery = await db.university.findAll({ order: ["name"] });
      res.render("../views/client/home",{title :"TBA",uniQuery})
    } catch (error) {
      res.send(error)
    }
  },
};
