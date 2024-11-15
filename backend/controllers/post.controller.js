import Post from "../models/post.model.js";
import { v2 as cloudinary } from "cloudinary";
import Profile from "../models/profile.model.js";
export const createPost = async (req, res) => {
  try{
    const { title, description,} = req.body;
    const ownerid = req.profile._id;
    const pdflink = req.body.pdflink;
    const profile = await Profile.findById(ownerid);

    if(!profile){
      return res.status(404).json({message: "Profile not found"});
    }
    if(!title || !description){
      return res.status(400).json({message: "Title and description are required"});
    }

    if(pdflink){
      const pdfUrl = await cloudinary.uploader.upload(pdflink);
      pdflink = pdfUrl.secure_url;
    }

    const post = await Post.create({owner: ownerid, title, description, pdflink});
    res.status(201).json({message: "Post created successfully", post}); 


  } catch (error) {
    res.status(500).json({message: error.message});
  }

}

export const getPosts = async (req, res) => {
 try{
   const posts = await Post.find().sort({createdAt: -1});
   res.status(200).json({posts});
 }
 catch (error) {
  res.status(500).json({message: error.message});
 }


}

export const getPostById = async (req, res) => {
  try{
    const post = await Post.findById(req.params.id);
    res.status(200).json({post});
  } catch (error) {
    res.status(500).json({message: error.message});
  }


}




export const mySelf = async (req, res) => {
  try{
    const profile = req.profile;
    res.status(200).json({profile});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}
export const deletePost = async (req, res) => {
  try{
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if(!post){
      return res.status(404).json({message: "Post not found"});
    }
    if(post.owner.toString() !== req.profile._id.toString()){
      return res.status(401).json({message: "Unauthorized"});
    }
    await Post.findByIdAndDelete(postId);
    res.status(200).json({message: "Post deleted successfully"});
  } catch (error) {
    res.status(500).json({message: error.message});
  }

}

export const savePost = async (req, res) => {
const postId = req.params.id;
const profileId = req.profile._id;
try{
    const post = await Post.findById(postId);
    if(!post){
      return res.status(404).json({message: "Post not found"});
    }
    const profile = await Profile.findById(profileId);
    if(!profile){
      return res.status(404).json({message: "Profile not found"});
    }
    if(profile.savedPosts.includes(postId)){
      return res.status(400).json({message: "Post already saved"});
    }
    profile.savedPosts.push(postId);
    await profile.save();
    res.status(200).json({message: "Post saved successfully"});
    
}
catch (error) {
  res.status(500).json({message: error.message});
}



}

export const getSavedPosts = async (req, res) => {

    try{
        const profileId = req.profile._id;
        const profile = await Profile.findById(profileId).populate("savedPosts");
        res.status(200).json({savedPosts: profile.savedPosts});
    }
    catch (error) {
        res.status(500).json({message: error.message});
    }

}

export const likeUnlikePost = async (req, res) => {
try{
    //write the logic unlike and like and increment and decrement the likes
    const postId = req.params.id;
    const profileId = req.profile._id;
    const post = await Post.findById(postId);
    if(!post){
      return res.status(404).json({message: "Post not found"});
    }
    if(post.usersLiked.includes(profileId)){
      post.usersLiked = post.usersLiked.filter(id => id.toString() !== profileId.toString());
      post.likes = post.likes - 1;
    }
    else{
      post.usersLiked.push(profileId);
      post.likes = post.likes + 1;
    }
    await post.save();
    res.status(200).json({message: "Post liked/unliked successfully"});
}
catch (error) {
  res.status(500).json({message: error.message});
}

}

export const recommendPosts = async (req, res) => {
    

}