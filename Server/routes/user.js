const router = require("express").Router();
const userController = require("../controllers/user");
const verifyToken = require("../middleware/auth");

router.get("/gettutors", userController.getTutors);
router.get("/getstudents", userController.getStudents);

router.get("/search", userController.searchTutor);
router.get("/:id", userController.getTutorDetails);
router.get("/fetchfeedback/:id", userController.fetchFeedback);

router.post("/test", verifyToken, (req, res) => {
  try {
    res
      .status(201)
      .json({ message: "Data submitted successfully", user: req.user });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: "Error from get login" });
  }
});

router.post("/reserveclass/:id", verifyToken, userController.reserveClass);
router.patch("/givefeedback/:id", verifyToken, userController.giveFeedback);

module.exports = router;
