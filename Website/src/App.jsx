import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ARChoicePage from './pages/ARChoicePage';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import ProfilePage from './pages/ProfilePage';
import LandingPage from './pages/LandingPage';
import { CartProvider } from './context/CartContext';
import ProductDetails from './pages/ProductDetails';
import ProductsPerCategory from './pages/ProductsPerCategory';
import Checkout from './pages/Checkout';
function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          {/* AR Entry page */}
          <Route path="/" element={<ARChoicePage />} />

          {/* Website view */}
          <Route path="/home" element={<LandingPage />} />
          <Route path='/wishlist' element={<Wishlist />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/productDetails' element={<ProductDetails />} />
          <Route path='/productsPerCategory' element={<ProductsPerCategory />} />
          <Route path='/checkout' element={<Checkout/>} />
          
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
