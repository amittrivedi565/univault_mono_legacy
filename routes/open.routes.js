const router = require("express").Router();
const home  = require("../controllers/client/home.controller")
const branch = require("../controllers/client/branch.controller")
const course = require("../controllers/client/course.controller")
const year = require("../controllers/client/year.controller")
const unit = require("../controllers/client/unit.controller")
// const subject = require("../controllers/client/subject.controller")
// const note = require("../controllers/client/note.controller")

/* Home */
router.get("/",home.homeGet.controller)

/* Branches */
router.get("/:name",branch.branchGet.controller);

/* Courses */
router.get("/:uni/:branch",course.courseGet.controller);

/* Years */
router.get("/:uni/:branch/:course",year.yearGet.controller);

/* Semesters */
router.get("/:uni/:branch/:course/:year",unit.unitGet.controller);

module.exports = router;
