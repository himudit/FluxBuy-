import React from 'react';
import { FaHeart, FaEye } from 'react-icons/fa';
import { AiFillStar } from 'react-icons/ai';

const Cards = ({ discountPercentage, title, price, originalPrice, rating, thumbnail }) => {
  return (
    <div className="lg:w-[250px] w-full h-[22rem] bg-white p-4 rounded shadow relative">
      {/* <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
        {discountPercentage}
      </div> */}
      <div className="absolute top-2 right-2 flex gap-2">
        {/* <FaHeart className="text-gray-400 border border-white hover:text-red-500 cursor-pointer" /> */}

        <FaHeart className="text-gray-400 bg-gray-100 rounded-full p-1 w-6 h-6 shadow-sm hover:text-red-500 cursor-pointer" />
        {/* <FaEye className="text-gray-400 hover:text-black cursor-pointer" /> */}
      </div>

      <div className="h-52 bg-gray-200 my-4 rounded-md flex flex-col items-center justify-center">
        <img src={thumbnail} alt="Product" className="w-40 h-40 object-contain mb-2" />
        {/* <span className="text-sm text-gray-500">Image</span> */}
      </div>


      <h3 className="text-sm font-semibold">{title}</h3>
      <div className="flex items-center gap-2 my-1">
        <span className="text-red-500 font-semibold">${price}</span>
        <span className="text-gray-400 line-through">{originalPrice}</span>
      </div>

      <div className="flex items-center text-yellow-400 text-sm">
        {[...Array(5)].map((_, i) => (
          <AiFillStar key={i} />
        ))}
        <span className="text-gray-500 text-xs ml-1">({rating})</span>
      </div>

      {/* {title.includes('Keyboard') && (
        <button className="w-full bg-black text-white py-1 mt-2 rounded text-sm">
          Add To Cart
        </button>
      )} */}
    </div>
  );
};

export default Cards;
