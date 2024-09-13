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

// Create University Get
exports.getUniversity = {
    controller: async (req, res) => {
        try {
            const breadcrumb = [
                {
                    label: "Home",
                    link: "/close/university",
                    isLink: false,
                },
            ];
            const Query = await db.university.findAll({});
            res.render("../views/admin/university", {
                Query,
                message: req.flash("Error"),
                title: "University",
                breadcrumb,
            });
        } catch (error) {
            console.log(error);
            res.status(201).send("Internal Error");
        }
    },
};

// Create University Post
exports.postUniversity = {
    // Validating Incoming Data
    validator: celebrate({
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().required(),
            shortname: Joi.string().required(),
            tags: Joi.string().required(),
            desc: Joi.string().min(0).max(2500).required(),
            adminId: Joi.string().optional(),
            adminName: Joi.string().optional(),
        }),
    }),

    controller: async (req, res) => {
        try {
            // Request Body Data
            const data = {
                name: req.body.name,
                shortname: req.body.shortname,
                desc: req.body.desc,
                tags: req.body.tags,
                imgUrl: req.file.location,
                imgName: req.fileName,
                adminId: req.adminId,
                adminName: req.adminName,
            };
            // Check If University Already Exists?
            var uniCheck = await db.university.findOne({
                where: { name: req.body.name },
            });

            // Create University Record
            await db.university.create(data);

            // Update action status
            updateActionStatus(
                req.adminId,
                req.actionLog.id,
                "SUCCESS",
                "university: " + req.body.shortname
            );

            res.redirect("back");
        } catch (error) {
            // Update action status
            updateActionStatus(
                req.adminId,
                req.actionLog.id,
                "ERROR",
                "university: " + req.body.shortname
            );
            if (uniCheck) req.flash("Error", error.message);
            res.redirect("back");
        }
    },
};

// Delete University
exports.deleteUniversity = {
    controller: async (req, res, next) => {
        try {
            const params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: req.params.imgName,
            };
            // Deleting S3 Object (University Image)
            s3.deleteObject(params, (error, data) => {
                if (error) {
                    res.status(500).send(error);
                }
            });
            // Delete University Record
            await db.university.destroy({
                where: { id: req.params.id },
            });
            // Update action status
            updateActionStatus(
                req.adminId,
                req.actionLog.id,
                "SUCCESS",
                "university: " + req.params.id
            );

            res.redirect("back");
        } catch (error) {
            // Update action status
            updateActionStatus(
                req.adminId,
                req.actionLog.id,
                "ERROR",
                "university: " + req.params.id
            );
            console.log(error);
            res.status(201).send("Internal Error");
        }
    },
};
