import React from "react";
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getTotal } = useCart();

  return (
    <div className="container py-5 position-relative">
      <h2>Your Shopping Cart</h2>

      {cartItems.length > 0 && (
        <button
          className="btn btn-danger position-absolute"
          style={{ top: "20px", right: "20px" }}
          onClick={clearCart}
        >
          Clear Cart
        </button>
      )}

      {cartItems.length === 0 ? (
        <p className="empty-text">Your cart is empty</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div className="cart-item d-flex align-items-center border-bottom py-3" key={item.id}>
              <img
                src={item.image || "https://picsum.photos/100"}
                alt={item.name}
                className="me-3"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
              <div className="flex-grow-1">
                <h5>{item.name}</h5>
                <p>₹{item.price}</p>
                <div className="d-flex align-items-center">
                  <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button className="btn btn-sm btn-outline-secondary mx-2" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  <button className="btn btn-sm btn-outline-danger ms-3" onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              </div>
            </div>
          ))}

          <div className="mt-4 fs-5 fw-bold">
            Total: ₹{getTotal().toFixed(2)}
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
