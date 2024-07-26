const db = require("../../models")
exports.homeGet = {
    controller: async (req, res) => {
      const courseData = await db.courses.findAll({order :["name"]})
     res.render("../views/client/home.ejs",{
        title : "Home"
     ,courseData})
  }};
  