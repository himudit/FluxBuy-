import React from 'react';
import shoppingImage from '../../assets/shopping.png'; // adjust if path differs

const Signup = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Image Section - Hidden on Mobile */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center bg-[#d6eef7]">
        <img src={shoppingImage} alt="Shopping" className="max-w-md w-full px-4" />
      </div>

      {/* Right Form Section */}
      <div className="flex flex-col justify-center md:w-1/2 w-full px-8 py-12">
        <h2 className="text-2xl font-semibold mb-2">Create an account</h2>
        <p className="mb-6 text-gray-600">Enter your details below</p>

        <input
          type="text"
          placeholder="Name"
          className="border-b border-gray-300 mb-4 outline-none py-2"
        />
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

        <button className="bg-red-500 text-white py-2 rounded mb-4 hover:bg-red-600 transition">
          Create Account
        </button>

        <button className="border py-2 rounded flex items-center justify-center gap-2 hover:bg-gray-100 transition">
          <img src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Google__G__Logo.svg" alt="Google" className="w-5 h-5" />
          Sign up with Google
        </button>

        <p className="text-sm text-center mt-6">
          Already have account?{' '}
          <a href="/login" className="text-blue-600 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
