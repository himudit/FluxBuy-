import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaRegHeart, FaArrowRight } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/user/userSlice"
import { useNavigate } from "react-router-dom";
import CartIcon from "./CartIcon";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo, isLoggedIn } = useSelector((state) => state.user);
    const placeholderTexts = [
        'Search electronics...',
        'Find the best shoes...',
        'Looking for books?',
        'Discover gadgets...',
        'Try "iPhone 15"...'
    ];

    const [placeholderIndex, setPlaceholderIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholderTexts.length);
        }, 2500); // Change every 2.5 seconds

        return () => clearInterval(interval); // Cleanup
    }, []);

    const [searchTerm, setSearchTerm] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmed = searchTerm.trim();
        if (trimmed) {
            navigate(`/search?filter=${encodeURIComponent(trimmed)}`);
            setSearchTerm('')
        }
    }

    const handleLogout = () => {
        toggleMenu();
        localStorage.removeItem("authToken");
        dispatch(logout());
        navigate("/login");
    };

    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);
    const searchRef = useRef();

    return (
        <nav className="relative bg-white text-black ">
            <>
                {/* Main Navbar Container */}
                <div className="max-w-7xl mx-auto">
                    {/* Top Navbar */}
                    <div className="flex items-center justify-between px-4 py-4 relative">
                        {/* Mobile Left - Hamburger */}
                        <div className="md:hidden">
                            {!isOpen && (
                                <button onClick={toggleMenu} className="text-2xl">
                                    &#9776;
                                </button>
                            )}
                        </div>

                        {/* Desktop Left Section */}
                        <div className="hidden md:flex items-center">
                            {/* Logo for Desktop */}
                            <Link to="/" className="text-2xl font-bold mr-8">
                                <img src='/logoF.jpg' alt="logo" className="w-[3rem] h-[3rem]" />
                            </Link>
                        </div>

                        {/* Center Section - Search (Desktop Only) */}
                        <div className="hidden md:block flex-1 max-w-xl mx-auto px-4" ref={searchRef}>
                            <div className="relative">

                                <form onSubmit={handleSubmit} className="flex items-center">
                                    <input
                                        type="text"
                                        placeholder={placeholderTexts[placeholderIndex]}
                                        value={searchTerm}
                                        onChange={(e) => {
                                            setSearchTerm(e.target.value)
                                        }}
                                        className="w-full px-4 py-2 rounded-[3rem] text-sm bg-gray-200 border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all outline-none placeholder-gray-400"
                                    />
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-900"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M21 21l-4.35-4.35M16.5 10a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
                                        />
                                    </svg>
                                </form>
                            </div>
                        </div>
                        <div className="hidden md:flex items-center">
                            {/* Desktop Navigation */}
                            {isLoggedIn ? (
                                <>
                                    <Link to="/cart" className="text-2xl font-medium hover:text-purple-400 transition-colors">
                                        {/* <FaShoppingCart /> */}
                                        <CartIcon />
                                    </Link>

                                </>
                            ) : (
                                <>
                                    <div className="flex items-center space-x-2">
                                        <Link
                                            to="/login"
                                            className="text-gray-500 transition duration-300"
                                        >
                                            Login
                                        </Link>
                                        <span className="text-gray-400">or</span>
                                        <Link
                                            to="/signup"
                                            className="text-gray-500 transition duration-300"
                                        >
                                            Signup
                                        </Link>
                                    </div>
                                </>
                            )}
                        </div>


                        {/* Center Logo for Mobile */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 md:hidden">
                            <Link to="/" className="text-2xl font-bold">
                                <img src='/logoF.jpg' alt="logo" className="w-[3rem] h-[3rem]" />
                            </Link>
                        </div>

                    </div>
                </div>

                <div
                    className={`fixed top-0 left-0 h-full w-72 bg-gradient-to-b bg-white  text-white z-50 transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                        } transition-transform duration-300 ease-in-out shadow-2xl`}
                >
                    {/* Sidebar Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-800">
                        <Link to="/" className="text-4xl font-bold text-purple-400"> <img src='/logoF.jpg' alt="logo" className="w-[4rem] h-[4rem]" /></Link>
                        <button
                            onClick={toggleMenu}
                            className="p-2 bg-black hover:bg-gray-800 rounded-full transition-colors"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Sidebar Content */}
                    <div className="py-6">
                        {/* Profile Section in Sidebar */}
                        <ul className="space-y-2">
                            <li>
                                <Link to="/cart" onClick={toggleMenu} className="flex items-center ml-9 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                                    <CartIcon />
                                </Link>
                            </li>
                            {/* logout */}
                            <li>
                                <div onClick={handleLogout} className="flex items-center ml-9 py-3 text-black hover:bg-gray-800 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59z" />
                                        <path d="M19 3H5c-1.1 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
                                    </svg>
                                </div>

                            </li>

                        </ul>
                    </div>
                </div>

                {/* Overlay */}
                {
                    isOpen && (
                        <div
                            onClick={toggleMenu}
                            className="fixed inset-0 bg-opacity-50 z-40 backdrop-blur-sm transition-opacity"
                        ></div>
                    )
                }
            </>
            <div className="block md:hidden">
                <div className="flex-1 max-w-xl mx-auto px-4">
                    <div className="relative">
                        <form onSubmit={handleSubmit} className="flex items-center">
                            <input
                                type="text"
                                placeholder={placeholderTexts[placeholderIndex]}
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value)
                                }}
                                className="w-full h-[3rem] px-4 py-2 rounded-[3rem] text-lg bg-gray-200 border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all outline-none placeholder-gray-400"
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-7 w-7 absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-900"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M21 21l-4.35-4.35M16.5 10a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
                                />
                            </svg>
                        </form>
                    </div>
                </div>
            </div>

        </nav >
    );
};

export default Navbar;