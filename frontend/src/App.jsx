import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/Signup';
import Otp from './components/Otp';
import ProtectedRoute from './components/ProtectedRoute';
import Main from './components/Main';
import ChatBox from './components/ChatBox';
import Resume from './components/ResumeChecker';
import JobSearchAndDetails from './components/JobSearchAndDetails';
import Home from './components/Home';
import Layout from './components/Layout'; 
import MentorComponent from './components/MentorComponent';
import Inbox from './components/Inbox';


function App() {
  return (
    <Routes>
      {/* Define routes inside Layout for pages that need Sidebar */}
      <Route element={<Layout />}>
       
        <Route path="/body" element={<ProtectedRoute><Main /></ProtectedRoute>} />
        <Route path="/ai-assistant" element={<ChatBox />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/joblisting" element={<JobSearchAndDetails />} />
        <Route path="/mentor" element={<MentorComponent />} />
        <Route path="/inbox" element={< Inbox/>} />


      </Route>

      {/* Routes that do not need Sidebar */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/otp" element={<Otp />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
