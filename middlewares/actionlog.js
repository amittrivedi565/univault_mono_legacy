const db = require("../models");

const logAction = (type, action) => {
    if (type != "READ" && type != "CREATE" && type != "DELETE" && type != "UPDATE") {
        console.log("Wronge action type!");
        process.exit(1)
    }
    return async (req, res, next) => {
        try {
            // admin info in req.user
            const adminId = req.adminId;
            req.actionLog = await db.actions.create({
                adminId: adminId,
                action: action,
                action_type: type,
            });
        } catch (error) {
            console.error("Error logging action:", error);
        }
        next();
    };
};

module.exports = logAction;
