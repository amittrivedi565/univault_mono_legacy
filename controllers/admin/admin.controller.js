const db = require("../../models");

function getDate(isoString) {
    // Create a Date object from the string
    const date = new Date(isoString);

    // Extract date components
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function getTime(isoString) {
    const date = new Date(isoString);

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    // Determine AM or PM
    const ampm = hours >= 12 ? "PM" : "AM";

    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // If hour is 0, make it 12

    return `${hours}:${minutes}:${seconds} ${ampm}`;
}

exports.adminGet = {
    controller: async (req, res) => {
        const universities = await db.university.count();
        const courses = await db.courses.count();
        const branches = await db.branches.count();
        const subjects = await db.subjects.count();
        const notes = await db.unit.count();
        const admins = await db.admins.count();
        const actionsData = await db.actions.findAll({
            raw: true,
            where: {
                adminId: req.adminId,
            },
            order: [
                ['updatedAt', 'DESC'],
            ]
        });

        let actions = actionsData.map((ac) => {
            return {
                admin: req.adminName,
                adminId: req.adminId,
                action: ac["action"],
                type: ac["action_type"],
                status: ac["status"],
                date: getDate(ac["updatedAt"]),
                time: getTime(ac["updatedAt"]),
            };
        });
        
        res.render("../views/admin/dashboard.ejs", {
            count: {
                universities,
                courses,
                branches,
                subjects,
                notes,
                admins,
            },
            actions,
            title: "Dashboard",
        });
    },
};
