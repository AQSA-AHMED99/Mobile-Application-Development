// frontend/context/CartContext.js
import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Generate unique cartId for every item
  const makeCartId = () =>
    `${Date.now()}-${Math.floor(Math.random() * 100000).toString(36)}`;

  // Add item to cart
  const addToCart = (item) => {
    const cartItem = {
      ...item,
      cartId: makeCartId(),
    };
    setCartItems((prev) => [...prev, cartItem]);
  };

  // Remove single item
  const removeFromCart = (cartId) => {
    setCartItems((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  // Clear entire cart
  const clearCart = () => {
    console.log("🧹 Clearing entire cart...");
    setCartItems([]);
  };

  // Calculate total
  const getTotalPrice = () => {
    return cartItems.reduce((sum, item) => {
      const digits = item.price?.toString().replace(/[^0-9]/g, "") || "0";
      const price = parseInt(digits, 10);
      return sum + (isNaN(price) ? 0 : price);
    }, 0);
  };

  // Total items count
  const getTotalItems = () => cartItems.length;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getTotalPrice,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
