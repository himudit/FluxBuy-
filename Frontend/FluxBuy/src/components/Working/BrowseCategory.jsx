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

    const imageMap = {
        'beauty': '/beauty.png',
        'fragrances': '/fragnance.png',
        'furniture': '/furniture.png',
        'groceries': '/grocery.png',
        'home-decoration': '/home-decoration.jpg',
        'kitchen-accessories': '/kitchen-accesories.png',
        'laptops': '/laptop.png',
        'mens-shirts': '/men-shirt.png',
        'mens-shoes': '/men-shoes.png',
        'mens-watches': '/men-watches.jpeg',
        'mobile-accessories': '/mobile-accessories.png',
        'motorcycle': '/motorcycle.jpg',
        'skin-care': '/skin-care.png',
        'smartphones': '/smartphone.jpg',
        'sports-accessories': '/football.png',
        'sunglasses': '/sunglasses.png',
        'tablets': '/tablets.png',
        'tops': '/tops.png',
        'vehicle': '/vehicle.jpeg',
        'womens-bags': '/womens-bags.png',
        'womens-dresses': '/women-d.jpg',
        'womens-jewellery': '/womens-jewellry.png',
        'womens-shoes': '/womens-shoes.jpeg',
        'womens-watches': '/womens-watches.jpeg',
    };

    return (
        <section className="p-6 w-full sm:w-[80%] sm:ml-30">
            <h2 className="text-2xl font-bold mb-4">Browse By Category</h2>
            <div className="relative">
                <button
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow hover:bg-gray-100 cursor-pointer"
                    onClick={() => scroll('left')}
                >
                    <FaArrowLeft />
                </button>

                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto gap-4 px-8 scrollbar-hide scroll-smooth"
                >
                    {categories.map((d, index) => (
                        <CategoryCard key={index} name={d} active={d} imageUrl={imageMap[d]} />
                    ))}
                </div>

                {/* <div className='w-3 h-4 text-amber-400'> {imageMap['beauty']}</div> */}
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
