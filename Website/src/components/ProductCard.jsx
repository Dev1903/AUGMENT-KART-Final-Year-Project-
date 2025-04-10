import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const URL = import.meta.env.VITE_APP_BACKEND_URL;

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleAddClick = () => {
    addToCart(product);
    setAdded(true);
  };

  const handleGoToCart = () => {
    navigate('/cart');
  };

  const handleWishlistClick = () => {
    if (!liked) {
      setLiked(true);
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 2000);
    } else {
      setLiked(false);
      setShowPopup(false); // Ensure popup disappears instantly when unliking
    }
  };

  return (
    <div className="card border-1 shadow rounded-4 p-3 product-card">
      <div className="position-relative text-center">
        <img
          src={`${URL}/images/product-images/${product.image}`}
          alt={product.name}
          className="img-fluid my-3 product-image"
        />
      </div>

      <div className="card-body text-center">
        <h6 className="card-title fw-bold">{product.name}</h6>
        <p className="fw-bold">{product.price}</p>

        <div className="d-flex justify-content-between align-items-center mt-3">
          <div style={{ position: 'relative' }}>
            <button className="wishlist-btn" onClick={handleWishlistClick}>
              <i
                className="fa-solid fa-heart"
                style={{ color: liked ? 'red' : '#4caf50' }}
              ></i>
            </button>
            {showPopup && (
              <div className="wishlist-popup">Added to Wishlist</div>
            )}
          </div>

          {added ? (
            <button className="btn btn-success" onClick={handleGoToCart}>
              Go to Cart
            </button>
          ) : (
            <button
              className="btn btn-outline-success"
              onClick={handleAddClick}
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
