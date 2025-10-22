// screens/WomenPerfumeScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
} from "react-native";

const WomenPerfumeScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const fadeAnim = useState(new Animated.Value(0))[0];

  const products = [
    { id: 1, name: "Chanel No. 5", price: "13000PKR", image: require("../assets/chanel5.jpg") },
    { id: 2, name: "Gucci Bloom", price: "15000PKR", image: require("../assets/guccibloom.webp") },
    { id: 3, name: "Dior J'adore", price: "12000PKR", image: require("../assets/diorjadore.jpg") },
    { id: 4, name: "YSL Black Opium", price: "35000PKR", image: require("../assets/yslblackopium.jpg") },
    { id: 5, name: "Versace Bright Crystal", price: "7000PKR", image: require("../assets/versacebrightcrystal.webp") },
    { id: 6, name: "V-Bombshell", price: "12000PKR", image: require("../assets/victoriasecretbombshell.webp") },
  ];

  const showSuccessMessage = (productName) => {
    setSuccessMessage(`${productName} added to cart!`);
    setShowSuccess(true);
    
    // Reset animation and fade in
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Auto hide after 2 seconds
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setShowSuccess(false);
      });
    }, 2000);
  };

  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    
    showSuccessMessage(product.name);
  };

  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>⬅️ Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>🌸 Women Perfumes</Text>
        
        {/* Cart Icon with Badge */}
        <TouchableOpacity 
          style={styles.cartIcon} 
          onPress={() => navigation.navigate("Cart", { cartItems })}
        >
          <Text style={styles.cartIconText}>🛒</Text>
          {getCartCount() > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{getCartCount()}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Success Message - Always render but control opacity */}
      <Animated.View 
        style={[
          styles.successMessage, 
          { 
            opacity: fadeAnim,
            display: showSuccess ? 'flex' : 'none'
          }
        ]}
      >
        <Text style={styles.successText}>✓ {successMessage}</Text>
      </Animated.View>

      {/* Products Grid */}
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.grid}>
          {products.map((item) => (
            <View key={item.id} style={styles.card}>
              <Image source={item.image} style={styles.image} />
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>{item.price}</Text>
              <TouchableOpacity 
                style={styles.cartButton}
                onPress={() => addToCart(item)}
              >
                <Text style={styles.cartText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF0F5",
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 25,
    paddingBottom: 20,
    backgroundColor: "#FFF0F5",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#FF69B4",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },
  backButton: {
    flex: 1,
  },
  backText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FF69B4",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF69B4",
    textAlign: "center",
    flex: 2,
  },
  cartIcon: {
    flex: 1,
    alignItems: "flex-end",
    position: "relative",
  },
  cartIconText: {
    fontSize: 24,
  },
  cartBadge: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "#FF69B4",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cartBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  successMessage: {
    backgroundColor: "#4CAF50",
    padding: 15,
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    position: 'absolute',
    top: 120,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  successText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 15,
    paddingTop: 20,
    marginTop: 10, // Add space for success message
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    elevation: 6,
    width: "48%",
    marginBottom: 15,
    alignItems: "center",
    padding: 15,
    shadowColor: "#FF69B4",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginBottom: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
    textAlign: "center",
    color: "#333",
  },
  price: {
    fontSize: 13,
    color: "#FF69B4",
    marginVertical: 5,
    fontWeight: "600",
  },
  cartButton: {
    backgroundColor: "#FF69B4",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginTop: 5,
    elevation: 3,
    shadowColor: "#FF69B4",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  cartText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  bottomSpacing: {
    height: 20,
  },
});

export default WomenPerfumeScreen;