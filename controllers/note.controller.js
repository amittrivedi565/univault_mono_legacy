const db = require("../models");
const { celebrate, Joi, Segments } = require("celebrate");

exports.noteGet = {
  controller: async (req, res) => {
    try {
      const noteData = await db.notes.findAll({
        where: {
          sub_id: req.params.id,
        },
      });
      res.render("../views/note.ejs", { noteData });
    } catch (error) {
      console.log(error);
    }
  },
};

exports.notePost = {
  validator: celebrate({
    [Segments.BODY]: Joi.object().keys({
      note_name: Joi.string().required(),
      note_desc: Joi.string().min(0).max(500).required(),
      note_tags: Joi.string().required(),
      sub_id: Joi.string().required(),
      sub_name: Joi.string().required(),
    }),
  }),
  controller: async (req, res) => {
    try {
        const data = {
            note_name: req.body.note_name,
            note_desc: req.body.note_desc,
            note_tags: req.body.note_tags,
            note_url: req.body.note_url,
            sub_name: req.params.sub_name,
            sub_id: req.params.id,
          };
    
          const noteExists = await db.notes.findOne({
            where: {
              note_name: req.body.note_name,
            },
          });
    
          if (noteExists) {
             res.send("already exists!")
          } else {
            const record = await db.notes.create(data);
            res.redirect("back");
          }
    } catch (error) {
        res.send(error.message)
    }
  },
};
