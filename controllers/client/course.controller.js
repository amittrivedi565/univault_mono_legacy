const db = require("../../models");
/**
 * @Rout: GET /uni/branch
 **/
exports.courseGet = {
    controller: async (req, res) => {
        try {
            const uniQuery = await db.university.findAll({
                where: {
                    shortname: req.params.uni,
                },
                include: [
                    {
                        model: db.branches,
                        as: "branch",
                        where: {
                            shortname: req.params.branch,
                        },
                        include: [
                            {
                                model: db.courses,
                                as: "course",
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
                    label: req.params.branch,
                    link: `/${req.params.uni}/${req.params.branch}`,
                    isLink: false,
                },
            ];

            res.render("../views/client/course", {
                title: "Course",
                uniQuery,
                breadcrumbs: breadcrumb_items,
            });
        } catch (error) {
            res.send(error);
        }
    },
};
