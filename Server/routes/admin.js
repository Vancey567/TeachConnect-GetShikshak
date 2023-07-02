const router = require("express").Router();
const adminController = require("../controllers/admin");
const admin = require("../middleware/admin");
const verifyToken = require("../middleware/auth");

// ROUTES
router.post("/addSubject", adminController.addSubject);
router.post("/addMode", adminController.addMode);
router.post("/addLanguage", adminController.addLanguage);
router.get("/getverificationrequest", verifyToken, admin, adminController.getVerificationRequest);

router.patch("/updateverificationrequest", verifyToken, admin, adminController.updateVerificationRequest);
router.get("/getallclasses", verifyToken, admin, adminController.getAllClasses);

module.exports = router;
