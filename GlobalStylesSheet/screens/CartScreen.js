// screens/CartScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

const CartScreen = ({ navigation, route }) => {
  // Get cart items from navigation parameters or use empty array as default
  const [cartItems, setCartItems] = useState(route.params?.cartItems || []);

  // Remove item from cart
  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
  };

  // Update quantity
  const updateQuantity = (id, change) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === id) {
        const newQuantity = (item.quantity || 1) + change;
        if (newQuantity < 1) {
          return null; // Remove item if quantity becomes 0
        }
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(Boolean); // Remove null items
    
    setCartItems(updatedCart);
  };

  // Clear entire cart
  const clearCart = () => {
    Alert.alert(
      "Clear Cart",
      "Are you sure you want to remove all items from your cart?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Clear All", 
          style: "destructive",
          onPress: () => setCartItems([])
        }
      ]
    );
  };

  // Calculate total
  const total = cartItems.reduce((sum, item) => {
    const quantity = item.quantity || 1;
    // Extract numeric price from string (e.g., "13000PKR" -> 13000)
    const price = typeof item.price === 'string' 
      ? parseInt(item.price.replace(/[^0-9]/g, '')) 
      : item.price;
    return sum + (price * quantity);
  }, 0);

  const renderItem = ({ item }) => {
    const quantity = item.quantity || 1;
    const price = typeof item.price === 'string' 
      ? parseInt(item.price.replace(/[^0-9]/g, '')) 
      : item.price;
    const itemTotal = price * quantity;

    return (
      <View style={styles.cartItem}>
        <Image source={item.image} style={styles.image} />
        <View style={styles.itemDetails}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>Rs. {price.toLocaleString()}</Text>
          
          {/* Quantity Controls */}
          <View style={styles.quantityContainer}>
            <TouchableOpacity 
              style={styles.quantityButton}
              onPress={() => updateQuantity(item.id, -1)}
            >
              <Text style={styles.quantityText}>-</Text>
            </TouchableOpacity>
            
            <Text style={styles.quantity}>{quantity}</Text>
            
            <TouchableOpacity 
              style={styles.quantityButton}
              onPress={() => updateQuantity(item.id, 1)}
            >
              <Text style={styles.quantityText}>+</Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.itemTotal}>Item Total: Rs. {itemTotal.toLocaleString()}</Text>
        </View>
        
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => removeFromCart(item.id)}
        >
          <Text style={styles.removeText}>🗑️</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>⬅️ Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>🛒 Your Cart</Text>
        <View style={styles.placeholder} /> {/* For alignment */}
      </View>

      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySubtitle}>Add some items to get started!</Text>
          <TouchableOpacity 
            style={styles.continueShoppingButton}
            onPress={() => navigation.navigate("Categories")}
          >
            <Text style={styles.continueShoppingText}>🛍️ Continue Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.flatListContent}
            showsVerticalScrollIndicator={false}
          />

          {/* Total and Actions */}
          <View style={styles.totalContainer}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total Items:</Text>
              <Text style={styles.totalValue}>
                {cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0)}
              </Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total Amount:</Text>
              <Text style={styles.totalAmount}>Rs. {total.toLocaleString()}</Text>
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.actionButton, styles.clearButton]}
                onPress={clearCart}
              >
                <Text style={styles.actionText}>🗑️ Clear Cart</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, styles.checkoutButton]}
                onPress={() => Alert.alert(
                  "Order Placed! ✅", 
                  `Your order of Rs. ${total.toLocaleString()} has been successfully placed!`
                )}
              >
                <Text style={styles.actionText}>💳 Checkout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#F8F9FA",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  backText: { 
    fontSize: 16, 
    fontWeight: "600",
    color: "#FF6F61",
  },
  title: { 
    fontSize: 24, 
    fontWeight: "bold", 
    color: "#FF6F61", 
    textAlign: "center" 
  },
  placeholder: {
    width: 60, // Same as back button width for balance
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#666",
    marginBottom: 10,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 16,
    color: "#999",
    marginBottom: 30,
    textAlign: "center",
  },
  continueShoppingButton: {
    backgroundColor: "#FF6F61",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#FF6F61",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  continueShoppingText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  flatListContent: {
    padding: 15,
    paddingBottom: 200, // Space for total container
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 16,
    marginBottom: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  image: { 
    width: 70, 
    height: 70, 
    borderRadius: 12, 
    marginRight: 15 
  },
  itemDetails: {
    flex: 1,
  },
  name: { 
    fontSize: 16, 
    fontWeight: "bold", 
    color: "#333",
    marginBottom: 4,
  },
  price: { 
    color: "#1E90FF", 
    fontWeight: "600",
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  quantityButton: {
    backgroundColor: "#f0f0f0",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  quantity: {
    fontSize: 16,
    fontWeight: "600",
    marginHorizontal: 15,
    color: "#333",
  },
  itemTotal: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FF6F61",
  },
  removeButton: { 
    padding: 8, 
    justifyContent: "center", 
    alignItems: "center" 
  },
  removeText: { 
    fontSize: 20,
  },
  totalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 8,
    elevation: 5,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  totalLabel: {
    fontSize: 16,
    color: "#666",
    fontWeight: "600",
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF6F61",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    elevation: 3,
  },
  clearButton: {
    backgroundColor: "#FF6347",
  },
  checkoutButton: {
    backgroundColor: "#28a745",
  },
  actionText: { 
    color: "#fff", 
    fontWeight: "bold", 
    fontSize: 16 
  },
});

export default CartScreen;