const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define(
    "notes",
    {
        note_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
        },

        note_name: {
        type: DataTypes.STRING,
        allowNull: false,
        },

        note_desc: {
          type: "LONGTEXT",
          allowNull: false,
        },

         note_tags: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        note_url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        sub_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
      timestamps: false,
    }
  );
  return Note;
};
