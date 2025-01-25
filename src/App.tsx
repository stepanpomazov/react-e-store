// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import Cart from './pages/Cart';
import CartIcon from './components/CartIcon'; // Импортируем компонент корзины
import './styles/global.scss'; // Импортируем глобальные стили

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          {/* Размещаем корзину в правом верхнем углу */}
          <CartIcon />
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
