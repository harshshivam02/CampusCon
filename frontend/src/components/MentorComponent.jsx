import { FaUserCircle, FaEnvelope } from 'react-icons/fa';
import { useState } from 'react';

const mockMentors = [
  {
    _id: "6734faa2a60c45e2f7fdd19e",
    fullname: "Mentor1",
    email: "ayushking6395@gmail.com",
    year: 3,
    isMentor: true,
  },
  {
    _id: "67354d3e00e70b81e82567e6",
    fullname: "Mentor2",
    email: "gamingcloud795@gmail.com",
    year: 3,
    isMentor: true,
  },
  {
    _id: "67354de700e70b81e82567f2",
    fullname: "Mentor3",
    email: "rajatbhai263601@gmail.com",
    year: null,
    isMentor: true,
  },
  {
    _id: "67354e2300e70b81e82567fa",
    fullname: "Mentor4",
    email: "sk4lama@gmail.com",
    year: null,
    isMentor: true,
  },
  {
    _id: "67354de700e70b81e82567f2",
    fullname: "Mentor3",
    email: "rajatbhai263601@gmail.com",
    year: null,
    isMentor: true,
  },
  {
    _id: "67354e2300e70b81e82567fa",
    fullname: "Mentor4",
    email: "sk4lama@gmail.com",
    year: null,
    isMentor: true,
  },
];

const MentorComponent = () => {
  const [loadingUserId, setLoadingUserId] = useState(null);

  const handleSendRequest = async (userId) => {
    setLoadingUserId(userId);

    try {
      const response = await fetch(`http://localhost:3000/api/meet/createmeet/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies if needed
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send meeting request');
      }

      alert('Meeting request sent successfully!');
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setLoadingUserId(null);
    }
  };

  return (
    <div className="min-h-screen bg-black pl-8 w-10/12 float-right">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl font-bold text-white mb-8 p-7">Available Mentors</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 w-9/12 m-auto">
          {mockMentors.map((mentor) => (
            <div
              key={mentor._id}
              className="bg-purple-900 rounded-xl p-6 border-2 border-white
                       shadow-[0_4px_6px_rgba(255,255,255,0.3)] 
                       hover:shadow-[0_6px_8px_rgba(255,255,255,0.4)]
                       transform transition-all duration-300 ease-in-out hover:scale-[1.02]"
            >
              <div className="flex flex-col items-center">
                <FaUserCircle className="w-24 h-24 text-white/80 mb-4" />
                
                <h3 className="text-xl font-bold text-white mb-2">
                  {mentor.fullname}
                </h3>
                
                <div className="flex items-center text-purple-200 mb-2">
                  <FaEnvelope className="mr-2" />
                  {mentor.email}
                </div>

                {mentor.year && (
                  <p className="text-purple-100 text-center mb-4">
                    Year: {mentor.year}
                  </p>
                )}

                <button
                  onClick={() => handleSendRequest(mentor._id)}
                  disabled={loadingUserId === mentor._id}
                  className="w-full bg-white text-purple-900 py-2 px-4 rounded-lg font-semibold
                           hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-white
                           disabled:bg-purple-300 disabled:cursor-not-allowed
                           transition-all duration-300 ease-in-out flex items-center justify-center space-x-2"
                >
                  {loadingUserId === mentor._id ? (
                    <>
                      <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                      </svg>
                      <span>Sending Request...</span>
                    </>
                  ) : (
                    <span>Request Meeting</span>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {mockMentors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white text-lg">No mentors found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorComponent;
