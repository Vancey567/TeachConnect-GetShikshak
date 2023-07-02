const router = require("express").Router();
const verifyToken = require("../middleware/auth");
const tutorController = require("../controllers/tutor");

// ROUTES
router.patch("/updatereservationrequest", verifyToken, tutorController.updateReservationRequest);
router.get("/getmystudents", verifyToken, tutorController.getMyStudents);

module.exports = router;
