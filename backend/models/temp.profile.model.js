import mongoose from "mongoose";

const tempProfileSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  otpExpiry: {
    type: Date,
    required: true,
  },
  year: {
    type: Number,
    default: 0,
  },
  isMentor: {
    type: Boolean,
    default: false,
  },
});

const TempProfile = mongoose.model("TempProfile", tempProfileSchema);

export default TempProfile;
