import React, { useEffect, useState } from 'react';

const ImageCarousel = () => {
    const imageMap = [
        '/camera.jpeg',
        '/iwatch.png',
        '/headphone.png',
        '/samsung-fold-flip.jpg',
        '/tshirt.jpg',
    ];

    const [current, setCurrent] = useState(0);
    const length = imageMap.length;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % length);
        }, 4000);
        return () => clearInterval(interval);
    }, [length]);

    const goToSlide = (index) => {
        setCurrent(index);
    };

    return (
        <div className="w-full max-w-[1100px] mx-auto px-4">
            {/* Image Container */}
            <div className="relative w-full h-[400px] sm:h-[500px] overflow-hidden rounded-xl shadow-xl border border-gray-200">
                {imageMap.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={`slide-${index}`}
                        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                    />
                ))}

                {/* Optional Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-20 pointer-events-none rounded-xl"></div>
            </div>

            {/* Dots Navigation */}
            <div className="flex justify-center items-center mt-4 gap-3">
                {imageMap.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 transform
              ${index === current ? 'bg-red-500 scale-125 shadow-lg' : 'bg-gray-300 hover:bg-gray-400'}
            `}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default ImageCarousel;
