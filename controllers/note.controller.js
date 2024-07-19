const db = require("../models");
const { celebrate, Joi, Segments } = require("celebrate");
const { uploadPdf } = require('../middlewares/upload')

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
      note_url : Joi.string().required(),
      pdf : Joi.optional()
    }),
  }),
  controller: async (req, res) => {
    try {
         console.log(req.files)
        const data = {
            note_name: req.body.note_name,
            note_desc: req.body.note_desc,
            note_tags: req.body.note_tags,
            note_url : req.file.location,
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
 
// Delete course by branch
exports.deleteNote = {
  controller: async (req, res) => {
    try {
      
      const deleteRecord = await db.notes.destroy({
        where: {
      
          note_id: req.params.id
        },
      });
      res.redirect("back");
    } catch (error) {
      console.log(error);
    }
  },
};

exports.getDesc = {
  controller: async (req, res) => {
    try {
      const noteData = await db.notes.findOne({
        where: {
          note_id: req.params.id,
        },
      });
      res.json("Description : " + noteData.note_desc);
    } catch (error) {
      res.send(error.message)
    }
  },
};

exports.getTag = {
  controller: async (req, res) => {
    try {
      const noteData = await db.notes.findOne({
        where: {
          note_id: req.params.id,
        },
      });
      res.json("Tags : " + noteData.note_tags);
    } catch (error) {
      res.send(error.message)
    }
  },
};
