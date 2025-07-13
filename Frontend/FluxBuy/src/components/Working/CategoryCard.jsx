
import React from 'react';

const CategoryCard = ({ name, active, imageUrl }) => {
  return (
    <div className="flex flex-col items-center space-y-2 cursor-pointer">
      <div
        className={`w-[100px] h-[100px] rounded-full flex items-center justify-center transition-all duration-200 
          ${active ? 'bg-gray-100' : 'bg-red-700'}`}
      >
        <img src={imageUrl} alt={name} className="w-20 h-20 object-contain" />
      </div>
      <p className="text-sm font-medium text-center">{name}</p>
    </div>
  );
};

export default CategoryCard;
