import React, { useState, useEffect, useRef } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import CategoryCard from './CategoryCard';
import axios from 'axios';

const BrowseCategory = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/product/category`);
                // console.log(response);
                setCategories(response.data.data);
            } catch (err) {
                console.error('Error fetching categories:', err.message);
            }
        };

        fetchCategories();
    }, []);

    const scrollRef = useRef(null);

    const scroll = (direction) => {
        const { current } = scrollRef;
        if (!current) return;

        const scrollAmount = 300;
        if (direction === 'left') {
            current.scrollLeft -= scrollAmount;
        } else {
            current.scrollLeft += scrollAmount;
        }
    };

    return (
        <section className="p-6 w-full sm:w-[80%] sm:ml-30">
            {/* <div className="flex items-center gap-2 text-red-500 text-sm font-semibold mb-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <p>Categories</p>
            </div> */}
            <h2 className="text-2xl font-bold mb-4">Browse By Category</h2>
            <div className="relative">
                <button
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow hover:bg-gray-100 cursor-pointer"
                    onClick={() => scroll('left')}
                >
                    <FaArrowLeft />
                </button>

                {/* <div ref={scrollRef}
                    style={{
                        display: 'flex',
                        overflowX: 'auto',
                        scrollBehavior: 'smooth',
                        padding: '0 2rem',
                        gap: '1rem',
                    }}>
                    {
                        categories.map((d, index) => {
                            return (
                                <CategoryCard key={index} name={d} active={d} />
                            )
                        })
                    }

                </div> */}
                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto gap-4 px-8 scrollbar-hide scroll-smooth"
                >
                    {categories.map((d, index) => (
                        <CategoryCard key={index} name={d} active={d} />
                    ))}
                </div>

                <button
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow hover:bg-gray-100 cursor-pointer"
                    onClick={() => scroll('right')}
                >
                    <FaArrowRight />
                </button>
            </div>
        </section>
    );
};

export default BrowseCategory;
