const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/Users");
// const transporter = require("../utils/mailTransporter");
const nodemailer = require("nodemailer");


const authController = {
  register: async (req, res) => {
    try {
      const { email, password, confirmPassword, role, name } = req.body;
      if (!email || !password || !confirmPassword || !role || !name) {
        return res.status(500).json({ error: "All fields are compulsory !!" });
      }

      if (password !== confirmPassword) {
        return res.status(500).json({ error: "password did not match" });
      }

      const userExists = await User.exists({ email: email });

      if (userExists) {
        return res.status(409).json({ error: "User Already exist!" });
      }

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new User({
        email,
        password: hashedPassword,
        role: role,
        name,
      });
      const savedUser = await newUser.save();
      if (savedUser) {
        return res
          .status(201)
          .json({ message: "Registration successfull! Login here !" });
      }
    } catch (err) {
      return res.status(500).json({ error: `${err.message}` });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email: email });
      if (!user) return res.status(400).json({ error: "User don't exist" });

      await bcrypt.compare(password, user.password);
      const ParsedData = JSON.parse(JSON.stringify(user));
      const { password: pass, ...restParams } = ParsedData;

      // const {password:pass,...restParams}=user;
      // const removePass = restParams._doc
      // const { password:passRemove , ...restData} = removePass
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET_KEY
      );

      return res
        .status(200)
        .json({ token, user: restParams, message: "Login successfull" });
    } catch (err) {
      return res.status(403).json({ error: err.message });
    }
  },

  tutorRegister: async (req, res) => {
    try {
      const {
        subjects,
        title,
        aboutClass,
        aboutYou,
        education,
        city,
        language,
        mode,
        phone,
        rate,
        age,
        gender,
        isProfileCompleted,
        isProfileVerified,
        avgRating,
      } = req.body;

      const loggedInUserId = req.user.id;

      const user = await User.findOne({ _id: loggedInUserId });
      if (!user) return res.status(404).json({ error: "User not found" });

      user.tutorForm.subjects = subjects;
      user.tutorForm.title = title;
      user.tutorForm.aboutClass = aboutClass;
      user.tutorForm.aboutYou = aboutYou;
      user.education = education;
      user.age = age;
      user.gender = gender;
      user.tutorForm.city = city;
      user.tutorForm.mode = mode;
      user.tutorForm.language = language;
      user.tutorForm.rate = rate;
      user.phone = phone;
      user.isProfileCompleted = isProfileCompleted;
      user.profilePic = req.files.profilePic[0].filename;
      user.tutorForm.identity = req.files.identity[0].filename;
      user.tutorForm.isProfileVerified = isProfileVerified;
      user.tutorForm.lastEducationalCertificate = req.files.lastEducationalCertificate[0].filename;
      user.tutorForm.avgRating = avgRating;

      const savedUser = await user.save();
      if (savedUser) {
        return res
          .status(201)
          .json({ message: "Tutor registration successful", savedUser, user });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: err });
    }
  },

  studentCompleteProfile: async (req, res) => {
    try {
      const { gender, age, education, address, phone, isProfileCompleted } = req.body;

      const loggedInUserId = req.user.id;

      const user = await User.findOne({ _id: loggedInUserId });
      if (!user) return res.status(404).json({ error: "User not found" });

      user.age = age;
      user.gender = gender;
      user.education = education;
      user.address = address;
      user.profilePic = req.file.filename;
      user.phone = phone;
      user.isProfileCompleted = isProfileCompleted;

      const savedUser = await user.save();
      if (savedUser) {
        return res
          .status(201)
          .json({ message: "Student profile completed", savedUser, user });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: err });
    }
  },

  // Forget Password
  SendLink: async (req, res) => {
    const { email } = req.body;
    if (!email) {
      return res.status(401).json({ message: "Email is required" });
    }

    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(409).json({ message: "No user with this email" });
      }

      //token generation for password reset
      const resetToken = jwt.sign(
        { _id: user.id },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "1d",
        }
      );

      const setusertoken = await User.findByIdAndUpdate(
        { _id: user.id },
        { verifyToken: resetToken },
        { new: true }
      );

      if (setusertoken) {
        const transporter = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: "jayisatwork1@gmail.com",
            pass: process.env.GMAILPW,
          },
          port: 587, // Alternate port number
          secure: false, // Set secure to false if using port 587
        });

        // const encodedToken = encodeURIComponent(setusertoken.verifyToken);

        const mailOptions = {
          from: process.env.WEB_EMAIL, // Your email address
          to: user.email, // Tutor's email address
          subject: "Sending email for password reset",
          html: `This Link Valid For 2 MINUTES ${process.env.CLIENT_URL}/forgotpassword/${user.id}/?token=${setusertoken.verifyToken}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error("error", error);
            return res
              .status(401)
              .json({ error: error, message: "Email not send" });

            // Handle error sending the email
          } else {
            console.log("Email sent");
            return res.status(201).json({
              message:
                "Password Reset link sent successfully sent in your email",
            });
            // Handle successful email sending
          }
        });
      }
    } catch (err) {
      return res.status(401).json({ message: "Invalid user" });
    }
  },

  GetResetPassword: async (req, res) => {
    const { id, token } = req.params;

    try {
      const validuser = await User.findOne({ _id: id, verifyToken: token });

      const verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

      if (validuser && verifyToken._id) {
        return res.status(201).json({ status: 200, validuser });
      } else {
        return res.status(401).json({ status: 401, message: "user not exist" });
      }
    } catch (error) {
      return res.status(500).json({ status: 500, error });
    }
  },

  ResetPassword: async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;

    try {
      const validuser = await User.findOne({ _id: id, verifyToken: token });
      const verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

      if (validuser && verifyToken._id) {
        const newpassword = await bcrypt.hash(password, 12);

        const setNewPassword = await User.findByIdAndUpdate(
          { _id: id },
          { password: newpassword }
        );

        setNewPassword.save();
        return res.status(201).json({
          status: 201,
          setNewPassword,
          message: "Password saved successfully",
        });
      } else {
        return res.status(401).json({ status: 401, message: "user not exist" });
      }
    } catch (error) {
      return res.status(500).json({ status: 500, error });
    }
  },
};

module.exports = authController;

// {
//   email:'seema1@gmail.com',
//   role: 'tutor',
//   subjects: ['Hindi'],
//   title: "titile",
//   aboutYou: "",
//   aboutClass: "somsdsd",
//   city:' Assam',
//   mode: [
//     'Online'
//   ],
//   language:[
//     "English"
//   ],
//   rate:200,
//   phone: '9365636140',
//   profilePic: {},
//   identity: {},
//   lastEducationalCertificate: {},
//   isProfileVerified:
