import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReviewCard from './ReviewCard';
import ReviewSection from './ReviewSection';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../features/cart/cartSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

function ImageGallery({ image }) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-2 md:w-20 w-full overflow-x-auto md:overflow-visible">
        {image.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Thumb ${idx}`}
            className={`w-20 h-20 object-contain rounded-md border bg-gray-200 cursor-pointer ${selectedImage === idx ? 'border-black' : 'border-gray-300'
              }`}
            onClick={() => setSelectedImage(idx)}
          />
        ))}
      </div>

      {/* Main Image with Zoom on Click */}
      <div className="flex-1 min-w-0 max-w-[30rem]">
        <Zoom>
          <img
            src={image[selectedImage]}
            alt="Selected Product"
            className="rounded-lg border border-gray-200 object-contain w-full h-auto bg-gray-100 max-h-[400px]"
          />
        </Zoom>
      </div>
    </div>
  );
}



const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [image, setImage] = useState([]);
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const [isInCart, setIsInCart] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems)


  useEffect(() => {
    const f1 = async () => {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/product/${id}`);
      setProduct(response.data.data);
    };
    f1();
  }, []);

  useEffect(() => {
    const found = cartItems.some((item) => item.id === product.apiId);
    setIsInCart(found);
  }, [cartItems, product.apiId]);

  const handleAddToCart = () => {
    const fetchCategories = async () => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/cart/cart`, {
          userId: userInfo._id,
          productApiId: product.apiId,
          title: product.title,
          quantity: 1,
          color: 'green',
          size: 'XL',
          image: product.thumbnail,
          price: product.price,
          discount: product.discount,
        });
      } catch (err) {
        console.error('Error fetching categories:', err.message);
      }
    };
    fetchCategories();
    dispatch(addToCart({
      id: product.apiId,
      title: product.title,
      price: product.price,
      image: product.thumbnail
    }));
    setIsInCart(true);
  };

  useEffect(() => {
    if (product?.images) {
      setImage(product.images);
    }
  }, [product]);
  const navigate = useNavigate();

  return (
    <div>
      {/* Main Product Section */}
      <div className="flex flex-col md:flex-row gap-6 max-w-6xl mx-auto p-4">
        {/* Image Gallery */}
        <div className="flex-1 w-full lg:w-[25rem] lg:h-[25rem]">
          <ImageGallery image={image} />
        </div>

        {/* Product Info */}
        <div className="md:w-[30rem] w-full bg-white p-4 rounded-lg shadow-md space-y-4">
          <h2 className="text-lg font-semibold">{product.title}</h2>

          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>10K+ Sold</span>
            <span className="text-yellow-400 text-2xl">★★★★★</span>
            <span>{product.rating}</span>
            <span className="text-gray-400">•</span>
            <span>188 Reviews</span>
          </div>

          <div>
            <div className="text-3xl font-bold text-black">$ {product.price}</div>
            <div className="text-green-500 text-sm font-medium">{product.discountPercentage}% off</div>
          </div>

          {/* <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-600">Select Size</span>
            <span className="ml-auto text-sm text-blue-500 underline cursor-pointer">Size Guide</span>
          </div> */}

          <div className="space-y-2">
            <button className="w-full bg-black text-white py-2 rounded-md text-sm font-semibold">
              Buy this Item
            </button>
            {/* <button className="w-full border border-gray-300 text-black py-2 rounded-md text-sm font-semibold cursor-pointer" onClick={handleAddToCart}>
              Add to Cart
            </button> */}
            {
              isInCart ? (
                <button
                  className="w-full bg-black text-white py-2 rounded-md text-sm font-semibold cursor-pointer"
                  onClick={() => navigate('/cart')}
                >
                  Go to Cart
                </button>
              ) : (
                <button
                  className="w-full border border-gray-300 text-black py-2 rounded-md text-sm font-semibold cursor-pointer hover:bg-gray-100 transition"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
              )
            }
          </div>
        </div>
      </div>

      {/* Product Description Section */}
      <div className="max-w-6xl mx-auto mt-6 px-4 py-6 bg-white rounded-md shadow-md space-y-4">
        <h3 className="text-lg font-semibold">Product Details</h3>
        <p className="text-sm text-gray-700 leading-relaxed">{product.description}</p>

        <div className="text-sm text-gray-800 space-y-2">
          <div className="flex flex-wrap">
            <span className="w-40 font-medium">Package Dimensions</span>
            <span>
              : {product?.dimensions?.width} x {product?.dimensions?.height} x {product?.dimensions?.depth} cm
            </span>
          </div>
          <div className="flex flex-wrap">
            <span className="w-40 font-medium">Date First Available</span>
            <span>: <span className="font-semibold">August 08, 2023</span></span>
          </div>
          <div className="flex flex-wrap">
            <span className="w-40 font-medium">Stock</span>
            <span>: {`${product.stock}`}</span>
          </div>
        </div>
      </div>
      <ReviewSection reviews={product.reviews} />
    </div>
  );
};

export default ProductPage;
