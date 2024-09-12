const { json } = require("body-parser");
const db = require("../../models");
const { celebrate, Joi, Segments } = require("celebrate");

exports.getYear = {
  controller: async (req, res) => {
    try {
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
                    where : {
                      branchId : req.params.id
                    }
                  },
                ],
              },
            ],
          },
        ],
      });

    
      let c  ;
      let u;
      Query.forEach(uni => {
        u = uni.id
        uni.Course.forEach(course => {
            c = course.id
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
          link: `/close/${req.params.university}/${u}`,
          isLink: true,
        },
        {
          label: req.params.course,
          link: `/close/${req.params.university}/${req.params.course}/${c}`,
          isLink: true,
        },
        {
          label: req.params.branch,
          isLink: false,
        },
      ];

      res.render("../views/admin/year.ejs", {
        Query,
        breadcrumb,
        title: "Year",
      });
    } catch (error) {
      console.log(error);
      res.status(201).send("Internal Error");
    }
  },
};

// Create Year
exports.postYear = {
  // Validating Incoming Data
  validator: celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
    }),
  }),

  controller: async (req, res) => {
    try {
      // Request Body Data
      const yearData = {
        name: req.body.name,
        branchId: req.params.id,
      };

      const checkYear = await db.years.findOne({
        where: {
          name: req.body.name,
          branchId: req.params.id,
        },
      });

      if (!checkYear) await db.years.create(yearData);
      res.redirect("back");
    } catch (error) {
      console.log(error);
      res.status(201).send("Internal Error");
    }
  },
};

// Delete Year
exports.deleteYear = {
  controller: async (req, res) => {
    try {
      // Check Is Valid ID or Not?
      const deleteCheck = await db.years.findOne({ id: req.params.id });

      if (!deleteCheck) {
        res.send("Wrong Year Id");
      }
      // Delete Year Record
      const deleteRecord = await db.years.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.redirect("back");
    } catch (error) {
      console.log(error);
      res.status(201).send("Internal Error");
    }
  },
};
