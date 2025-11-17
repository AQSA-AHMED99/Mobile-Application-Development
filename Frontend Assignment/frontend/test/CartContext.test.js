import { renderHook, act } from "@testing-library/react-native";
import { CartProvider, useCart } from "../context/CartContext";
import React from "react";

test("adds and clears items from cart", () => {
  const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;
  const { result } = renderHook(() => useCart(), { wrapper });

  act(() => {
    result.current.addToCart({ id: "1", name: "Pizza", price: "Rs.1000" });
  });

  expect(result.current.getTotalItems()).toBe(1);

  act(() => {
    result.current.clearCart();
  });

  expect(result.current.getTotalItems()).toBe(0);
});
