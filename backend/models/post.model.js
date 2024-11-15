import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  pdflink: {
    type: String,
    default: "",
   
  },
  imageUrl: {
    type: String, // Store the URL of the uploaded image
    default: "",
  },
  likes: {
    type: Number,
    default: 0,
  },
  usersLiked: {
    type: [{type: mongoose.Schema.Types.ObjectId, ref: "Profile"}],
    default: [],
  },
   
});

const Post = mongoose.model("Post", postSchema);

export default Post;    
