import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { MdPassword } from 'react-icons/md';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isError, isLoading, error } = useMutation({
    mutationFn: async (formData) => {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Something went wrong');
      return data;
    },
    onSuccess: () => {
      toast.success('Login successful!');
      setFormData({ email: '', password: '' });
      queryClient.invalidateQueries({ queryKey: ['authUser'] });
      navigate('/body');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-800 to-indigo-900 p-4">
      {/* Main Card Container */}
      <div className="w-full max-w-4xl flex rounded-2xl shadow-2xl overflow-hidden bg-white/10 backdrop-blur-lg">
        
        {/* Left Side - Logo Section */}
        <div className="w-1/2 p-12 flex flex-col justify-center items-center text-white">
          <div className="text-center space-y-3">
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
              CampusConnect
            </h1>
            <p className="text-sm text-purple-200 max-w-md">
              Your Network for Career and Academic Growth
            </p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-1/2 p-12 backdrop-blur-md bg-white/5">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-purple-200">Please sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg
                         border border-gray-300
                         bg-white text-gray-900 
                         placeholder-gray-500
                         focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                         transition-all duration-300 ease-in-out"
                placeholder="Email address"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MdPassword className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg
                         border border-gray-300
                         bg-white text-gray-900
                         placeholder-gray-500
                         focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                         transition-all duration-300 ease-in-out"
                placeholder="Password"
              />
            </div>

            {/* Error Message */}
            {isError && (
              <div className="text-red-400 text-sm bg-red-900/30 p-3 rounded-lg backdrop-blur-sm">
                {error.message}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-lg
                       text-white bg-gradient-to-r from-purple-700 to-indigo-700
                       hover:from-purple-700 hover:to-indigo-700
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-all duration-300 ease-in-out
                       transform hover:scale-[1.02]"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>

            {/* Sign Up Link */}
            <div className="text-center mt-6">
              <p className="text-purple-200">
                Don't have an account?{' '}
                <Link
                  to="/signup"
                  className="font-medium text-white-800
                           transition-colors duration-300 ease-in-out"
                >
                  Sign up!!
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
