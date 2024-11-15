import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    
  },
  bio: {
    type: String,
    
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    default: [],
  }],
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
    default: [],
  }],
  savedPosts: {
    type: [{type: mongoose.Schema.Types.ObjectId, ref: "Post"}],
    default: [],
  },
  year :{
    type : Number,
    default : 0,
  },
  isMentor :{
    type : Boolean,
    default : false,
  }
});

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;
