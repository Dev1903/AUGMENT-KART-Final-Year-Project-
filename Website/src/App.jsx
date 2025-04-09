import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import ProductCard from './components/ProductCard';
import ARChoicePage from './pages/ARChoicePage';
import WishlistPage from './pages/WishlistPage';
import CartPage from './pages/CartPage';
import ProfilePage from './pages/ProfilePage';
import LandingPage from './pages/LandingPage';
import { CartProvider } from './context/CartContext';
function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          {/* AR Entry page */}
          <Route path="/" element={<ARChoicePage />} />

          {/* Website view */}
          <Route path="/home" element={<LandingPage />} />
          <Route path='/wishlist' element={<WishlistPage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/profile' element={<ProfilePage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
