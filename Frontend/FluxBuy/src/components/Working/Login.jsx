import React, { useState } from 'react';
import shoppingImage from '../../assets/shopping.png';
import LoginImage from '/Login-bro.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { protecx } from '../../lib/protecx'
import { ProtecXError } from "protecx-js/client";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [formData, setFormData] = useState({
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
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const loginUser = async (e) => {
    e.preventDefault();
    setError("");

    const credentials = {
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
    };

    try {
      setLoading(true);
      const session = await protecx.login(credentials);
      console.log('Logged in successfully:', session);
      navigate('/');
    } catch (err) {
      if (err instanceof ProtecXError) {

        if (err.isValidationError()) {
          setFieldErrors(err.getAllFieldErrors());
        }

        if (err.isGlobalError()) {
          const globalErr = err.getErrors();
          setError(typeof globalErr === "string" ? globalErr : 'Invalid email or password');
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
        <div className="hidden md:flex md:w-1/2 items-center justify-center bg-[#f5f5f5] ">
          <div className="w-full h-full flex items-center justify-center p-12">
            <img
              src={LoginImage}
              alt="Shopping"
              className="w-full h-full object-contain drop-shadow-sm select-none"
            />
          </div>
        </div>

        {/* Right Form Section */} 
        <div className="flex flex-col justify-center md:w-1/2 w-full px-8 md:px-16 py-12">
          <h2 className="text-3xl font-semibold mb-2">Log in to Exclusive</h2>
          <p className="mb-8 text-gray-600 font-medium">Enter your details below</p>

          <form onSubmit={loginUser} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-md text-sm mb-4 animate-in fade-in slide-in-from-top-1">
                {error}
              </div>
            )}

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

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-red-500 text-white py-3 px-12 rounded hover:bg-red-600 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed w-full sm:w-auto font-medium shadow-sm hover:shadow-md"
              >
                {loading ? 'Logging in...' : 'Log In'}
              </button>
              <a href="#" className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors">
                Forget Password?
              </a>
            </div>
          </form>

          <p className="text-sm text-center mt-12 text-gray-600">
            Don't have an account?{' '}
            <a href="/signup" className="text-red-500 font-semibold hover:underline hover:text-red-700 transition-colors ml-1">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
