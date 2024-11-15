import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Inbox = () => {
  const [isMentor, setIsMentor] = useState(false); // State to store mentor status
  const [messages, setMessages] = useState([]); // Initialize as an empty array

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/user/myself", {
          withCredentials: true,
        });
        setIsMentor(response.data.profile.isMentor); // Set mentor status from response data
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchMessages = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/meet/mentorMeetList", {
          withCredentials: true,
        });
        const pendingMessages = response.data.filter((message) => message.status === "pending"); // Filter for pending messages
        setMessages(pendingMessages || []);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchUserData();
    fetchMessages();
  }, []);

  const acceptHandle = async (messageId) => {
    try {
      await axios.post(`http://localhost:3000/api/meet/acceptMeet/${messageId}`, {}, {
        withCredentials: true,
      });
      // Remove the accepted message from the list
      setMessages(messages.filter(message => message._id !== messageId));
      console.log(`Message with ID ${messageId} accepted`);
    } catch (error) {
      console.error("Error accepting message:", error);
    }
  };

  return (
    <div>
      {isMentor && (
        <div>
          <h2 className="text-2xl font-bold text-black">Incoming Messages</h2>
          <ul>
            {messages && messages.length > 0 ? (
              messages.map(message => (
                <li key={message._id} className="flex justify-between p-4 border-b">
                  <div>
                    <p className="text-black text-sm">From: {message.studentId || "No student ID"}</p>
                  </div>
                  <button
                    onClick={() => acceptHandle(message._id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Accept
                  </button>
                </li>
              ))
            ) : (
              <p className="text-gray-500">No incoming messages.</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Inbox;
