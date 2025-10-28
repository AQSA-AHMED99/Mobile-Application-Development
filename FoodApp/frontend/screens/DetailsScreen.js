import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useCart } from "../context/CartContext";
import GlobalStyles, { Colors, Spacing, BorderRadius, Shadows } from "../styles/GlobalStyles";

const DetailsScreen = ({ route }) => {
  // Safety check for route params
  if (!route?.params?.item) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Item not found!</Text>
        <Text style={styles.errorSubtext}>Please go back and select an item.</Text>
      </View>
    );
  }

  const { item } = route.params;
  const { addToCart } = useCart();
  const [count, setCount] = useState(0);

  const handleAddToCart = () => {
    try {
      addToCart(item);
      const newCount = count + 1;
      setCount(newCount);
      Alert.alert(
        "✅ Success",
        `${newCount} ${item.name}${newCount > 1 ? "s" : ""} added successfully!`
      );
    } catch (error) {
      console.log("Add to cart error:", error);
      Alert.alert("Error", "Failed to add item to cart.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Food Image */}
      <Image
        source={item.image}
        style={styles.image}
        onError={() => console.log("Image failed to load")}
      />

      {/* Name & Price */}
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.price}>{item.price}</Text>

      {/* Add to Cart Button */}
      <TouchableOpacity
        style={[
          styles.button,
          count > 0 ? { backgroundColor: Colors.success } : {},
        ]}
        onPress={handleAddToCart}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>
          {count > 0 ? `Add More (${count})` : "Add to Cart"}
        </Text>
      </TouchableOpacity>

      {/* Cart Count Message */}
      {count > 0 && (
        <Text style={styles.successText}>
          ✅ {count} {item.name}
          {count > 1 ? "s" : ""} in cart
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...GlobalStyles.containerCenter,
    backgroundColor: Colors.light,
    padding: Spacing.xxl,
  },
  image: {
    width: 220,
    height: 220,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.lg,
    resizeMode: "cover",
    backgroundColor: Colors.grayLight,
    ...Shadows.medium,
  },
  title: {
    ...GlobalStyles.heading,
    textAlign: "center",
    color: Colors.dark,
  },
  price: {
    ...GlobalStyles.textXLarge,
    color: Colors.secondary,
    textAlign: "center",
    marginBottom: Spacing.lg,
  },
  button: {
    backgroundColor: Colors.secondary,
    paddingVertical: Spacing.base,
    paddingHorizontal: Spacing.xxl,
    borderRadius: BorderRadius.round,
    alignItems: "center",
    justifyContent: "center",
    marginTop: Spacing.md,
    ...Shadows.light,
  },
  buttonText: {
    ...GlobalStyles.buttonText,
    fontSize: 18,
    fontWeight: "bold",
  },
  successText: {
    marginTop: Spacing.lg,
    fontSize: 16,
    color: Colors.success,
    textAlign: "center",
    fontWeight: "500",
  },
  errorText: {
    ...GlobalStyles.heading,
    color: Colors.danger,
    textAlign: "center",
  },
  errorSubtext: {
    ...GlobalStyles.text,
    color: Colors.textLight,
    textAlign: "center",
    marginTop: Spacing.base,
  },
});

export default DetailsScreen;
