const User = require("../models/Users");
const ReserveClass = require("../models/ReserveClass");
const nodemailer = require("nodemailer");
const userController = {
  getTutors: async (req, res) => {
    try {
      const tutors = await User.find({
        $and: [
          { role: "tutor" },
          { isProfileCompleted: true },
          { "tutorForm.isProfileVerified": "accepted" },
        ],
      });

      if (tutors.length > 0) {
        const filteredTutors = tutors.map((tutor) => {
          return {
            profilePic: tutor.profilePic,
            id: tutor._id,
            name: tutor.name,
            email: tutor.email,
            phone: tutor.phone,
            rating: tutor.tutorForm.avgRating,
            subjects: tutor.tutorForm.subjects,
            rate: tutor.tutorForm.rate,
            city: tutor.tutorForm.city,
            "account-status": tutor.isAccountActive,
          };
        });

        return res.json({ message: "Tutors found", filteredTutors });
      } else return res.json({ message: "No tutors Found" });
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  },

  getStudents: async (req, res) => {
    try {
      const students = await User.find({
        role: "student",
        isProfileCompleted: true,
      });
      let filteredStudents = [];
      if (students.length > 0) {
        filteredStudents = students.map((student) => {
          return {
            profilePic: student.profilePic,
            name: student.name,
            email: student.email,
            gender: student.gender,
            age: student.age,
            address: student.address,
            ["account status"]: student.isAccountActive,
          };
        });
        // console.log(students);
        return res.json({ message: "Inside get students", filteredStudents });
      } else return res.json({ message: "No students Found" });
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  },
  searchTutor: async (req, res) => {
    try {
      const { subject, city } = req.query;
      // console.log("subject city", subject, city);
      const filter = {};
      if (!subject && !city) {
        filter.role = "tutor";
        filter.isProfileCompleted = true;
        filter["tutorForm.isProfileVerified"] = "accepted";
        filter.isAccountActive = "true";
      }
      if (subject) {
        filter["tutorForm.subjects"] = { $regex: `${subject}`, $options: "i" };
        filter.role = "tutor";
        filter.isProfileCompleted = true;
        filter["tutorForm.isProfileVerified"] = "accepted";
        filter.isAccountActive = "true";
      }
      if (city) {
        filter["tutorForm.city"] = { $regex: `${city}`, $options: "i" };
        filter.role = "tutor";
        filter.isProfileCompleted = true;
        filter["tutorForm.isProfileVerified"] = "accepted";
        filter.isAccountActive = "true";
      }
      if (subject && city) {
        filter["tutorForm.subjects"] = { $regex: `${subject}`, $options: "i" };
        filter["tutorForm.city"] = { $regex: `${city}`, $options: "i" };
        filter.role = "tutor";
        filter.isProfileCompleted = true;
        filter["tutorForm.isProfileVerified"] = "accepted";
        filter.isAccountActive = "true";
      }
      const searchedUser = await User.find(filter);

      // console.log(searchedUser, "user");
      if (searchedUser.length > 0) {
        return res.status(200).json({ searchedUser });
      } else res.json({ error: "No data related to search option" });
    } catch (err) {
      // console.log(err);
      return res.status(500).json({ error: err });
    }
  },
  getTutorDetails: async (req, res) => {
    try {
      const id = req.params.id;
      // console.log(req.params);
      const user = await User.findById(id);

      if (user) {
        // console.log("user", user);
        return res.status(200).json({ user });
      }
    } catch (err) {
      // console.log("errors", err);
      return res.status(500).json({ error: err });
    }
  },
  reserveClass: async (req, res) => {
    try {
      console.log("tutorId", req.params.id);
      console.log("studentId", req.user.id);
      const tutorId = req.params.id;
      const studentId = req.user.id;

      const student = await User.findById({ _id: studentId });
      const tutor = await User.findById({ _id: tutorId });

      if (!student) {
        return res.status(404).json("No student with particular id");
      }
      const { intro, subjects, mode, phone, address } = req.body;

      const existingDocument = await ReserveClass.find({
        $and: [
          { studentId: studentId },
          { tutorId: tutorId },
          { subjects: { $in: subjects } },
        ],
      });

      // console.log("existing doc", existingDocument);

      // const existingDocument = await ReserveClass.find({
      //   studentId: studentId,
      //   tutorId: tutorId,
      //   subjects: { $in: subjects },
      // });

      // {
      //   studentId:"6465eca1ff49f0bff53542e9",
      //   tutorId:"6465ec8dff49f0bff53542e6",
      //   subjects:{$in:["social"]}
      // }

      if (existingDocument.length > 0) {
        return res
          .status(409)
          .json({ error: "You have already requested for the same" });
      }
      const newReservation = new ReserveClass({
        address: address,
        intro: intro,
        subjects: subjects,
        mode: mode,
        phone: phone,
        studentId: studentId,
        tutorId: tutorId,
      });

      const savedReservation = await newReservation.save();
      // console.log("Reservation request sent");
      if (savedReservation) {
        // Send email to the tutor
        const transporter = nodemailer.createTransport({
          // Configure your email service provider here
          service: "Gmail",
          auth: {
            user: "rachnaag1999@gmail.com",
            pass: process.env.GMAILPW,
          },
          port: 587, // Alternate port number
          secure: false, // Set secure to false if using port 587
        });
        const emailContent = `
            <h1>New Class Request</h1>
            <p>Student Name: ${student.name}</p>
            <p>Student Email: ${student.email}</p>
            <p>Class Details:</p>
            <p>Intro: ${intro}</p>
            <p>Subjects: ${subjects}</p>
            <p>Mode: ${mode}</p>
            <p>Phone: ${phone}</p>
          `;

        const mailOptions = {
          from: process.env.WEB_EMAIL, // Your email address
          to: tutor.email, // Tutor's email address
          subject: "New Class Request From GetShiksha",
          html: emailContent,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            // console.error(error);
            return res.status(500).json({ error: error });

            // Handle error sending the email
          } else {
            console.log(
              `Email sent: from ${process.env.WEB_EMAIL} to ${tutor.email}`,
              info.response
            );
            // Handle successful email sending
          }
        });

        // console.log("Reservation request sent");
        return res.status(201).json({ message: "Reservation request sent!" });
      }

      // console.log("req", req.user);
      // console.log("inside");
    } catch (err) {
      console.log("error inside catch", err);
      return res.status(500).json({ error: err });
    }
  },
  giveFeedback: async (req, res) => {
    try {
      const classId = req.params.id;
      const { rating, review } = req.body;
      // console.log("classId ", classId);
      // console.log("Review =>", review, " Rating =>", rating);
      const updatedData = {
        review: review,
        rating: rating,
      };
      const classData = await ReserveClass.findByIdAndUpdate(
        classId,
        updatedData,
        { new: true }
      );
      if (!classData) {
        return res.json({ message: "Feedback Error" });
      }
      if (classData) {
        const tutorId = classData.tutorId;
        const classes = await ReserveClass.find({
          $and: [
            { tutorId: tutorId },
            { rating: { $exists: true } },
            { review: { $exists: true } },
            { isAccepted: "accepted" },
          ],
        });
        const ratingSum = classes.reduce((total, curr) => {
          return total + curr.rating;
        }, 0);
        const avgRating = ratingSum / classes.length;

        const tutorData = await User.findByIdAndUpdate(
          tutorId,
          { "tutorForm.avgRating": avgRating },
          { new: true }
        );
        if (!tutorData) {
          return res.json("Error in rating update");
        }
        if (tutorData) {
          return res.status(201).json({
            message: "Feedback Given Successfully",
            classData,
            tutorData,
          });
        }
      }
    } catch (err) {
      console.log("error", err);
      return res.json({ message: err });
    }
  },
  fetchFeedback: async (req, res) => {
    try {
      const tutorId = req.params.id;
      // console.log("tuor", req.params.id);
      const classData = await ReserveClass.find({
        $and: [
          { tutorId: tutorId },
          { rating: { $exists: true } },
          { review: { $exists: true } },
          { isAccepted: "accepted" },
        ],
      }).populate("studentId");
      if (!classData) {
        return res.json({ message: "No classData" });
      }
      if (classData) {
        const feedback = classData.map((classData) => {
          return {
            studentName: classData.studentId.name,
            studentProfile: classData.studentId.profilePic,
            subjects: classData.subjects,
            rating: classData.rating,
            review: classData.review,
          };
        });
        return res.json({ feedback });
      }
    } catch (err) {
      return res.json({ error: err });
    }
  },
};

module.exports = userController;
