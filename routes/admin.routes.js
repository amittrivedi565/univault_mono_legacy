const router = require("express").Router();
const auth  = require("../controllers/admin/auth.controller.js")
const admin = require("../controllers/admin/admin.controller.js")
const uni = require("../controllers/admin/university.controller.js");
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

/* Dashboard Route */
router.get("/dashboard",authVerify,admin.adminGet.controller)

/* University Routes */
router.get("/university",authVerify,uni.getUniversity.controller)
router.post("/university",authVerify,upload.single("pdf"),uni.postUniversity.validator,uni.postUniversity.controller)
router.delete("/university/:id/:imgName",authVerify,uni.deleteUniversity.controller)

/* Course Routes */
router.get("/:university/:id",authVerify,course.getCourse.controller)
router.post("/:university/:id",authVerify,course.postCourse.validator,course.postCourse.controller)
router.delete("/:university/:id",authVerify,course.deleteCourse.controller)

/* Branch Routes */
router.get("/:university/:course/:id",authVerify,branch.getBranch.controller)
router.post("/:university/:course/:id",authVerify,branch.postBranch.validator,branch.postBranch.controller)
router.delete("/:university/:course/:id",authVerify,branch.deleteBranch.controller)

/* Year Routes */
router.get("/:university/:course/:branch/:id",authVerify,year.getYear.controller)
router.post("/:university/:course/:branch/:id",authVerify,year.postYear.validator,year.postYear.controller)
router.delete("/:university/:course/:branch/:id",authVerify,year.deleteYear.controller)

/* Semester Routes */
router.get("/:university/:course/:branch/:year/:id",authVerify,sem.getSem.controller)
router.post("/:university/:course/:branch/:year/:id",authVerify,sem.postSem.controller)

/* Subject Routes */
router.get("/:university/:course/:branch/:year/:semester/:id",authVerify,subs.getSubject.controller)
router.post("/:university/:course/:branch/:year/:semester/:id",authVerify,subs.postSubject.validator,subs.postSubject.controller)
router.delete("/:university/:course/:branch/:year/:semester/:id",authVerify,subs.deleteSubject.controller)

/* Unit Routes */
router.get("/:university/:course/:branch/:year/:semester/:subject/:id",authVerify,unit.getUnit.controller)
router.post("/:university/:course/:branch/:year/:semester/:subject/:id",authVerify,upload.single("pdf"),unit.postUnit.controller)
router.delete("/:university/:course/:branch/:year/:semester/:subject/:id/:fileName",authVerify,unit.deleteNote.controller)

module.exports = router;
