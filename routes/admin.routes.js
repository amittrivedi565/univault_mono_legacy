const router = require("express").Router();
const auth  = require("../controllers/admin/auth.controller.js")
const admin = require("../controllers/admin/admin.controller.js")
const uni = require("../controllers/admin/uni.controller.js");
const course = require("../controllers/admin/course.controller.js")
const branch = require("../controllers/admin/branch.controller.js")
const year = require("../controllers/admin/year.controller.js")
const sem = require("../controllers/admin/sem.controller.js")
const subs = require("../controllers/admin/sub.controller.js");
const unit = require("../controllers/admin/unit.controller.js");
const upload = require("../middlewares/uploadS3.js")
const authVerify = require("../middlewares/verifyjwt.js")


/* Admin Login Route */
router.get("/login",auth.signInGet.controller)
router.post("/login",auth.signInPost.validator,auth.signInPost.controller)
router.post("/logout",auth.signOut.controller)
router.get("/dashboard",authVerify,admin.adminGet.controller)

/* University Routes */
router.get("/uni",authVerify,uni.createUniGet.controller)
router.post("/uni",authVerify,upload.single("pdf"),uni.createUniPost.validator,uni.createUniPost.controller)
router.delete("/uni/:id/:file_name",authVerify,uni.deleteUni.controller)

/* Course Routes */
router.get("/course/:id",authVerify,course.CourseGet.controller)
router.post("/course/:id",authVerify,course.createCourse.validator,course.createCourse.controller)
router.delete("/course/:id",authVerify,course.deleteCourse.controller)

/* Branch Routes */
router.get("/branch/:id",authVerify,branch.createBranchGet.controller)
router.post("/branch/:id",authVerify,branch.createBranchPost.validator,branch.createBranchPost.controller)
router.delete("/branch/:id",authVerify,branch.deleteBranch.controller)


/* Year Routes */
router.get("/year/:id",authVerify,year.createYearGet.controller)
router.post("/year/:id",authVerify,year.createYearPost.validator,year.createYearPost.controller)
router.delete("/year/:id",authVerify,year.deleteYear.controller)

/* Semester Routes */
router.get("/sem/:id",authVerify,sem.createSemGet.controller)
router.post("/sem/:id",authVerify,sem.createSemPost.controller)

/* Subject Routes */
router.get("/sub/:id",authVerify,subs.createSubjectGet.controller)
router.post("/sub/:id",authVerify,subs.createSubjectPost.validator,subs.createSubjectPost.controller)
router.delete("/sub/:id",authVerify,subs.deleteSubject.controller)

/* Note Routes */
router.get("/note/:id",authVerify,unit.getUnit.controller)
router.post("/note/:id",authVerify,upload.single("pdf"),unit.getUnit.controller)
router.delete("/note/:id/:file_name",authVerify,unit.deleteNote.controller)

/* Description Routes */
router.get("/uni/desc/:id",authVerify,uni.getDesc.controller)
router.get("/branch/desc/:id",authVerify,branch.getDesc.controller)
router.get("/course/desc/:id",authVerify,course.getDesc.controller)
router.get("/subject/desc/:id",authVerify,subs.getDesc.controller)
router.get("/notes/desc/:id",authVerify,unit.getDesc.controller)

/* Tags Routes */
router.get("/uni/tags/:id",authVerify,uni.getTag.controller)
router.get("/branch/tags/:id",authVerify,branch.getTag.controller)
router.get("/course/tags/:id",authVerify,course.getTag.controller)
router.get("/subject/tags/:id",authVerify,subs.getTag.controller)
router.get("/notes/tags/:id",authVerify,unit.getTag.controller)

module.exports = router;
