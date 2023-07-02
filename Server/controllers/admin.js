const { Subject, Language, Mode } = require("../models/Advertise");
const ReserveClass = require("../models/ReserveClass");
const User = require("../models/Users");
const adminController = {
  addSubject: async (req, res) => {
    // console.log(req.body);
    try {
      const { subject } = req.body;
      // console.log("Subject", subject);

      const subjectExist = await Subject.findOne({ value: subject });

      if (subjectExist) {
        return res.status(409).json({ error: "Subject Already exist!" });
      }

      const newSubject = new Subject({
        value: subject,
        label: subject,
      });

      const savedSubject = await newSubject.save();

      if (savedSubject) {
        // console.log("New subject created successfully!");
        return res
          .status(201)
          .json({ message: "Subject created successfully !", savedSubject });
      }
    } catch (err) {
      return res.status(500).json({ error: `${err.message}` });
    }
  },
  addMode: async (req, res) => {
    try {
      const { mode } = req.body;
      // console.log("Mode", mode);

      const modeExist = await Subject.findOne({ value: mode });

      if (modeExist) {
        return res.status(409).json({ error: "Mode Already exist!" });
      }
      const newMode = new Mode({
        value: mode,
        label: mode,
      });

      const savedMode = await newMode.save();

      if (savedMode) {
        // console.log("New mode created successfully!");
        return res
          .status(201)
          .json({ message: "mode created successfully !", savedMode });
      }
    } catch (err) {
      // console.log("Error side");
      return res.status(500).json({ error: `${err.message}` });
    }
  },
  addLanguage: async (req, res) => {
    try {
      const { language } = req.body;

      const languageExist = await Language.findOne({ value: language });

      if (languageExist) {
        return res.status(409).json({ error: "Language Already exist!" });
      }

      const newLanguage = new Language({
        value: language,
        label: language,
      });

      const savedLanguage = await newLanguage.save();

      if (savedLanguage) {
        // console.log("New Language created successfully!");
        return res
          .status(201)
          .json({ message: "Language created successfully !", savedLanguage });
      }
    } catch (err) {
      return res.status(500).json({ error: `${err.message}` });
    }
  },
  getVerificationRequest: async (req, res) => {
    try {
      const tutors = await User.find({
        $and: [
          { role: "tutor" },
          { "tutorForm.isProfileVerified": "pending" },
          { isProfileCompleted: "true" },
        ],
      });
      if (!tutors) {
        return res.status(500).json({ message: "No such result found" });
      }
      if (tutors) {
        return res
          .status(201)
          .json({ tutors, message: "Tutors with verification request found" });
      }
    } catch (err) {
      console.log(err);
      return res.json(err);
    }
  },
  updateVerificationRequest: async (req, res) => {
    try {
      const { updatedStatus, revertMsg, reqId } = req.body;
      console.log(reqId, updatedStatus, revertMsg);

      let updatedData;

      if (updatedStatus === "reverted") {
        console.log("Inisde reverted");
        updatedData = {
          "tutorForm.isProfileVerified": updatedStatus,
          "tutorForm.revertReason": revertMsg,
          isProfileCompleted: false,
          isProfileCompleted: false,
        };
      } else {
        console.log("Inisde no reverted");
        updatedData = {
          "tutorForm.isProfileVerified": updatedStatus,
        };
      }

      const updatedVerificationrequest = await User.findByIdAndUpdate(
        reqId,
        updatedData,
        { new: true }
      );

      if (!updatedVerificationrequest) {
        console.log("inside !updated");
        return res.status(400).json({ error: "Request not found" });
      }
      if (updatedVerificationrequest) {
        console.log("Inside");
        return res.status(201).json({
          updatedVerificationrequest,
          message: `Request ${updatedStatus} successfully`,
        });
      }
      console.log("iNside hell");
    } catch (err) {
      console.log("err", err);
      return res.json({ error: err });
    }
  },
  getAllClasses: async (req, res) => {
    try {
      const allClasses = await ReserveClass.find();
      if (allClasses.length > 0) {
        return res.json({ allClasses });
      } else {
        return res.json({ message: "No class" });
      }
    } catch (err) {
      return res.json({ err });
    }
  },
};

module.exports = adminController;
