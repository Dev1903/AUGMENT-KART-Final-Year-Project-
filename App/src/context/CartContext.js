import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item._id === product.id);
      if (exists) {
        return prev.map((item) =>
          item._id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) =>
      prev.filter((item) => item._id !== productId)
    );
  };

  const updateQuantity = (productId, quantity) => {
    setCartItems((prev) => {
      if (quantity <= 0) {
        // Remove item completely
        return prev.filter((item) => item._id !== productId);
      }

      // Otherwise, update quantity
      return prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );
    });
  };


  const clearCart = () => setCartItems([]);

  const getTotal = () =>
    cartItems.reduce((total, item) => {
      const priceMatch = item.price.match(/[\d.]+/); // match first number (can include decimals)
      const price = priceMatch ? parseFloat(priceMatch[0]) : 0;
      return total + item.quantity * price;
    }, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, getTotal }}
    >
      {children}
    </CartContext.Provider>
  );
};
