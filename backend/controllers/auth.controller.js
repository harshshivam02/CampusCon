import Profile from "../models/profile.model.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import TempProfile from "../models/temp.profile.model.js";
import { generateTokenAndSetCookie } from "../utilis/generateToken.js";

const generateotp = () => {
  return Math.floor(100000 + Math.random() * 900000);
};
const sendOTPEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
      host: 'smtp-relay.brevo.com',
      port: 587,
      secure: false, 
      auth: {
          user: '79ac62002@smtp-brevo.com', 
          pass: process.env.BREVEO_PASS
      }
  });

  const mailOptions = {
      from: 'Phyquie <ayushking6395@gmail.com>',
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code for CampusConnect is ${otp}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log('Error sending email:', error);
      }
      console.log('Message sent: %s', info.messageId);
  });
  


};

export const signup = async (req, res) => {
  try {
    const { fullname, email, password ,year, isMentor} = req.body;

  if(!fullname || !email || !password) {
    return res.status(400).json({message: "All fields are required"});
  }
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if(!emailRegex.test(email)) {
    return res.status(400).json({message: "Invalid email address"});
  }
  const existingEmail = await Profile.findOne({email});
  if(existingEmail) {
    return res.status(400).json({message: "Email already exists"});
  }
  if(password.length < 8) {
    return res.status(400).json({message: "Password must be at least 8 characters long"});
  }
  await TempProfile.deleteMany({email});  
  const otp = generateotp();
  await sendOTPEmail(email, otp);

  const tempProfile = new TempProfile({fullname, email, password : bcrypt.hashSync(password, 10), otp, otpExpiry: new Date(Date.now() + 10 * 60 * 1000), year, isMentor});
  await tempProfile.save();

    res.status(200).json({ message: "OTP sent to email" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};

export const verifyOTP = async (req, res) => {
  try{
  const {email, otp} = req.body;
  const tempProfile = await TempProfile.findOne({email});
  if(!tempProfile) {
    return res.status(400).json({message: "Invalid email"});
  }
  if(!otp) {
    return res.status(400).json({message: "OTP is required"});
  }
  if(tempProfile.otp !== otp) {
    return res.status(400).json({message: "Invalid OTP"});
  }
  if(tempProfile.otpExpiry < new Date()) {
    return res.status(400).json({message: "OTP expired"});
  }

  const profile = new Profile({fullname: tempProfile.fullname, email: tempProfile.email, password: tempProfile.password, year: tempProfile.year, isMentor: tempProfile.isMentor});
  await profile.save();
  await TempProfile.deleteOne({email});

  generateTokenAndSetCookie(profile._id, res);
  res.status(200).json({message: "OTP verified successfully"});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try{
    const {email, password} = req.body;
    if(!email || !password) {
      return res.status(400).json({message: "All fields are required"});
    }
    const profile = await Profile.findOne({email});
    if(!profile) {
      return res.status(400).json({message: "Invalid email or password"});
    }
    if(!bcrypt.compareSync(password, profile.password)) {
      return res.status(400).json({message: "Invalid email or password"});
    }
    generateTokenAndSetCookie(profile._id, res);
    res.status(200).json({message: "Login successful"});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  try{
  res.cookie("jwt", "", {maxAge: 0});
  res.status(200).json({message: "Logged out successfully"});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};