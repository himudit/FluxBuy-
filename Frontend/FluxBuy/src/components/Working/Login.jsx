import React, { useState } from 'react';
import shoppingImage from '../../assets/shopping.png';
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
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Image Section */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center bg-[#d6eef7]">
        <img src={shoppingImage} alt="Shopping" className="max-w-md w-full px-4" />
      </div>

      {/* Right Form Section */}
      <div className="flex flex-col justify-center md:w-1/2 w-full px-8 py-12">
        <h2 className="text-2xl font-semibold mb-2">Log in to Exclusive</h2>
        <p className="mb-6 text-gray-600">Enter your details below</p>

        <form onSubmit={loginUser} className="space-y-4">
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {fieldErrors.email && <p className="text-red-500 text-sm">{fieldErrors.email}</p>}
          {fieldErrors.password && <p className="text-red-500 text-sm">{fieldErrors.password}</p>}

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="border-b border-gray-300 outline-none py-2 w-full"
              required
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="border-b border-gray-300 outline-none py-2 w-full"
              required
            />
          </div>

          <div className="flex justify-between items-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-red-500 text-white py-2 px-6 rounded hover:bg-red-600 transition"
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>
            <a href="#" className="text-sm text-red-500 hover:underline">
              Forget Password?
            </a>
          </div>
        </form>

        <p className="text-sm text-center mt-6">
          Don't have an account?{' '}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
