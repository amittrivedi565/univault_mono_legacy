const { errors } = require("celebrate");
const db = require("../../models");
const flash = require("connect-flash");
const { query } = require("express");
/**
 * @Rout: GET /:uni
 **/
exports.getCourse = {
  controller: async (req, res) => {
    try {
      var checkUni = await db.university.findOne({
        where: {
          shortname: req.params.uni,
        },
      });
      if (!checkUni) {
        req.flash("error", "No University Exists With This ID");
      }

      const uniQuery = await db.university.findAll({
        where: {
          shortname: req.params.uni,
        },
        include: [
          {
            model: db.courses,
            as: "Course",
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
          isLink: false,
        },
      ];

      res.render("../views/client/course", {
        uniQuery,
        message: req.flash("error"),
        breadcrumbs: breadcrumb_items,
        title: String(req.params.uni).toUpperCase(),
      });
    } catch (error) {
      console.log(error);
      res.status(201).send("Internal Error");
    }
  },
};
