import React from 'react';
import { useCart } from '../context/CartContext';
const URL = import.meta.env.VITE_APP_BACKEND_URL;
const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotal, clearCart } = useCart();

  return (
    <div className="container mt-4">
      <AppHeader title="Cart" />

      {cartItems.length > 0 && (
        <div className="d-flex justify-content-between align-items-center border p-3 mb-4">
          <div>
            <h5>Total Cart Amount</h5>
            <h3>₹{getTotal()}</h3>
          </div>
          <button className="btn btn-danger" onClick={clearCart}>Clear Cart</button>
        </div>
      )}

      {cartItems.length === 0 ? (
        <h5 className="text-center text-muted">🛒 Your cart is empty</h5>
      ) : (
        <div className="row">
          {cartItems.map((item) => (
            <div className="col-md-6 col-lg-4 mb-4" key={item.id}>
              <div className="card h-100">
                <div className="position-relative">
                  <img
                    src={`${URL}/images/product-images/${item.image}`}
                    className="card-img-top"
                    alt={item.name}
                  />
                  <button
                    className="btn btn-sm btn-outline-danger position-absolute top-0 start-0 m-2"
                    onClick={() => removeFromCart(item.id)}
                  >
                    🗑️
                  </button>
                </div>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text text-muted">Price: ₹{item.price}</p>
                  <div className="d-flex align-items-center justify-content-center mt-auto">
                    <button
                      className="btn btn-outline-success me-2"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >-</button>
                    <span className="fw-bold">{item.quantity}</span>
                    <button
                      className="btn btn-outline-success ms-2"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >+</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
