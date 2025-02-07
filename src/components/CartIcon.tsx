import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import styles from "../components/CartIcon.module.scss"
const CartIcon: React.FC = () => {
  const items = useSelector((state: RootState) => state.cart.items);

  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className={styles.cartIcon}>
      <Link to="/cart">
        <FaShoppingCart size={45} />
        {totalQuantity > 0 && (
          <div className={styles.cartItemCount}>
            {totalQuantity}
          </div>
        )}
      </Link>
    </div>
  );
};

export default CartIcon;
