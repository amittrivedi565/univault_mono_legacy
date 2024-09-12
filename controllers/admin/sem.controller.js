const db = require("../../models");
const { celebrate, Joi, Segments } = require("celebrate");

exports.getSem = {
  controller: async (req, res) => {
    try {
      // Find Sememster With Year ID
      const Query = await db.university.findAll({
        where: {
          shortname: req.params.university,
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
                    include: [
                      {
                        model: db.sems,
                        as: "Semester",
                        where: {
                          yearId: req.params.id,
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      });

      let c;
      let b;
      Query.forEach((uni) => {
        uni.Course.forEach((Course) => {
          c = Course.id;
          Course.Branch.forEach((Branch) => {
            b = Branch.id;
          });
        });
      });
      const breadcrumb = [
        {
          label : "Home",
          link : "/close/university",
          isLink : true 
        },
        {
          label: req.params.university,
          link: "/close/university",
          isLink: true,
        },
        {
          label: req.params.course,
          link: `/close/${req.params.university}/${req.params.course}/${c}`,
          isLink: true,
        },
        {
          label: req.params.branch,
          link: `/close/${req.params.university}/${req.params.course}/${req.params.branch}/${b}`,
          isLink: true,
        },
        {
          label: req.params.year,
          isLink: false,
        },
      ];

      res.render("../views/admin/sem.ejs", { Query, title: "Sem", breadcrumb });
    } catch (error) {
      console.log(error);
      res.status(201).send("Internal Error");
    }
  },
};

exports.postSem = {
  // Validate Incoming Data
  validator: celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
    }),
  }),
  controller: async (req, res) => {
    try {
      // Request Body Data
      const data = {
        name: req.body.name,
        yearId: req.params.id,
      };

      // Check If Semester Exists?
      const semCheck = await db.sems.findOne({
        where: {
          name: req.body.name,
          yearId: req.params.id,
        },
      });

      if (semCheck) return res.status(201).send("Semester Already Exists");
      // Create Semester Record
      await db.sems.create(data);
      res.redirect("back");
    } catch (error) {
      console.log(error);
      res.status(201).send("Internal Error");
    }
  },
};
