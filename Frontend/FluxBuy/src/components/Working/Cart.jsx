import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  removeFromCart,
  decreaseQuantity,
  clearCart,
} from '../../features/cart/cartSlice';

function CartPage() {
  const dispatch = useDispatch();
  const { cartItems, totalPrice, totalQuantity } = useSelector((state) => state.cart);

  const handleIncrease = (item) => {
    dispatch(addToCart(item));
  };

  const handleDecrease = (id) => {
    dispatch(decreaseQuantity(id));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold">Your cart is empty 🛒</h2>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">You have {cartItems.length} products in your cart</h1>

      <div className="grid grid-cols-6 gap-4 font-semibold text-sm text-gray-500 border-b pb-2">
        <div className="col-span-3">Product</div>
        <div className="text-center">Price</div>
        <div className="text-center">Quantity</div>
        <div className="text-right">Total</div>
      </div>

      {cartItems.map((item) => (
        <div key={item.id} className="grid grid-cols-6 gap-4 items-center border-b py-4">
          {/* Product */}
          <div className="col-span-3 flex items-center gap-4">
            <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-md" />
            <div>
              <h2 className="font-semibold">{item.title}</h2>
              <p className="text-sm text-gray-500">Color: Green-D</p>
              <p className="text-sm text-gray-500">Size: XL</p>
              <p className="text-sm text-green-600 mt-1">● In Stock (12 Pcs)</p>
            </div>
          </div>

          {/* Price */}
          <div className="text-center font-medium">${item.price.toFixed(2)}</div>

          {/* Quantity */}
          <div className="flex justify-center items-center gap-2">
            <button
              className="w-8 h-8 rounded border flex items-center justify-center text-lg"
              onClick={() => handleDecrease(item.id)}
            >
              −
            </button>
            <span>{item.quantity}</span>
            <button
              className="w-8 h-8 rounded border flex items-center justify-center text-lg"
              onClick={() => handleIncrease(item)}
            >
              +
            </button>
          </div>

          {/* Total */}
          <div className="text-right font-medium">
            ${(item.quantity * item.price).toFixed(2)}
          </div>
        </div>
      ))}

      {/* Footer Summary */}
      <div className="flex justify-between items-center mt-8">
        <button
          className="text-gray-600 underline text-sm"
          onClick={() => dispatch(clearCart())}
        >
          Clear Cart
        </button>

        <div className="text-right">
          <p className="text-sm text-gray-600 mb-1">Subtotal: <strong>${totalPrice.toFixed(2)}</strong></p>
          <p className="text-xs text-gray-400 mb-4">Excl. tax and delivery charge</p>

          <div className="flex gap-4">
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded">
              Continue Shipping
            </button>
            <button className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700">
              Go to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
