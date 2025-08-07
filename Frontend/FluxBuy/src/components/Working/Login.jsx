import React, { useState } from 'react';
import shoppingImage from '../../assets/shopping.png';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const Login = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginUser = async (data) => {
    const credentials = {
      email: data.email.trim().toLowerCase(),
      password: data.password,
    };

    try {
      setLoading(true);
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/login`, credentials);

      const { token } = res.data;

      localStorage.setItem('authToken', token);
      dispatch(fetchUserProfile(token));
      navigate('/');
      
    } catch (err) {
      console.error('Login failed:', err.response?.data || err.message);
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

        <form onSubmit={handleSubmit(loginUser)} className="space-y-4">
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
