import mongoose from "mongoose";

const meetSchema = new mongoose.Schema({
    studentId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Profile",
        required : true,
    },
    mentorId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Profile",
        required : true,
    },
    status : {
        type : String,
        enum : ["pending", "accepted", "rejected"],
        default : "pending",
    },
   
});

const Meet = mongoose.model("Meet", meetSchema);

export default Meet;