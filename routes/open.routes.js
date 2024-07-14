const router = require("express").Router();


/* Courses */
router.get("/courses", (req, res) => res.send(""));
/* Branches */
router.get("/branches", (req, res) => res.send(""));

/* Semesters */
router.get("/semesters", (req, res) => res.send(""));

/* Subjects */
router.get("/subjects", (req, res) => res.send(""));

/* Units */
router.get("/units", (req, res) => res.send(""));

module.exports = router;
