// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { CartProvider } from "./frontend/context/CartContext";
import AppNavigator from "./frontend/navigation/AppNavigator";

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </CartProvider>
  );
}
