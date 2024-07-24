const router = require("express").Router();
const home  = require("../controllers/client/home")

/* Home */
router.get("/",home.homeGet.controller)

/* Courses */
router.get("/courses",);

/* Branches */
router.get("/branches");

/* Semesters */
router.get("/semesters");

/* Subjects */
router.get("/subjects");

/* Units */
router.get("/units");

module.exports = router;
