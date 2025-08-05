import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import StarRating from './StarRating';

const Cards = ({ apiId, discountPercentage, title, price, originalPrice, rating, thumbnail }) => {
  const navigate = useNavigate();

  return (
    <div
      className="group relative lg:w-[250px] w-full h-[21rem] bg-white p-4 rounded-xl shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 ease-in-out cursor-pointer"
      onClick={() => navigate(`/products/${apiId}`)}
    >
      {/* Wishlist icon */}
      <div className="absolute top-2 right-2 flex gap-2 z-20">
        <FaHeart className="text-gray-400 bg-gray-100 rounded-full p-1 w-6 h-6 shadow-sm hover:text-red-500 transition-colors duration-200" />
      </div>

      {/* Image container */}
      <div className="relative h-52 my-4 rounded-md flex items-center justify-center bg-gray-100 overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="w-36 h-36 object-contain transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Title */}
      <h3 className="text-sm font-semibold truncate">{title}</h3>

      {/* Price */}
      <div className="flex items-center gap-2 my-1">
        <span className="text-red-500 font-semibold">$ {price}</span>
        <span className="text-gray-400 line-through text-sm">{originalPrice}</span>
      </div>

      {/* Rating */}
      <StarRating rating={rating} />
    </div>
  );
};

export default Cards;
