import Meet from "../models/meet.models.js";
import nodemailer from "nodemailer";

export const createMeet = async (req, res) => {
    const mentorId = req.params.id;
    const studentId = req.profile._id;

    const meet = new Meet({mentorId, studentId});
    await meet.save();

    res.status(201).json(meet);
}
export const mentorMeetList = async (req, res) => {
    try{    
        const mentorId = req.profile._id;
        const meets = await Meet.find({mentorId});
        res.status(200).json(meets);
}
catch(err){
    res.status(500).json({message: err.message});
}
}

export const studentMeetList = async (req, res) => {
    try{
            const studentId = req.profile._id;
        const meets = await Meet.find({studentId});
        res.status(200).json(meets);
}
catch(err){
    res.status(500).json({message: err.message});
}
}

const sendOTPEmailAccepted = async (email) => {
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
        subject: 'Meeting Accepted',
        text: `Your meeting has been scheduled. The meeting link is https://meet.google.com/buz-gzmt-bmf`
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Email sending failed'); // Rethrow the error for further handling
    }
};

const sendOTPEmailRejected = async (email) => {
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
        subject: 'Meeting Rejected',
        text: `Your meet request has been rejected`
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Email sending failed'); // Rethrow the error for further handling
    }
};

export const acceptMeet = async (req, res) => {
    try {
        console.log("params", req.params)
      const { id } = req.params;
      const mentorId = req.profile._id;
      const meet = await Meet.findByIdAndUpdate(id, { status: "accepted" }, { new: true }).populate("mentorId").populate("studentId");
  
      // Ensure that the meet is found and updated before sending the response
      if (!meet) {
        return res.status(404).json({ message: "Meet not found" });
      }
       console.log("mentorId", mentorId._id)
       console.log("meet.mentorId", meet.mentorId._id)
       console.log("meet.studentId.email", meet.studentId.email)
       

      // Check if the logged-in mentor is the correct mentor for this meeting
      if (mentorId._id.toString()=== meet.mentorId._id.toString()) {
        // Send OTP email to both student and mentor
        
        await sendOTPEmailAccepted(meet.studentId.email);
        await sendOTPEmailAccepted(meet.mentorId.email);
      }
  
      // Send the response once after all other actions
      return res.status(200).json(meet);
  
    } catch (err) {
      // Send error response in case of failure
      return res.status(500).json({ message: err.message });
    }
  };
  

// export const rejectMeet = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const mentorId = req.profile._id;
//         const meet = await Meet.findByIdAndUpdate(id, { status: "rejected" }, { new: true });
        
//         // Ensure the meet is found before sending the response
//         if (!meet) {
//             return res.status(404).json({ message: "Meet not found" });
//         }

//         if (mentorId._id.toString() === meet.mentorId._id.toString()) {
//             console.log("meet.studentId.email", meet.studentId.email)
//             await sendOTPEmailRejected(meet.studentId.email); // Use await for consistency
//         }

//         res.status(200).json(meet); // Send response after email logic
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// }