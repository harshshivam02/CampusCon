import { Link } from 'react-router-dom'
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import home from '../assets/home.svg'
import ai from '../assets/ai.svg'
import resume from '../assets/resume.svg'
import mentor from '../assets/mentor.svg'
import job from '../assets/job.svg'
import setting from '../assets/setting.svg'
import logout from '../assets/logout.svg'

const Sidebar = () => {
    const [isMentor, setIsMentor] = useState(false); // State to store mentor status

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/user/myself", {
                    withCredentials: true,
                });
                console.log(response);
                setIsMentor(response.data.profile.isMentor); // Set mentor status from response data
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);
    return (
        <div className=" fixed w-1/5 min-h-screen bg-black shadow-lg p-4 flex flex-col justify-between h-[100vh] ">

            <div>
               <ul className="space-y-2">
               <li>
                            <Link 
                                to="/body" 
                                className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors duration-200"
                            >
                                <img src={home} alt="home" className="w-5 h-5 mr-3" />
                                <span className="text-sm font-medium">Home</span>
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/ai-assistant" 
                                className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors duration-200"
                            >
                                <img src={ai} alt="AI" className="w-5 h-5 mr-3" />
                                <span className="text-sm font-medium">AI Assistant</span>
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/resume" 
                                className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors duration-200"
                            >
                                <img src={resume} alt="Resume" className="w-5 h-5 mr-3" />
                                <span className="text-sm font-medium">Resume Check</span>
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/mentor" 
                                className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors duration-200"
                            >
                                <img src={mentor} alt="Mentorship" className="w-5 h-5 mr-3" />
                                <span className="text-sm font-medium">1:1 Mentorship</span>
                            </Link>
                        </li>
                       
                        <li>
                            <Link 
                                to="/joblisting" 
                                className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors duration-200"
                            >
                                <img src={job} alt="Jobs" className="w-5 h-5 mr-3" />
                                <span className="text-sm font-medium">Job Posting</span>
                            </Link>
                        </li>
                        <li className="hover:bg-gray-100 hover:text-black rounded text-white">
                    {isMentor && (
  <Link to="/inbox" className=" flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors duration-200 gap-4">
  <svg width="21px" height="21px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 2L12 10M12 10L15 7M12 10L9 7" stroke="#ffffff" strokeWidth="1.9440000000000002" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M2 13H5.16026C6.06543 13 6.51802 13 6.91584 13.183C7.31367 13.3659 7.60821 13.7096 8.19729 14.3968L8.80271 15.1032C9.39179 15.7904 9.68633 16.1341 10.0842 16.317C10.482 16.5 10.9346 16.5 11.8397 16.5H12.1603C13.0654 16.5 13.518 16.5 13.9158 16.317C14.3137 16.1341 14.6082 15.7904 15.1973 15.1032L15.8027 14.3968C16.3918 13.7096 16.6863 13.3659 17.0842 13.183C17.482 13 17.9346 13 18.8397 13H22" stroke="#ffffff" stroke-width="1.9440000000000002" stroke-linecap="round"></path> <path d="M17 2.12695C18.6251 2.28681 19.7191 2.64808 20.5355 3.46455C22 4.92902 22 7.28604 22 12.0001C22 16.7141 22 19.0712 20.5355 20.5356C19.0711 22.0001 16.714 22.0001 12 22.0001C7.28595 22.0001 4.92893 22.0001 3.46447 20.5356C2 19.0712 2 16.7141 2 12.0001C2 7.28604 2 4.92902 3.46447 3.46455C4.28094 2.64808 5.37486 2.28681 7 2.12695" stroke="#ffffff" strokeWidth="1.9440000000000002" strokeLinecap="round"></path> </g></svg>
 <span> Inbox</span>
 </Link>
)}

                    </li>
                    {/* <li className="hover:bg-gray-100 hover:text-black rounded text-white">
                        <Link to="/body" className="block p-2 w-full">Updates</Link>
                    </li>
                    <li className="hover:bg-gray-100 hover:text-black rounded text-white">
                        <Link to="/ai-assistant" className="block p-2 w-full">AI Assistant</Link>
                    </li>
                    <li className="hover:bg-gray-100 hover:text-black rounded text-white">
                        <Link to="/resume" className="block p-2 w-full">Resume Check</Link>
                    </li>
                    <li className="hover:bg-gray-100 hover:text-black   rounded text-white">
                        <Link to="/mentor" className="block p-2 w-full">1 : 1 Mentorship</Link>
                    </li>
                    <li className="hover:bg-gray-100 hover:text-black rounded text-white">
                        <Link to="/joblisting" className="block p-2 w-full">Job Posting</Link>
                    </li>
                    <li className="hover:bg-gray-100 hover:text-black rounded text-white">
                    {isMentor && (
  <Link to="/inbox" className="block p-2 w-full">Inbox</Link>
)}

                    </li> */}
               </ul>
            </div>
            <div className="mt-auto">
                <ul className="space-y-2">
                <li>
                            <Link 
                                to="/settings" 
                                className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors duration-200"
                            >
                                <img src={setting} alt="Settings" className="w-5 h-5 mr-3" />
                                <span className="text-sm font-medium">Settings</span>
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/" 
                                className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors duration-200"
                            >
                                <img src={logout} alt="Logout" className="w-5 h-5 mr-3" />
                                <span className="text-sm font-medium">Logout</span>
                            </Link>
                        </li>
                    
                </ul>
            </div>
        </div>
    )
}

export default Sidebar;