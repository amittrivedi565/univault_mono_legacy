const router = require("express").Router();
const  {signin}  = require("../controllers/auth.controller");
const course = require("../controllers/course.controller")
const branch = require("../controllers/branch.controller")
const year = require("../controllers/year.controller")
const admin = require("../controllers/admin.controller")
const sem = require("../controllers/sem.controller")
const subs = require("../controllers/sub.controller")


/* Admin Login Route */
router.post("/login", signin.validator, signin.controller);
router.get("/dashboard",admin.adminPanelGet.controller)

/* Branch Routes */
router.get("/branch",branch.createBranchPage.controller);
router.post("/branch",branch.createBranchPost.validator,branch.createBranchPost.controller);
router.delete("/branch/:id",branch.deleteBranch.controller);


/* Course Routes */
router.get("/branch/course/:id",course.CourseGet.controller);
router.post("/branch/course/:id",course.createCourse.validator,course.createCourse.controller);
router.delete("/branch/course/:id",course.deleteCourse.controller)


/* Year Routes */
router.get("/branch/course/year/:course_name/:id",year.createYearGet.controller);
router.post("/branch/course/year/:course_name/:id",year.createYearPost.validator,year.createYearPost.controller);
router.delete("/branch/course/year/:id",year.deleteYear.controller);

   

/* Semester Routes */
router.get("/branch/course/year/sem/test/:year_name/:id",sem.createSemGet.controller);
router.post("/branch/course/year/sem/test/:year_name/:id",sem.createSemPost.controller);
// router.put("/sem/:id", (req, res) => res.send(""));
// router.delete("/sem/:id", (req, res) => res.send(""));


/* Subject Routes */
router.get("/branch/course/year/sem/test/notes/sub/:sem_name/:id",subs.createSubjectGet.controller);
router.post("/branch/course/year/sem/test/notes/sub/:sem_name/:id",subs.createSubjectPost.validator,subs.createSubjectPost.controller);
// router.put("/subject/:id", (req, res) => res.send(""));
// router.delete("/subject/:id", (req, res) => res.send(""));

module.exports = router;
