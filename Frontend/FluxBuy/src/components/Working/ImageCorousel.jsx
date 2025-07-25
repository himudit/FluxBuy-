import React, { useEffect, useState } from 'react';

const ImageCorousel = () => {
    const imageMap = [
        '/samsung-fold-flip.jpg',
        '/camera.jpeg',
        '/iwatch.png',
        '/headphone.png',
        '/tshirt.avif' // Fixed path: should be absolute if in public/
    ];

    const [current, setCurrent] = useState(0);
    const length = imageMap.length;

    // Auto slide every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % length);
        }, 3000);
        return () => clearInterval(interval); // Cleanup
    }, [length]);

    // Manual dot click
    const goToSlide = (index) => {
        setCurrent(index);
    };

    return (
        <div className="w-[60%] mx-auto">
            {/* Image Container */}
            <div className="relative w-full h-[500px] overflow-hidden rounded mb-4">
                {imageMap.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={`slide-${index}`}
                        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
                            }`}
                    />
                ))}
            </div>

            {/* Dots Navigation */}
            <div className="flex justify-center gap-2 mt-2">
                {imageMap.map((_, index) => (
                    <button
                        key={index}
                        className={`w-3 h-3 rounded-full ${index === current ? 'bg-red-500' : 'bg-gray-300'
                            }`}
                        onClick={() => goToSlide(index)}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default ImageCorousel;
