import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
} from "react-native";
import { useCart } from "../context/CartContext";
import GlobalStyles, {
  Colors,
  Spacing,
  BorderRadius,
  Shadows,
} from "../styles/GlobalStyles";

export default function CartScreen() {
  const { cartItems, removeFromCart, clearCart, getTotalPrice, getTotalItems } =
    useCart();

  const total = Math.round(getTotalPrice());
  const totalItems = getTotalItems();

  console.log("🛍️ Cart items:", cartItems);
  console.log("🧮 Total items:", totalItems, " | Total price:", total);

  // ✅ Handle Clear Cart (Synchronous Example)
  const handleClearCart = () => {
    if (cartItems.length === 0) {
      Alert.alert("Cart Empty", "Your cart is already empty!");
      return;
    }
    console.log("🗑️ Clearing cart...");
    clearCart();
    Alert.alert("🧹 Cart Cleared", "Your cart has been emptied!");
  };

  // ✅ Simulate Promise-based checkout (Asynchronous + Promise Example)
  const processOrder = () => {
    return new Promise((resolve, reject) => {
      console.log("⏳ Processing order...");
      setTimeout(() => {
        if (cartItems.length > 0) resolve("Order placed successfully!");
        else reject("Cart is empty!");
      }, 2000); // simulate 2s async delay
    });
  };

  // ✅ Handle Checkout (Async/Await + Promise)
  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      Alert.alert("Cart Empty", "Please add some items first!");
      return;
    }

    try {
      Alert.alert(
        "Confirm Checkout",
        `Checkout Rs. ${total.toLocaleString()} for ${totalItems} item(s)?`,
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Confirm",
            onPress: async () => {
              try {
                const message = await processOrder();
                Alert.alert("✅ Success", message);
                clearCart();
              } catch (error) {
                Alert.alert("❌ Error", error);
              }
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert("Error", "Something went wrong during checkout.");
      console.error(error);
    }
  };

  // ✅ Render each item
  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.itemInfo}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
      <TouchableOpacity
        onPress={() => removeFromCart(item.cartId)}
        style={[styles.buttonSmall, { backgroundColor: Colors.danger }]}
      >
        <Text style={styles.buttonTextSmall}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>🛒 Your Cart</Text>

        {cartItems.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.empty}>Your cart is empty</Text>
          </View>
        ) : (
          <>
            <FlatList
              data={cartItems}
              keyExtractor={(item) => item.cartId}
              renderItem={renderItem}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
            />

            {/* ✅ Total + Buttons */}
            <View style={styles.totalContainer}>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Subtotal</Text>
                <Text style={styles.totalAmount}>
                  Rs. {total.toLocaleString()}
                </Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Items</Text>
                <Text style={styles.totalItems}>{totalItems}</Text>
              </View>

              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: Colors.danger }]}
                  onPress={handleClearCart}
                >
                  <Text style={styles.buttonText}>Clear Cart</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, { backgroundColor: Colors.success }]}
                  onPress={handleCheckout}
                >
                  <Text style={styles.buttonText}>Checkout</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

// 🧱 Styles
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.light,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.light,
    padding: Spacing.sm,
  },
  title: {
    ...GlobalStyles.heading,
    textAlign: "center",
    marginBottom: Spacing.md,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  empty: {
    ...GlobalStyles.textLarge,
    color: Colors.textLight,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    padding: Spacing.base,
    borderRadius: BorderRadius.base,
    marginBottom: Spacing.sm,
    ...Shadows.light,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: BorderRadius.base,
    marginRight: Spacing.base,
  },
  itemInfo: {
    flex: 1,
    marginRight: Spacing.sm,
  },
  name: {
    ...GlobalStyles.textLarge,
    fontWeight: "bold",
  },
  price: {
    ...GlobalStyles.text,
    color: Colors.secondary,
  },
  buttonSmall: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: BorderRadius.sm,
  },
  buttonTextSmall: {
    color: Colors.white,
    fontWeight: "600",
    fontSize: 13,
  },
  totalContainer: {
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.base,
    borderTopWidth: 1,
    borderTopColor: Colors.grayLight,
    backgroundColor: Colors.white,
    ...Shadows.medium,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Spacing.sm,
  },
  totalLabel: {
    ...GlobalStyles.textLarge,
    fontWeight: "500",
  },
  totalAmount: {
    ...GlobalStyles.textXLarge,
    color: Colors.primary,
    fontWeight: "bold",
  },
  totalItems: {
    ...GlobalStyles.text,
    color: Colors.textMuted,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: Spacing.md,
    gap: Spacing.sm,
  },
  button: {
    flex: 1,
    borderRadius: BorderRadius.round,
    paddingVertical: Spacing.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    ...GlobalStyles.buttonText,
    fontSize: 16,
    fontWeight: "600",
  },
});
