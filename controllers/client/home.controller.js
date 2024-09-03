const db = require("../../models");
/**
 * @Rout: GET /
**/
exports.getHome = {
  controller: async (req, res) => {
    try {
      const uniQuery = await db.university.findAll({ order: ["name"] });
      res.render("../views/client/home",{uniQuery})
    } catch (error) {
      res.send(error)
    }
  },
};
