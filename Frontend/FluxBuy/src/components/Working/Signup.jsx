import React, { useState } from 'react';
import shoppingImage from '../../assets/shopping.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { protecx } from "../../lib/protecx";
import { ProtecXError } from "@protecx/js";
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
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Image Section */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center bg-[#d6eef7]">
        <img src={shoppingImage} alt="Shopping" className="max-w-md w-full px-4" />
      </div>

      {/* Right Form Section */}
      <div className="flex flex-col justify-center md:w-1/2 w-full px-8 py-12">
        <h2 className="text-2xl font-semibold mb-2">Create an account</h2>
        <p className="mb-6 text-gray-600">Enter your details below</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          
          <div>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleInputChange}
              className="border-b border-gray-300 outline-none py-2 w-full"
              required
            />
            {fieldErrors.name && <p className="text-red-500 text-sm">{fieldErrors.name}</p>}
          </div>

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
            {fieldErrors.email && <p className="text-red-500 text-sm">{fieldErrors.email}</p>}
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
            {fieldErrors.password && <p className="text-red-500 text-sm">{fieldErrors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-red-500 text-white py-2 rounded hover:bg-red-600 transition w-full"
          >
            {loading ? 'Creating...' : 'Create Account'}
          </button>
        </form>

        <p className="text-sm text-center mt-6">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
