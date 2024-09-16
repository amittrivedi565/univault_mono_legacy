const path = require("node:path");
const db = require("../../models");
const { celebrate, Joi, Segments } = require("celebrate");
const updateActionStatus = require("../../middlewares/updateactionlog");

// create subject
exports.getSubject = {
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
                                        where: {
                                            name: req.params.year,
                                        },
                                        include: [
                                            {
                                                model: db.sems,
                                                as: "Semester",
                                                where: {
                                                    name: req.params.semester,
                                                },
                                                include: [
                                                    {
                                                        model: db.subjects,
                                                        as: "Subject",
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

            // ID's for breadcrumb links
            var u;
            var c;
            var b;
            var s;
            var y;
            Query.forEach((University) => {
                u = University.id;
                University.Course.forEach((Course) => {
                    c = Course.id;
                    Course.Branch.forEach((Branch) => {
                        b = Branch.id;
                        Branch.Year.forEach((Year) => {
                            y = Year.id;
                            Year.Semester.forEach((Semester) => {
                                s = Semester.id;
                            });
                        });
                    });
                });
            });
            const breadcrumb = [
                {
                    label: "Home",
                    link: "/close/university",
                    isLink: true,
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
                    link: `/close/${req.params.university}/${req.params.course}/${req.params.branch}/${b}`,
                    isLink: true,
                },
                {
                    label: req.params.year,
                    link: `/close/${req.params.university}/${req.params.course}/${req.params.branch}/${req.params.year}/${y}`,
                    isLink: true,
                },
                {
                    label: req.params.semester,
                    isLink: false,
                },
            ];

            // res.send(Query)
            res.render("../views/admin/sub.ejs", {
                Query,
                title: "Subject",
                breadcrumb,
                cssfilename : "admin"

            });
        } catch (error) {
            console.log(error);
            res.status(201).send("Internal Error");
        }
    },
};

// create subject
exports.postSubject = {
    // Validate Incoming Data
    validator: celebrate({
        [Segments.BODY]: Joi.object().keys({
            code: Joi.string().required(),
            name: Joi.string().required(),
            desc: Joi.string().min(0).max(2500).required(),
            tags: Joi.string().required(),
        }),
    }),

    controller: async (req, res) => {
        try {
            // Request Body Data
            const data = {
                code: req.body.code,
                name: req.body.name,
                desc: req.body.desc,
                tags: req.body.tags,
                semId: req.params.id,
            };

            // Check If Subject Exists
            const subjectExists = await db.subjects.findOne({
                where: {
                    code: req.body.code,
                    name: req.body.name,
                    semId: req.params.id,
                },
            });

            if (subjectExists) return res.status(201).send("Internal Error");
            await db.subjects.create(data);
            updateActionStatus(
                req.adminId,
                req.actionLog.id,
                "SUCCESS",
                "subject: " + req.body.name
            );
            res.redirect("back");
        } catch (error) {
            updateActionStatus(
                req.adminId,
                req.actionLog.id,
                "ERROR",
                "subject: " + req.body.name
            );
            console.log(error);
            res.status(201).send("Internal Error");
        }
    },
};

// Delete Subject
exports.deleteSubject = {
    controller: async (req, res) => {
        try {
            // Delete Subject With ID
            const deleteRecord = await db.subjects.destroy({
                where: {
                    id: req.params.id,
                },
            });
            updateActionStatus(
                req.adminId,
                req.actionLog.id,
                "SUCCESS",
                "subject: " + req.params.id
            );
            res.redirect("back");
        } catch (error) {
            updateActionStatus(
                req.adminId,
                req.actionLog.id,
                "ERROR",
                "subject: " + req.params.id
            );
            console.log(error);
            res.status(201).send("Internal Error");
        }
    },
};
