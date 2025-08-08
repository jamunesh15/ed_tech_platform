import React from 'react';
import { useNavigate } from 'react-router-dom';

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-richblack-900 text-richblack-5 p-4">
      <h1 className="text-4xl font-bold mb-4">Oops! Something went wrong</h1>
      <p className="text-lg text-richblack-300 mb-8">The page you're looking for cannot be found.</p>
      <div className="flex gap-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-yellow-50 text-richblack-900 px-6 py-3 rounded-lg font-semibold hover:scale-95 transition-all duration-200"
        >
          Go Back
        </button>
        <button
          onClick={() => navigate('/')}
          className="border border-yellow-50 text-yellow-50 px-6 py-3 rounded-lg font-semibold hover:scale-95 transition-all duration-200"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default Error;
