const db = require("../../models");
/**
 * @Rout: GET /uni/branch
 **/
exports.getCourse = {
  controller: async (req, res) => {
    try {
      const uniQuery = await db.university.findAll({
        where: {
          shortname: req.params.uni,
        },
        include: [
          {
            model: db.courses,
            as: "Course",
            attributes: {
              exclude: ["desc", "tags", "id", "uniId"],
            },
          },
        ],
      });
      res.render("../views/client/course", {uniQuery});
      // res.send(uniQuery)
    } catch (error) {
      res.send(error);
    }
  },
};
