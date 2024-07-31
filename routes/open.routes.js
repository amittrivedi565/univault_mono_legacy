const router = require("express").Router();
const home  = require("../controllers/client/home.controller")
const branch = require("../controllers/client/branch.controller")
const course = require("../controllers/client/course.controller")

/* Home */
router.get("/",home.homeGet.controller)

/* Branches */
router.get("/branches/:id",branch.branchGet.controller);

/* Courses */
router.get("/course/:id",course.courseGet.controller);

/* Semesters */
router.get("/semesters");

/* Subjects */
router.get("/subjects");

/* Units */
router.get("/units");

module.exports = router;
