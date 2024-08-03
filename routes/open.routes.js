const router = require("express").Router();
const home  = require("../controllers/client/home.controller")
const branch = require("../controllers/client/branch.controller")
const course = require("../controllers/client/course.controller")
const year = require("../controllers/client/year.controller")
const sem = require("../controllers/client/sem.controller")
const subject = require("../controllers/client/subject.controller")
const note = require("../controllers/client/note.controller")

/* Home */
router.get("/",home.homeGet.controller)

/* Branches */
router.get("/branch/:id",branch.branchGet.controller);

/* Courses */
router.get("/course/:id",course.courseGet.controller);

/* Years */
router.get("/year/:id",year.yearGet.controller);

/* Semesters */
router.get("/semester/:id",sem.semGet.controller);

/* Subjects */
router.get("/subject/:id",subject.subGet.controller);

/* Units */
router.get("/note/:id",note.noteGet.controller);

module.exports = router;
