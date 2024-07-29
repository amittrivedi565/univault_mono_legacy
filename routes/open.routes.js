const router = require("express").Router();
const home  = require("../controllers/client/home")
const branch = require("../controllers/client/branch")

/* Home */
router.get("/",home.homeGet.controller)

/* Branches */
router.get("/branches",branch.branchGet.controller);

/* Courses */
router.get("/courses",);

/* Semesters */
router.get("/semesters");

/* Subjects */
router.get("/subjects");

/* Units */
router.get("/units");

module.exports = router;
