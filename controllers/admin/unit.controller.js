const { where } = require("sequelize");
const db = require("../../models");
const { celebrate, Joi, Segments } = require("celebrate");
const S3 = require("aws-sdk").S3;
const updateActionStatus = require("../../middlewares/updateactionlog");

// S3 Configuration
const s3 = new S3({
    accessKeyId: process.env.AWS_ACCESS,
    secretAccessKey: process.env.AWS_SECRET,
    region: process.env.AWS_REGION,
});

exports.getUnit = {
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
                                                        where: {
                                                            code: req.params.subject,
                                                        },
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

            // ID's for breadcrumb links
            var uni;
            var course;
            var branch;
            var year;
            var sem;
            var sub;
            var unit;
            Query.forEach((University) => {
                uni = University.id;
                University.Course.forEach((Course) => {
                    course = Course.id;
                    Course.Branch.forEach((Branch) => {
                        branch = Branch.id;
                        Branch.Year.forEach((Year) => {
                            year = Year.id;
                            Year.Semester.forEach((Semester) => {
                                sem = Semester.id;
                                Semester.Subject.forEach((Subject) => {
                                    sub = Subject.id;
                                    Subject.Unit.forEach((Unit) => {
                                        unit = Unit.id;
                                    });
                                });
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
                    link: `/close/${req.params.university}/${uni}`,
                    isLink: true,
                },
                {
                    label: req.params.course,
                    link: `/close/${req.params.university}/${req.params.course}/${course}`,
                    isLink: true,
                },
                {
                    label: req.params.branch,
                    link: `/close/${req.params.university}/${req.params.course}/${req.params.branch}/${branch}`,
                    isLink: true,
                },
                {
                    label: req.params.year,
                    link: `/close/${req.params.university}/${req.params.course}/${req.params.branch}/${req.params.year}/${year}`,
                    isLink: true,
                },
                {
                    label: req.params.semester,
                    link: `/close/${req.params.university}/${req.params.course}/${req.params.branch}/${req.params.year}/${req.params.semester}/${sem}`,
                    isLink: true,
                },
                {
                    label: req.params.subject,
                    isLink: false,
                },
            ];

            // res.json(Query)
            res.render("../views/admin/unit.ejs", {
                Query,
                title: "Unit",
                breadcrumb,
                cssfilename : "admin"
            });
        } catch (error) {
            console.log(error);
            res.status(201).send("Internal Error");
        }
    },
};

exports.postUnit = {
    // Validate Incoming Data From Body
    validator: celebrate({
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().required(),
            desc: Joi.string().min(0).max(500).required(),
            tags: Joi.string().required(),
        }),
    }),

    controller: async (req, res) => {
        try {
            // Request Body Data
            const data = {
                name: req.body.name,
                desc: req.body.desc,
                tags: req.body.tags,
                url: req.file.location,
                pdfName: req.fileName,
                subId: req.params.id,
            };
            // Check If Note Exists
            const unitExists = await db.subjects.findOne({
                where: {
                    id : req.params.id,
                },
                    include : [{
                        model : db.unit,
                        as : "Unit",
                        where : {
                            name  : req.body.name
                        }
                    }]
                },
            );
            // If Exits Stop
            if (unitExists) return res.status(201).send("Unit Already Exists");
            // Create Note Record
            await db.unit.create(data);
            updateActionStatus(
                req.adminId,
                req.actionLog.id,
                "SUCCESS",
                "unit: " + req.body.name
            );
            res.redirect("back");
        } catch (error) {
            updateActionStatus(
                req.adminId,
                req.actionLog.id,
                "ERROR",
                "unit: " + req.body.name
            );
            console.log(error);
            res.status(201).send("Internal Error");
        }
    },
};

// Delete Note By ID
exports.deleteNote = {
    controller: async (req, res) => {
        try {
            // Logic For S3 Object Deletion By Using Filename
            const params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: req.params.fileName,
            };
            // Delete Note PDF
            s3.deleteObject(params, (error, data) => {
                if (error) {
                    res.status(500).send(error);
                }
            });
            // Delete Note Record In Sql
            await db.unit.destroy({
                where: {
                    id: req.params.id,
                },
            });
            updateActionStatus(
                req.adminId,
                req.actionLog.id,
                "SUCCESS",
                "unit: " + req.params.id
            );
            res.redirect("back");
        } catch (error) {
            updateActionStatus(
                req.adminId,
                req.actionLog.id,
                "ERROR",
                "unit: " + req.params.id
            );
            console.log(error);
            res.status(201).send("Internal Error");
        }
    },
};
