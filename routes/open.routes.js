const router = require("express").Router();
const home  = require("../controllers/client/home.controller")
const branch = require("../controllers/client/branch.controller")
const course = require("../controllers/client/course.controller")
const year = require("../controllers/client/year.controller")
const unit = require("../controllers/client/unit.controller")
// const subject = require("../controllers/client/subject.controller")
// const note = require("../controllers/client/note.controller")

/* Home */
router.get("/",home.getHome.controller)

/* Courses */
router.get("/:uni",course.getCourse.controller);

/* Branches */
router.get("/:uni/:course",branch.getBranch.controller);

/* Years */
router.get("/:uni/:course/:branch",year.getYear.controller);

/* Semesters */
router.get("/:uni/:course/:branch/:year",unit.getUnit.controller);

module.exports = router;
