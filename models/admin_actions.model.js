const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Actions = sequelize.define("Action", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        action: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        action_type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: "PENDING",
            allowNull: false
        }
    });
    return Actions;
};
