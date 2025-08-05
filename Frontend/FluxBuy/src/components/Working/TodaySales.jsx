import React, { useEffect, useState } from 'react';
import Cards from './Cards';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import FlashSaleHeader from './FlashSaleHeader';

const TodaySales = () => {
    const [productData, setProductData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/product/saleProducts`, {
                    withCredentials: true // 🔥 VERY IMPORTANT
                });
                setProductData(response.data);
            } catch (err) {
                console.error('Error fetching categories:', err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);


    return (
        <section className="p-6 sm:ml-13">
            <div className="flex flex-wrap items-center gap-2 text-red-500 text-sm font-semibold mb-2">
                {/* <div className="w-2 h-2 bg-red-500 rounded-full"></div> */}
                {/* <div className="flex justify-between items-center mb-4">
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
                </div> */}
                <FlashSaleHeader />

            </div>

            <div>
                {loading ?
                    <>
                        <div className="flex gap-10 flex-wrap md:flex-nowrap ">
                            {Array(4).fill(null).map((_, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-xl overflow-hidden shadow-lg w-[90%] animate-pulse"
                                >
                                    {/* Heart Icon Placeholder */}
                                    <div className="relative">
                                        <div className="flex justify-center items-center h-[200px] bg-white">
                                            <div className="p-[2rem] bg-gray-200 h-[180px] w-[14rem] rounded" />
                                        </div>

                                    </div>

                                    {/* Text and Ratings */}
                                    <div className="p-4 space-y-3">
                                        {/* Title */}
                                        <div className="w-3/4 h-4 bg-gray-300 rounded" />

                                        {/* Price */}
                                        <div className="w-1/4 h-4 bg-red-300 rounded" />

                                        {/* Rating stars and number */}
                                        <div className="flex items-center space-x-2">
                                            <div className="flex gap-1">
                                                {Array(5).fill(null).map((_, i) => (
                                                    <div key={i} className="w-4 h-4 bg-gray-300 rounded" />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                    :
                    <>
                        <div className="flex gap-10 flex-wrap">
                            {productData.map((item) => (
                                <Cards key={item._id} {...item} />
                            ))}
                        </div>
                    </>
                }
            </div>

            <div className="flex justify-center mt-10">
                <button className="bg-red-500 cursor-pointer hover:bg-red-600 text-white font-semibold px-6 py-2 rounded" onClick={() => {
                    navigate('/search')
                }}>
                    View All Products
                </button>
            </div>
        </section>
    );
};

export default TodaySales;
