const mongoose = require("mongoose");
const constants = require("../utils/constants");
const roles = constants.roles;
const states = constants.states;

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    role: {
      type: String,
      enum: [roles.student, roles.tutor, roles.admin],
      default: null,
    },
    address: { type: String },
    age: { type: Number },
    gender: { type: String },
    phone: { type: String },
    tutorForm: {
      subjects: { type: Array },
      title: { type: String },
      aboutYou: { type: String },
      aboutClass: { type: String },
      city: { type: String },
      mode: { type: Array },
      language: { type: Array },
      rate: { type: Number },
      isProfileVerified: {
        type: String,
        enum: [
          states.pending,
          states.accepted,
          states.rejected,
          states.reverted,
        ],
        default: "pending",
      },
      revertReason: { type: String },
      identity: { type: String },
      lastEducationalCertificate: { type: String },
      avgRating: { type: mongoose.Schema.Types.Number },
    },
    isProfileCompleted: { type: Boolean, default: false },
    profilePic: { type: String },
    isAccountActive: { type: Boolean, default: true },
    education: { type: String },
    verifyToken: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
