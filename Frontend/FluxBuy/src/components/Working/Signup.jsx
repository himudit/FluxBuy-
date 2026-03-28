import React, { useState } from 'react';
import shoppingImage from '/Mobile login-amico.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { protecx } from "../../lib/protecx";
import { ProtecXError } from "protecx-js/client";
import { fetchUserProfile } from "../../features/user/userSlice"

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear specific field error when user starts typing
    if (fieldErrors[name === 'fullName' ? 'name' : name]) {
      setFieldErrors(prev => ({
        ...prev,
        [name === 'fullName' ? 'name' : name]: ""
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setFieldErrors({});

    try {
      const { user, session } = await protecx.signup({
        email: formData.email,
        password: formData.password,
        name: formData.fullName
      });

      console.log("Welcome!", user);
      // Assuming protecx handles tokens, or you might need to dispatch profile fetch
      // dispatch(fetchUserProfile(session.token)); 
      navigate("/");
    } catch (err) {
      if (err instanceof ProtecXError) {
        if (err.isValidationError()) {
          setFieldErrors(err.getAllFieldErrors());
        }
        if (err.isGlobalError()) {
          const globalErr = err.getErrors();
          setError(typeof globalErr === "string" ? globalErr : "Something went wrong");
        }
      } else {
        setError("An unexpected error occurred. Please try again.");
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4">
      <div className="flex flex-col md:flex-row max-w-6xl w-full bg-white rounded-lg overflow-hidden md:shadow-none">
        {/* Left Image Section */}
        <div className="hidden md:flex md:w-1/2 items-center justify-center bg-[#f5f5f5]">
          <div className="w-full h-full flex items-center justify-center p-12">
            <img
              src={shoppingImage}
              alt="Shopping"
              className="w-full h-full object-contain drop-shadow-sm select-none"
            />
          </div>
        </div>

        {/* Right Form Section */}
        <div className="flex flex-col justify-center md:w-1/2 w-full px-8 md:px-16 py-12">
          <h2 className="text-3xl font-semibold mb-2">Create an account</h2>
          <p className="mb-8 text-gray-600 font-medium">Enter your details below</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-md text-sm mb-4 animate-in fade-in slide-in-from-top-1">
                {error}
              </div>
            )}

            <div className="space-y-1">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleInputChange}
                className={`border-b outline-none py-2 w-full transition-all duration-200 focus:border-red-500 ${fieldErrors.name ? 'border-red-500' : 'border-gray-300'}`}
                required
              />
              {fieldErrors.name && <p className="text-red-500 text-xs font-medium animate-in fade-in">{fieldErrors.name}</p>}
            </div>

            <div className="space-y-1">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className={`border-b outline-none py-2 w-full transition-all duration-200 focus:border-red-500 ${fieldErrors.email ? 'border-red-500' : 'border-gray-300'}`}
                required
              />
              {fieldErrors.email && <p className="text-red-500 text-xs font-medium animate-in fade-in">{fieldErrors.email}</p>}
            </div>

            <div className="space-y-1">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className={`border-b outline-none py-2 w-full transition-all duration-200 focus:border-red-500 ${fieldErrors.password ? 'border-red-500' : 'border-gray-300'}`}
                required
              />
              {fieldErrors.password && <p className="text-red-500 text-xs font-medium animate-in fade-in">{fieldErrors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-red-500 text-white py-3 rounded hover:bg-red-600 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed w-full font-medium shadow-sm hover:shadow-md mt-4"
            >
              {loading ? 'Creating...' : 'Create Account'}
            </button>
          </form>

          <p className="text-sm text-center mt-12 text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-red-500 font-semibold hover:underline hover:text-red-700 transition-colors ml-1">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
