const db = require("../../models");
/**
 * @Rout: GET /:uni/:course
 **/
exports.getBranch = {
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
            where: {
              shortname: req.params.course,
            },
            include: [
              {
                model: db.branches,
                as: "Branch"
              },
            ],
          },
        ],
      });
      // Create Breadcrumb Items
      let breadcrumb_items = [
        {
          label: "Home",
          link: "/",
          isLink: true,
        },
        {
          label: req.params.uni,
          link: `/${req.params.uni}`,
          isLink: true,
        },
        {
          label: req.params.course,
          link: `/${req.params.uni}/${req.params.course}`,
          isLink: false,
        },
      ];
      res.render("../views/client/branch", {
        uniQuery,
        breadcrumbs: breadcrumb_items,
        title: String(req.params.uni + " " + req.params.course).toUpperCase(),
      });
    } catch (error) {
      console.log(error);
      res.status(201).send("Internal Error");
    }
  },
};
