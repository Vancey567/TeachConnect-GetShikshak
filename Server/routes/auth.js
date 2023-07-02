const router = require("express").Router();

const authController = require("../controllers/auth");
const verifyToken = require("../middleware/auth");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

// FILE STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    const extension = file.originalname.split(".").pop();
    const filename = file.originalname.split(".")[0];
    // console.log("filename", filename, "extension", extension);
    cb(null, filename + uuidv4() + "-" + "." + extension);
  },
});

const upload = multer({ storage });
const docUpload = upload.fields([
  { name: "profilePic" },
  { name: "identity" },
  { name: "lastEducationalCertificate" },
]);

// ROUTES
router.post("/register", authController.register);
router.post("/login", authController.login);

router.post("/tutorcompleteprofile", verifyToken, docUpload, authController.tutorRegister);
router.post("/studentcompleteprofile", verifyToken, upload.single("profilePic"), authController.studentCompleteProfile);

//send reset link for password
router.post("/sendpasswordlink", authController.SendLink);
router.get("/forgotpassword/:id/:token", authController.GetResetPassword);
router.patch("/passwordreset/:id/:token", authController.ResetPassword);

module.exports = router;
