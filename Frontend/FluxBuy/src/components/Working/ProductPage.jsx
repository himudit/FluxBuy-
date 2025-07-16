import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ImageGallery({ images }) {

  const [selectedImage, setSelectedImage] = useState(0);


  return (
    <div className="flex gap-4">
      {/* Left Image Column */}
      <div className="flex flex-col gap-2 w-17 h-17">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Thumb ${idx}`}
            className={`w-16 h-16 object-contain rounded-md border cursor-pointer ${selectedImage === idx ? 'border-black' : 'border-gray-300'
              }`}
            onClick={() => setSelectedImage(idx)}
          />
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1 w-[25rem] h-[25rem]">
        <img
          src={images[selectedImage]}
          alt="Selected Product"
          className="w-full h-full max-h-[500px] rounded-lg border-white object-contain bg-gray-200"
        />
      </div>
    </div>
  );
}

const ProductPage = () => {
  const images = [
    '/men-shirt.png',
    '/men-shirt.png',
    '/men-shoes.png',
    '/men-shirt.png',
  ];
  const { id } = useParams();
  const [product, setProduct] = useState({});
  useEffect(() => {
    const f1 = async () => {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/product/${id}`);
      console.log(response);
      setProduct(response.data.data);
    }
    f1();
  }, []);

  return (
    <div>
      <div className="flex flex-wrap  max-w-6xl mx-auto p-4">
        <div>
          <ImageGallery images={images} />
        </div>
        <div className="max-w-md mx-auto bg-white p-4 rounded-lg shadow-md space-y-4 font-sans">
          <h2 className="text-lg font-semibold leading-tight">
            {product.title}
          </h2>

          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>10K+ Sold</span>
            <span className="text-yellow-400">★★★★★</span>
            <span>4.8</span>
            <span className="text-gray-400">•</span>
            <span>188 Reviews</span>
          </div>

          <div>
            <div className="text-2xl font-bold text-black">Rp187.500</div>
            <div className="text-sm text-gray-400 line-through">Rp250.000</div>
            <div className="text-green-500 text-sm font-medium">25% off</div>
          </div>

          <div className="flex items-center space-x-4">
            <img
              src="https://via.placeholder.com/40x40.png?text=Black"
              alt="Black Shirt"
              className="border rounded-md w-10 h-10"
            />
            <img
              src="https://via.placeholder.com/40x40.png?text=White"
              alt="White Shirt"
              className="border rounded-md w-10 h-10"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-600">Select Size</span>
            {/* <div className="flex items-center gap-2 mt-1">
              {['S', 'M', 'L', 'XL', '2XL', '3XL'].map((size, index) => (
                <button
                  key={index}
                  className={`border text-sm rounded px-3 py-1 ${size === 'M' ? 'bg-black text-white' : 'text-gray-800'
                    } ${['2XL', '3XL'].includes(size) ? 'text-gray-300 border-gray-300 cursor-not-allowed' : ''}`}
                  disabled={['2XL', '3XL'].includes(size)}
                >
                  {size}
                </button>
              ))}
            </div> */}
            <span className="ml-auto text-sm text-blue-500 underline cursor-pointer">Size Guide</span>
          </div>

          <div className="space-y-2">
            <button className="w-full bg-black text-white py-2 rounded-md text-sm font-semibold">
              Buy this Item
            </button>
            <button className="w-full border border-gray-300 text-black py-2 rounded-md text-sm font-semibold">
              Add to Bag
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="max-w-6xl mx-auto mt-6 px-4 py-6 bg-white rounded-md shadow-md space-y-4">
          <h3 className="text-lg font-semibold">Product Details</h3>

          <p className="text-sm text-gray-700 leading-relaxed">
            This Ben Hogan Men's Solid Ottoman Golf Polo Shirt makes for versatile casual wear or golf apparel.
            Built-in moisture wicking and sun protection keep you feeling dry while blocking out harmful UV rays.
            Durable textured Ottoman fabric and a ribbed collar with three-button placket give it classic polo style.
            The solid color makes this golf top easy to pair up with any pants or shorts for style that looks great both on and off the course.
          </p>

          <div className="text-sm text-gray-800 space-y-2">
            <div className="flex">
              <span className="w-40 font-medium">Package Dimensions</span>
              <span>: 27.3 x 24.8 x 4.9 cm; 180 g</span>
            </div>
            <div className="flex">
              <span className="w-40 font-medium">Specification</span>
              <span>: <span className="font-semibold">Moisture Wicking, Stretchy, SPF/UV Protection, Easy Care</span></span>
            </div>
            <div className="flex">
              <span className="w-40 font-medium">Date First Available</span>
              <span>: <span className="font-semibold">August 08, 2023</span></span>
            </div>
            <div className="flex">
              <span className="w-40 font-medium">Department</span>
              <span>: Mens</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage