const db = require("../models");
const updateActionStatus = async (adminId, actionId, status, action) => {
    if (
        status != "SUCCESS" &&
        status != "ERROR" &&
        status != "PENDING" &&
        status != "INPROGRESS"
    ) {
        console.log("Wronge action status!");
        process.exit(1);
    }
    try {
        if (adminId && actionId) {
            let data = {
                status,
            };
            if (action) {
                data.action = action;
            }
            await db.actions.update(data, { where: { id: actionId, adminId } });
        }
    } catch (error) {
        console.error("Error updating action status:", error);
    }
};

module.exports = updateActionStatus;
