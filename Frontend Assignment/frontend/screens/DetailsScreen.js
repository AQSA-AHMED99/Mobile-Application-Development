import React, { useState } from "react";
import { View, Text, Image, Button, StyleSheet, Alert } from "react-native";
import { useCart } from "../context/CartContext";
import GlobalStyles, { Colors, Spacing, BorderRadius } from "../styles/GlobalStyles";

const DetailsScreen = ({ route }) => {
  // ✅ Validate route
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

  // ✅ Handle Add to Cart
  const handleAddToCart = () => {
    try {
      addToCart(item);
      const newCount = count + 1;
      setCount(newCount);

      Alert.alert(
        "Added to Cart ✅",
        `${newCount} ${item.name}${newCount > 1 ? "s" : ""} added successfully!`
      );
    } catch (error) {
      Alert.alert("Error", "Failed to add item to cart");
      console.log("Add to cart error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={item.image}
        style={styles.image}
        onError={() => console.log("Image failed to load:", item.name)}
      />
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.price}>{item.price}</Text>

      <Button
        title={count > 0 ? `Add More (${count})` : "Add to Cart"}
        onPress={handleAddToCart}
        color={count > 0 ? Colors.success : Colors.secondary}
      />

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
    padding: Spacing.xl,
    backgroundColor: Colors.light,
  },
  image: {
    width: 220,
    height: 220,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.lg,
    resizeMode: "cover",
    backgroundColor: Colors.grayLight,
  },
  title: {
    ...GlobalStyles.heading,
    textAlign: "center",
    marginBottom: Spacing.sm,
  },
  price: {
    ...GlobalStyles.textXLarge,
    color: Colors.secondary,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: Spacing.lg,
  },
  successText: {
    marginTop: Spacing.lg,
    ...GlobalStyles.text,
    color: Colors.success,
    fontWeight: "500",
    textAlign: "center",
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
