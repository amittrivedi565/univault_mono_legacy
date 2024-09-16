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
                exclude :['id','desc','tags'],
                include: [
                    {
                        model: db.courses,
                        as: "Course",
                        where: {
                            shortname: req.params.course,
                        },
                        exclude :['id','desc','tags'],
                        include: [
                            {
                                model: db.branches,
                                as: "Branch",
                                where: {
                                    shortname: req.params.branch,
                                },
                                exclude :['id','desc','tags'],
                                include: [
                                    {
                                        model: db.years,
                                        as: "Year",
                                        where: {
                                            name: req.params.year,
                                        },
                                        exclude :['id','desc','tags'],
                                        include: [
                                            {
                                                model: db.sems,
                                                as: "Semester",
                                                exclude :['id','desc','tags'],
                                                include: [
                                                    {
                                                        model: db.subjects,
                                                        as: "Subject",
                                                        exclude :['id','desc','tags'],
                                                        include: [
                                                            {
                                                                model: db.unit,
                                                                as: "Unit",
                                                                exclude :['id','desc','tags']
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
                    req.params.uni +
                        " " +
                        req.params.course +
                        " " +
                        req.params.year
                ).toUpperCase(),
            });
        } catch (error) {
            console.log(error);
            res.status(201).send("Internal Error");
        }
    },
};
