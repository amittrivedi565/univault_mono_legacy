const db = require("../../models");
exports.adminGet = {
    controller: async (req, res) => {
        const universities = await db.university.count();
        const courses = await db.courses.count();
        const branches = await db.branches.count();
        const subjects = await db.subjects.count();
        const notes = await db.unit.count();
        const admins = await db.admins.count();

        res.render("../views/admin/dashboard.ejs", {
            count: {
                universities,
                courses,
                branches,
                subjects,
                notes,
                admins,
            },
            title: "Dashboard",
        });
    },
};
