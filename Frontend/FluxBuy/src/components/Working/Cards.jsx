import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { AiFillStar } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import StarRating from './StarRating';

const Cards = ({ apiId, discountPercentage, title, price, originalPrice, rating, thumbnail }) => {
  const navigate = useNavigate()
  return (
    <div className="group relative lg:w-[250px] w-full h-[21rem] bg-white p-4 rounded shadow overflow-visible cursor-pointer" onClick={() => {
      navigate(`/products/${apiId}`)
    }}>
      <div className="absolute top-2 right-2 flex gap-2 z-20">
        <FaHeart className="text-gray-400 bg-gray-100 rounded-full p-1 w-6 h-6 shadow-sm hover:text-red-500 cursor-pointer" />
      </div>
      {/* Image container */}
      <div className="relative h-52 my-4 rounded-md flex items-center justify-center bg-gray-200">
        {/* Base image */}
        <img
          src={thumbnail}
          alt="Product"
          className="w-36 h-36 object-contain mb-2 transition-opacity duration-300 group-hover:opacity-0 z-10"
        />

        {/* Hover image overlay */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-30 hidden group-hover:flex items-center justify-center w-[280px] h-[260px] bg-gray-300 rounded-md shadow-xl scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-in-out">
          <img src={thumbnail} alt="Product Hover" className="w-44 h-44 object-contain" />
        </div>
      </div>

      <h3 className="text-sm font-semibold">{title}</h3>
      <div className="flex items-center gap-2 my-1">
        <span className="text-red-500 font-semibold">$ {price}</span>
        <span className="text-gray-400 line-through">{originalPrice}</span>
      </div>
      <StarRating rating={rating} />
    </div>
  );
};

export default Cards;
