import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);

  const handleAddClick = () => {
    addToCart(product);
    setAdded(true);
  };

  const handleGoToCart = () => {
    navigate('/cart');
  };

  return (
    <div className="card border-1 shadow rounded-4 p-3" style={{ minWidth: "300px", marginRight: "10px" }}>
      <div className="position-relative text-center">
        <span className="badge bg-success position-absolute top-0 start-0 m-2">-30%</span>
        <img
          src="https://picsum.photos/80/80"
          alt={product.name}
          className="img-fluid my-3"
          style={{ height: '150px', objectFit: 'contain' }}
        />
      </div>

      <div className="card-body text-center">
        <h6 className="card-title fw-bold">{product.name}</h6>
        <p className="text-muted small">
          1 UNIT <i className="fa-solid fa-star text-warning ms-1"></i> {product.rating}
        </p>
        <h5 className="fw-bold">₹{product.price}</h5>

        <div className="d-flex justify-content-between align-items-center mt-3">
          {/* Wishlist Icon */}
          <button className="btn btn-outline-danger rounded-circle">
            <i className="fa-regular fa-heart"></i>
          </button>

          {/* Add to Cart / Go to Cart Button */}
          {added ? (
            <button className="btn btn-success" onClick={handleGoToCart}>
              Go to Cart
            </button>
          ) : (
            <button className="btn btn-outline-success" onClick={handleAddClick}>
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
