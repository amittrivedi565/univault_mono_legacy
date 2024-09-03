const db = require("../../models");
/**
 * @Rout: GET /uni
 **/
exports.branchGet = {
    controller: async (req, res) => {
        try {
            const uniQuery = await db.university.findAll({
                attributes: {
                    exclude: ["url", "img_name", "admin_id"],
                },
                where: {
                    shortname: req.params.uni,
                },
                include: [
                    {
                        model: db.branches,
                        as: "branch",
                        attributes: {
                            exclude: ["desc", "tags", "id", "uni_id"],
                        },
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

            res.render("../views/client/branch", {
                title: "TBA",
                uniQuery,
                breadcrumbs: breadcrumb_items,
            });
        } catch (error) {
            res.send(error);
        }
    },
};
