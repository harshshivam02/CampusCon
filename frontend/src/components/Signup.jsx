import React, { useState } from 'react';
import { MdOutlineMail, MdPassword } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    fullname: '',
    password: '',
  });
  const navigate = useNavigate();

  const { mutate, isError, isLoading, error } = useMutation({
    mutationFn: async (formData) => {
      const res = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.message || data.error || 'Something went wrong');
      }
      return data;
    },
    onSuccess: (data) => {
      toast.success(data.message || 'OTP sent to your email!');
      setFormData({ email: '', username: '', fullname: '', password: '' });
      navigate('/otp');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to sign up');
    }
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-purple-700 to-purple-900 text-white p-8">
        <h1 className="text-5xl font-extrabold">CampusConnect</h1>
        <p className="mt-4 text-lg">Your Network for Career and Academic Growth</p>
      </div>
      
      <div className="flex-1 flex flex-col justify-center items-center bg-purple-200 p-8 rounded-l-lg">
        <h2 className="text-4xl font-bold text-purple-900 mb-4">Create Account</h2>
        <p className="text-purple-700 mb-8">Please fill in your details</p>
        
        <form className="w-full max-w-md space-y-4" onSubmit={handleSubmit}>
          <div className="flex items-center bg-white p-3 rounded-lg shadow-md">
            <FaUser className="text-xl text-purple-400 mr-3" />
            <input
              type="text"
              placeholder="Full Name"
              className="bg-transparent w-full text-gray-700 focus:outline-none"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center bg-white p-3 rounded-lg shadow-md">
            <MdOutlineMail className="text-xl text-purple-400 mr-3" />
            <input
              type="email"
              placeholder="Email address"
              className="bg-transparent w-full text-gray-700 focus:outline-none"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center bg-white p-3 rounded-lg shadow-md">
            <MdPassword className="text-xl text-purple-400 mr-3" />
            <input
              type="password"
              placeholder="Password"
              className="bg-transparent w-full text-gray-700 focus:outline-none"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button 
            className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white font-bold p-3 rounded-lg mt-4 hover:bg-purple-700 transition"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Sign Up"}
          </button>
          {isError && <p className="text-red-500">{error.message}</p>}
        </form>

        <div className="text-center mt-8">
          <p className="text-purple-600">Already have an account?</p>
          <Link to="/" className="text-purple-800 font-bold hover:text-purple-900 transition">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
