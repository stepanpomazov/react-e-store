import React from 'react';
import { useSelector } from 'react-redux';
//import { useDispatch } from 'react-redux';
import { RootState } from '../store';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

const CartIcon: React.FC = () => {
  const items = useSelector((state: RootState) => state.cart.items);

  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="cart-icon">
      <Link to="/cart">
        <FaShoppingCart size={30} />
        {totalQuantity > 0 && (
          <div className="cart-quantity">
            {totalQuantity}
          </div>
        )}
      </Link>
    </div>
  );
};

export default CartIcon;
