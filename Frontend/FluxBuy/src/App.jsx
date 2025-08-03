import { useState, useEffect } from 'react'
import { useDispatch } from "react-redux";
import { fetchUserProfile } from "./features/user/userSlice"
import './App.css'
import Home from './components/Working/Home'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import Login from './components/Working/Login'
import Signup from './components/Working/Signup'
import Search from './components/Working/Search'
import Profile from './components/Working/Profile'
import Layout from '../src/Layout'
import Cart from './components/Working/Cart'
import WishList from './components/Working/WishList'
import ProductPage from './components/Working/ProductPage'

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      dispatch(fetchUserProfile(token));
    }
  }, [dispatch]);

  const [count, setCount] = useState(0)
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path="/search" element={<Search />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<WishList />} />
        {/* <Route path="/teacher/signup" element={<TeacherSignup />} /> */}
        <Route path="/products/:id" element={<ProductPage />} />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
