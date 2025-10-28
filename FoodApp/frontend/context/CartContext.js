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

  // Create a short unique id: timestamp + random
  const makeCartId = () => `${Date.now()}-${Math.floor(Math.random() * 100000)}`;

  // Add item to cart -> ALWAYS produce a unique cartId per entry
  const addToCart = (item) => {
    const cartItem = {
      ...item,
      cartId: makeCartId(), // guaranteed unique for this entry
    };
    setCartItems((prev) => [...prev, cartItem]);
  };

  // Remove a single cart entry by its unique cartId (removes only that entry)
  const removeFromCart = (cartId) => {
    if (!cartId) return;
    setCartItems((prev) => prev.filter((it) => it.cartId !== cartId));
  };

  // Optional utility: remove only one occurrence of a product by product id
  // (useful if your UI supplies productId rather than cartId; not used unless called)
  const removeOneByProductId = (productId) => {
    setCartItems((prev) => {
      const idx = prev.findIndex((it) => it.id === productId);
      if (idx === -1) return prev;
      const next = [...prev];
      next.splice(idx, 1); // remove single occurrence
      return next;
    });
  };

  // Clear all
  const clearCart = () => {
    setCartItems([]);
  };

  // Sum total in PKR: remove non-digits then sum as integer
  const getTotalPrice = () => {
    return cartItems.reduce((sum, item) => {
      const digitsOnly = item.price?.toString().replace(/[^0-9]/g, "") ?? "0";
      const numeric = Number(digitsOnly);
      return sum + (isNaN(numeric) ? 0 : numeric);
    }, 0);
  };

  const getTotalItems = () => cartItems.length;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        removeOneByProductId,
        clearCart,
        getTotalPrice,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
