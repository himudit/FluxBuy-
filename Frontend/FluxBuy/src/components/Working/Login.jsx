import React from 'react';
import shoppingImage from '../../assets/shopping.png';// Update the path if needed

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Image Section - Hidden on Mobile */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center bg-[#d6eef7]">
        <img src={shoppingImage} alt="Shopping" className="max-w-md w-full px-4" />
      </div>

      {/* Right Form Section */}
      <div className="flex flex-col justify-center md:w-1/2 w-full px-8 py-12">
        <h2 className="text-2xl font-semibold mb-2">Log in to Exclusive</h2>
        <p className="mb-6 text-gray-600">Enter your details below</p>

        <input
          type="email"
          placeholder="Email or Phone Number"
          className="border-b border-gray-300 mb-4 outline-none py-2"
        />
        <input
          type="password"
          placeholder="Password"
          className="border-b border-gray-300 mb-6 outline-none py-2"
        />

        <div className="flex justify-between items-center mb-6">
          <button className="bg-red-500 text-white py-2 px-6 rounded hover:bg-red-600 transition">
            Log In
          </button>
          <a href="#" className="text-sm text-red-500 hover:underline">
            Forget Password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;