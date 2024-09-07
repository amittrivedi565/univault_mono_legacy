const db = require("../../models");
const { celebrate, Joi, Segments } = require("celebrate");

exports.getYear = {
    controller: async (req, res) => {
        try {
            const yearData = await db.years.findAll({
                where: {
                    branchId: req.params.id,
                },
                order: ["name"],
            });
            res.render("../views/admin/year.ejs", { yearData });
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
            name: Joi.string().required()
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
