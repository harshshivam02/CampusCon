import Profile from "../models/profile.model.js";

export const getUserProfile = async (req, res) => {
    
    try{
        const profile = await Profile.findById(req.params.id).select("-password");
        res.status(200).json(profile);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}

export const mentorList = async (req, res) => {
    try{
        const mentors = await Profile.find({isMentor: true}).select("-password");
        res.status(200).json(mentors);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}