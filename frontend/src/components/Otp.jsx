import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const OtpPage = () => {
  const [email, setEmail] = useState(''); // New email state
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: async ({ email, otp }) => {
      const response = await fetch("http://localhost:3000/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, otp }), // Sending both email and otp
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Invalid OTP');
      }
      return data;
    },
    onSuccess: () => {
      toast.success('OTP verified successfully!');
      navigate('/body'); // Redirect to /body upon successful OTP verification
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ email, otp }); // Passing both email and otp
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-900">
      <form className="space-y-6 w-80" onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold text-white text-center mb-6">Enter OTP</h1>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Email"
          className="w-full bg-purple-700 p-3 rounded-lg text-white text-center focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

       
        <input
          type="text"
          placeholder="OTP"
          className="w-full bg-purple-700 p-3 rounded-lg text-white text-center focus:outline-none"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-purple-500 text-white font-bold p-3 rounded-lg mt-4 hover:bg-purple-600 transition"
          disabled={isLoading}
        >
          {isLoading ? "Verifying..." : "Submit"}
        </button>
        {isError && <p className="text-red-500 text-center mt-2">{error.message}</p>}
      </form>
    </div>
  );
};

export default OtpPage;
