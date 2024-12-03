const db = require("../../models");
/**
 * @Rout: GET /:uni/:course/:branch/:year
 **/
exports.getUnit = {
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
                as: "Branch",
                where: {
                  shortname: req.params.branch,
                },
                include: [
                  {
                    model: db.years,
                    as: "Year",
                    where: {
                      name: req.params.year,
                    },
                    include: [
                      {
                        model: db.sems,
                        as: "Semester",

                        include: [
                          {
                            model: db.subjects,
                            as: "Subject",

                            include: [
                              {
                                model: db.unit,
                                as: "Unit",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
        order: [
          [
              { model: db.courses, as: "Course" },
              { model: db.branches, as: "Branch" },
              { model: db.years, as: "Year" },
              { model: db.sems, as: "Semester" },
              { model: db.subjects, as: "Subject" },
              { model: db.unit, as: "Unit" },
              "name",
              "ASC",
          ],
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
          isLink: true,
        },
        {
          label: req.params.branch,
          link: `/${req.params.uni}/${req.params.course}/${req.params.branch}`,
          isLink: true,
        },
        {
          label: req.params.year,
          link: `/${req.params.uni}/${req.params.course}/${req.params.branch}/${req.params.year}`,
          isLink: false,
        },
      ];
      res.render("../views/client/subject", {
        uniQuery,
        breadcrumbs: breadcrumb_items,
        title: String(
          uniQuery[0].shortname.toUpperCase() + " " +
          uniQuery[0].Course[0].shortname + " " +
          uniQuery[0].Course[0].Branch[0].Year[0].toUpperCase()
        ),
      });
    } catch (error) {
      console.log(error);
      res.status(201).send("Internal Error");
    }
  },
};
