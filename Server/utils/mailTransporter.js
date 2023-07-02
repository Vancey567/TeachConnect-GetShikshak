const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "jayisatwork1@gmail.com",
    pass: process.env.GMAILPW,
  },
  port: 587, // Alternate port number
  secure: false, // Set secure to false if using port 587
});

module.exports = transporter;
