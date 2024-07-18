const router = require("express").Router();
const  {signin}  = require("../controllers/auth.controller");
const course = require("../controllers/course.controller")
const branch = require("../controllers/branch.controller")
const year = require("../controllers/year.controller")
const admin = require("../controllers/admin.controller")
const sem = require("../controllers/sem.controller")
const subs = require("../controllers/sub.controller");
const notes = require("../controllers/note.controller")

/* Admin Login Route */
router.post("/login", signin.validator, signin.controller);
router.get("/dashboard",admin.adminPanelGet.controller)

/* Branch Routes */
router.get("/branch",branch.createBranchGet.controller);
router.post("/branch",branch.createBranchPost.validator,branch.createBranchPost.controller);
router.delete("/branch/:id",branch.deleteBranch.controller);

/* Course Routes */
router.get("/course/:id",course.CourseGet.controller);
router.post("/course/:id",course.createCourse.validator,course.createCourse.controller);
router.delete("/course/:id",course.deleteCourse.controller)

/* Year Routes */
router.get("/year/:course_name/:id",year.createYearGet.controller);
router.post("/year/:course_name/:id",year.createYearPost.validator,year.createYearPost.controller);
router.delete("/year/:id",year.deleteYear.controller);

/* Semester Routes */
router.get("/sem/:year_name/:id",sem.createSemGet.controller);
router.post("/sem/:year_name/:id",sem.createSemPost.controller);

/* Subject Routes */
router.get("/sub/:sem_name/:id",subs.createSubjectGet.controller);
router.post("/sub/:sem_name/:id",subs.createSubjectPost.validator,subs.createSubjectPost.controller);

/* Note Routes */
router.get("/note/:sub_name/:id",notes.noteGet.controller);
router.post("/note/:sub_name/:id",notes.notePost.controller);

/* Description Routes */
router.get("/branch/desc/:id",branch.getDesc.controller)
router.get("/course/desc/:id",course.getDesc.controller)
router.get("/subject/desc/:id",subs.getDesc.controller)

/* Tags Routes */
router.get("/branch/tags/:id",branch.getTag.controller)
router.get("/course/tags/:id",course.getTag.controller)
router.get("/subject/tags/:id",subs.getTag.controller)


module.exports = router;
