const router = require("express").Router();
const auth  = require("../controllers/admin/auth.controller.js");
const course = require("../controllers/admin/course.controller.js")
const branch = require("../controllers/admin/branch.controller.js")
const year = require("../controllers/admin/year.controller.js")
const admin = require("../controllers/admin/admin.controller.js")
const sem = require("../controllers/admin/sem.controller.js")
const subs = require("../controllers/admin/sub.controller.js");
const notes = require("../controllers/admin/note.controller.js");
const {uploadPdf} = require("../middlewares/upload.js")
const authVerify = require("../middlewares/verifyjwt.js")

/* Admin Login Route */
router.get("/login",auth.signInGet.controller)
router.post("/login",auth.signInPost.validator,auth.signInPost.controller)
router.post("/logout",auth.signInPost.validator,auth.signInPost.controller)
router.get("/dashboard",authVerify,admin.adminGet.controller)

/* Branch Routes */
router.get("/branch",authVerify,branch.createBranchGet.controller);
router.post("/branch",authVerify,branch.createBranchPost.validator,branch.createBranchPost.controller);
router.delete("/branch/:id",authVerify,branch.deleteBranch.controller);

/* Course Routes */
router.get("/course/:id",authVerify,course.CourseGet.controller);
router.post("/course/:id",authVerify,course.createCourse.validator,course.createCourse.controller);
router.delete("/course/:id",authVerify,course.deleteCourse.controller)

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
router.delete("/sub/:id",subs.deleteSubject.controller);

/* Note Routes */
router.get("/note/:sub_name/:id",notes.noteGet.controller);
router.post("/note/:sub_name/:id",uploadPdf.single("pdf"),notes.notePost.controller)
router.post("/note/link/:sub_name/:id",notes.notePost.controller);
router.delete("/note/:id",notes.deleteNote.controller);

/* Description Routes */
router.get("/branch/desc/:id",branch.getDesc.controller)
router.get("/course/desc/:id",course.getDesc.controller)
router.get("/subject/desc/:id",subs.getDesc.controller)
router.get("/notes/desc/:id",notes.getDesc.controller)

/* Tags Routes */
router.get("/branch/tags/:id",branch.getTag.controller)
router.get("/course/tags/:id",course.getTag.controller)
router.get("/subject/tags/:id",subs.getTag.controller)
router.get("/notes/tags/:id",notes.getTag.controller)



module.exports = router;
