import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../store/cartSlice';
import { getProductById } from '../../api/api';
import { Product } from '../../store/Product'; 
import styles from '../ProductPage/ProductPage.module.scss'; 

const ProductPage: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null); 
  const [loading, setLoading] = useState<boolean>(true);  // отслеживание состояния загрузки
  const [error, setError] = useState<string | null>(null);  // отслеживание ошибок
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await getProductById(id || ''); 
        setProduct(fetchedProduct);
      } catch (err: unknown) { 
        if (err instanceof Error) {
          setError('Ошибка загрузки продукта. Пожалуйста, попробуйте позже.');
          console.error(err.message); 
        } else {
          setError('Произошла неизвестная ошибка');
        }
      } finally {
        setLoading(false); 
      }
    };
  
    fetchProduct();
  }, [id]);
    

  const handleAddToCart = () => {
    if (product) {
      dispatch(addItemToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        description: product.description,
        quantity: 1,
      }));
    }
  };

  if (loading) {
    return <div className={styles.loading}>Загрузка...</div>;  // Индикатор загрузки
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;  // Сообщение об ошибке
  }

  if (!product) {
    return <p>Продукт не найден.</p>;
  }

  return (
    <div className={styles.productPage}>
      <h2 className={styles.productTitle}>{product.title}</h2>
      <img src={product.image} alt={product.title} className={styles.productImage} />
      <p className={styles.productDescription}>{product.description}</p>
      <p className={styles.productPrice}>Цена: ${product.price}</p>
      <button onClick={handleAddToCart} className={styles.addToCartButton}>Добавить в корзину</button>
    </div>
  );
};

export default ProductPage;
