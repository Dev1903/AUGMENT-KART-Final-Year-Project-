import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
const URL = import.meta.env.VITE_APP_BACKEND_URL;

const ProductDetails = ({ product }) => {
  const { addToCart, updateQuantity, cartItems } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [added, setAdded] = useState(false);
  const [showQuantityControls, setShowQuantityControls] = useState(false);

  const cartItem = cartItems.find((item) => item._id === product._id);
  const quantity = cartItem ? cartItem.quantity : 0;
  const isFavorite = isInWishlist(product._id);

  const handleAddToCart = () => {
    addToCart({ ...product, id: product._id });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setShowQuantityControls(true);
    }, 1500);
  };

  const handleIncrement = () => updateQuantity(product._id, quantity + 1);
  const handleDecrement = () => {
    updateQuantity(product._id, quantity - 1);
    if (quantity - 1 <= 0) setShowQuantityControls(false);
  };

  useEffect(() => {
    setShowQuantityControls(quantity > 0);
  }, [quantity]);

  return (
    <div className="container my-4">
      <AppHeader title="Details" />
      <div className="row">
        <div className="col-md-6">
          <img
            src={`${URL}/images/product-images/${product.image}`}
            alt={product.name}
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-6">
          <h2>{product.name}</h2>
          <h4 className="text-success mb-3">₹{product.price}</h4>
          <p>Fresh and high-quality {product.name} available now! Perfect for your daily grocery needs.</p>
          <div className="mb-3">
            {isFavorite ? (
              <button
                className="btn btn-outline-danger"
                onClick={() => removeFromWishlist(product._id)}
              >
                Remove from Wishlist
              </button>
            ) : (
              <button
                className="btn btn-outline-success"
                onClick={() => addToWishlist(product)}
              >
                🤍 Add to Wishlist
              </button>
            )}
          </div>

          {showQuantityControls ? (
            <div className="d-flex align-items-center">
              <button className="btn btn-outline-success me-2" onClick={handleDecrement}>-</button>
              <span className="fw-bold">{quantity}</span>
              <button className="btn btn-outline-success ms-2" onClick={handleIncrement}>+</button>
            </div>
          ) : (
            <button
              className={`btn ${added ? 'btn-success' : 'btn-primary'} mt-3`}
              onClick={handleAddToCart}
            >
              {added ? 'Added' : 'Add to Cart'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
