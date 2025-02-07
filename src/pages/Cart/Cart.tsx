import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { addItemToCart, deleteItemToCart, removeItemFromCart, clearCart } from '../../store/cartSlice';
import { CartItem } from '../../store/cartSlice';
import styles from '../Cart/Cart.module.scss';

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  // Уменьшение количества товара
  const handleDecreaseQuantity = (id: number) => {
    dispatch(deleteItemToCart(id));  // Уменьшаем количество товара
  };

  // Увеличение количества товара
  const handleIncreaseQuantity = (item: CartItem) => {
    dispatch(addItemToCart(item));  // Увеличиваем количество товара
  };

  // Удаление товара полностью из корзины
  const handleRemoveItem = (id: number) => {
    dispatch(removeItemFromCart(id));  // Удаляем товар из корзины
  };

  // Очистка всей корзины
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  // Подсчет общей стоимости
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return <div>Корзина пуста! Добавьте товары в корзину.</div>;
  }

  return (
    <div>
      <h2>Ваша корзина</h2>
      {cartItems.length > 0 && (
        <button onClick={handleClearCart} className={styles.clearCartButton}>Очистить корзину</button>
      )}
      {cartItems.map((item) => (
        <div key={item.id} className={styles.cartItem}>
          <img src={item.image} alt={item.title} className={styles.image} />
          <div className={styles.itemDetails}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p>Цена: ${item.price}</p>
            <div className={styles.quantityControls}>
              <button onClick={() => handleDecreaseQuantity(item.id)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => handleIncreaseQuantity(item)}>+</button>
            </div>
            <button onClick={() => handleRemoveItem(item.id)} className={styles.removeButton}>
              Удалить
            </button>
          </div>
        </div>
      ))}
      <div className={styles.totalPrice}>
        <h3>Итоговая стоимость: ${totalPrice.toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default Cart;
