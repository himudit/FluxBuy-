import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaRegHeart } from "react-icons/fa";
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

                            {/* Suggestions Dropdown */}
                            {/* {showSuggestions && filteredSuggestions.length > 0 && (
                            <div className="absolute w-[45%] left-[38%] right-0 mt-2 bg-gray-800 text-white shadow-lg rounded-lg overflow-hidden z-10">
                                <div className="p-2 font-semibold border-b border-gray-700">
                                    Popular on Edusphere
                                </div>
                                {filteredSuggestions.map((suggestion, index) => (
                                    <div
                                        key={index}
                                        className={`p-2 flex items-center gap-2 cursor-pointer ${index === activeIndex ? "bg-gray-700" : "hover:bg-gray-600"
                                            }`}
                                        onClick={() => handleSelect(suggestion)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 text-gray-300"
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
                                        <span>{suggestion}</span>
                                    </div>
                                ))}
                            </div>
                        )} */}
                        </div>
                        <div className="hidden md:flex items-center">
                            {/* Desktop Navigation */}
                            {isLoggedIn ? (
                                <>
                                    <ul className="flex items-center gap-12 ">
                                        <li>
                                            <Link to="/wishlist" className=" text-2xl font-medium hover:text-purple-400 transition-colors">
                                                <FaRegHeart />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/cart" className="text-2xl font-medium hover:text-purple-400 transition-colors">
                                                {/* <FaShoppingCart /> */}
                                                <CartIcon />
                                            </Link>
                                        </li>

                                    </ul>
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

                        {/* Right Section */}
                        {/* <div className="flex items-center gap-4">
                            <div className="flex items-center gap-3">
                                <div className="relative group">
                                    {isLoggedIn ? (
                                        <>
                                            {userInfo.user}
                                            <div className="hidden md:flex items-center">
                                                <ul className="flex items-center gap-8">
                                                    <li>
                                                        <Link to="/wishlist" className=" text-2xl font-medium hover:text-purple-400 transition-colors">
                                                            <FaRegHeart />
                                                        </Link>
                                                    </li>

                                                    <li>
                                                        <Link to="/cart" className="text-2xl font-medium hover:text-purple-400 transition-colors">
                                                            <FaShoppingCart />
                                                        </Link>
                                                    </li>

                                                </ul>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="flex items-center space-x-2">
                                            <Link
                                                to="/login"
                                                className="text-gray-500 hover:text-white transition duration-300"
                                            >
                                                Login
                                            </Link>
                                            <span className="text-gray-400">or</span>
                                            <Link
                                                to="/signup"
                                                className="text-gray-500 hover:text-white transition duration-300"
                                            >
                                                Signup
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div> */}
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
                                <Link
                                    to="/wishlist"
                                    onClick={toggleMenu}
                                    className="flex text-2xl items-center px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                                >
                                    <FaRegHeart />
                                </Link>
                            </li>
                            <li>
                                <Link to="/cart" onClick={toggleMenu} className="flex text-2xl items-center px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                                    <CartIcon />
                                </Link>
                            </li>
                            {/* <li>
                            {
                                user ?
                                    <Link
                                        to="/mylearning"
                                        onClick={toggleMenu}
                                        className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                                    >
                                        < svg
                                            className="w-5 h-5 mr-3"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                            />
                                        </svg>
                                        My Learning
                                    </Link> :
                                    <></>
                            }
                        </li> */}
                            {/* <li>
                            {user ?
                                <>
                                    <Link
                                        onClick={toggleMenu}
                                        to="/profile"
                                        className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                                    >
                                        <svg
                                            className="w-5 h-5 mr-3"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                            />
                                        </svg>
                                        Profile
                                    </Link>
                                </>
                                :
                                <></>
                            }

                        </li> */}
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

                    {/* {showSuggestions && filteredSuggestions.length > 0 && (
                    <div className="absolute left-0 right-0 mt-2 bg-black shadow-lg rounded-lg overflow-hidden z-50">
                        <div className="p-2 font-semibold text-gray-400 border-b border-gray-700">
                            Popular on Edusphere
                        </div>
                        {filteredSuggestions.map((suggestion, index) => (
                            <div
                                key={index}
                                className={`p-2 flex items-center gap-2 cursor-pointer ${index === activeIndex ? "bg-gray-700" : "hover:bg-gray-600"
                                    }`}
                                onClick={() => handleSelect(suggestion)}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 text-gray-500"
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
                                <span className="text-white">{suggestion}</span>
                            </div>
                        ))}
                    </div>
                )} */}
                </div>
            </div>

        </nav >
    );
};

export default Navbar;