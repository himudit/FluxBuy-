import React, { useState } from 'react';
import shoppingImage from '../../assets/shopping.png';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";

import { fetchUserProfile } from "../../features/user/userSlice"

const signupSchema = z.object({
  firstname: z.string().min(2, 'First name too short'),
  lastname: z.string().min(2, 'Last name too short').optional().or(z.literal('')),
  email: z.string()
    .email('Invalid email')
    .refine((val) => val.toLowerCase().endsWith('@gmail.com'), {
      message: 'Only gmail.com emails are allowed',
    }),
  password: z.string()
    .min(6, 'Password must be at least 6 characters')
    .regex(/[0-9]/, 'Password must contain a number')
    .regex(/[a-z]/i, 'Password must contain a letter'),
});


const Signup = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(signupSchema)
  });


  const navigate = useNavigate();

  const registerUser = async (data) => {
    const sanitized = {
      first_name: data.firstname.trim(),
      last_name: data.lastname.trim(),
      email: data.email.trim().toLowerCase(),
      password: data.password
    };

    try {
      setLoading(true);
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/register`, sanitized);

      const { token } = res.data;

      localStorage.setItem("authToken", token);

      dispatch(fetchUserProfile(token));

      // navigate to dashboard
      navigate("/");
      reset();
    } catch (err) {
      console.error('Signup failed:', err.response?.data || err.message);
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

        <form onSubmit={handleSubmit(registerUser)} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="First Name"
              {...register('firstname')}
              className="border-b border-gray-300 outline-none py-2 w-full"
            />
            {errors.firstname && <p className="text-red-500 text-sm">{errors.firstname.message}</p>}
          </div>

          <div>
            <input
              type="text"
              placeholder="Last Name"
              {...register('lastname')}
              className="border-b border-gray-300 outline-none py-2 w-full"
            />
            {/* {errors.lastname && <p className="text-red-500 text-sm">{errors.lastname.message}</p>} */}
            {errors.lastname && (
              <p className="text-red-500 text-sm">{errors.lastname.message}</p>
            )}

          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              {...register('email')}
              className="border-b border-gray-300 outline-none py-2 w-full"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              {...register('password')}
              className="border-b border-gray-300 outline-none py-2 w-full"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
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
