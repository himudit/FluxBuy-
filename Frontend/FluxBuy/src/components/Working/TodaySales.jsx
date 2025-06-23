import React, { useEffect, useState } from 'react';
import Cards from './Cards';

import axios from 'axios';

const productData = [
    {
        id: 1,
        discount: '-40%',
        title: 'HAVIT HV-G92 Gamepad',
        price: '$120',
        originalPrice: '$160',
        rating: 88,
    },
    {
        id: 2,
        discount: '-35%',
        title: 'AK-900 Wired Keyboard',
        price: '$960',
        originalPrice: '$1160',
        rating: 75,
    },
    {
        id: 3,
        discount: '-30%',
        title: 'IPS LCD Gaming Monitor',
        price: '$370',
        originalPrice: '$400',
        rating: 99,
    },
    {
        id: 4,
        discount: '-25%',
        title: 'S-Series Comfort Chair',
        price: '$375',
        originalPrice: '$400',
        rating: 99,
    },

];

const TodaySales = () => {
    const [productData, setProductData] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/product/allProducts`);
                console.log(response.data);
                setProductData(response.data);
            } catch (err) {
                console.error('Error fetching categories:', err.message);
            }
        };

        fetchCategories();
    }, []);
    return (
        <section className="p-6 sm:ml-13">
            <div className="flex flex-wrap items-center gap-2 text-red-500 text-sm font-semibold mb-2">
                {/* <div className="w-2 h-2 bg-red-500 rounded-full"></div> */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-3xl font-bold">Flash Sales</h2>
                    <div className="flex ml-6 items-center gap-4 text-center text-xs font-medium">
                        <p>Today's</p>
                        <div>
                            <p className="text-black text-lg font-bold">03</p>
                            <p>Days</p>
                        </div>
                        <span>:</span>
                        <div>
                            <p className="text-black text-lg font-bold">23</p>
                            <p>Hours</p>
                        </div>
                        <span>:</span>
                        <div>
                            <p className="text-black text-lg font-bold">19</p>
                            <p>Minutes</p>
                        </div>

                    </div>
                </div>

            </div>

            <div className="flex gap-10 flex-wrap">
                {productData.map((item) => (
                    <Cards key={item._id} {...item} />
                ))}
            </div>

            <div className="flex justify-center mt-10">
                <button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded">
                    View All Products
                </button>
            </div>
        </section>
    );
};

export default TodaySales;
