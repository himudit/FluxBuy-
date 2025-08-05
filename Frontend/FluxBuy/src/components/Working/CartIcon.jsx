import { FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const CartIcon = () => {
    const cartItems = useSelector((state) => state.cart.cartItems)
    const totalCount = cartItems.length;

    return (
        <Link to="/cart" className="relative">
            <FaShoppingCart className="text-2xl text-black hover:text-purple-500 transition-colors" />

            {totalCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                    {totalCount}
                </span>
            )}
        </Link>
    );
};

export default CartIcon;
