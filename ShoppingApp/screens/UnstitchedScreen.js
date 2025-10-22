// screens/UnstitchedScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Animated,
} from "react-native";
import * as Font from "expo-font";

const UnstitchedScreen = ({ navigation }) => {
  const [loaded, setLoaded] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        Alice: require("../assets/fonts/Alice.ttf"),
      });
      setLoaded(true);
    }
    loadFont();
  }, []);

  if (!loaded) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#FF6F61" />
      </View>
    );
  }

  const products = [
    { id: 1, name: "Lawn 3-Piece Unstitched", price: "5000PKR", image: require("../assets/lawn3piece.jpg") },
    { id: 2, name: "Linen 2-Piece Unstitched", price: "4500PKR", image: require("../assets/linen2piece.jpg") },
    { id: 3, name: "Khaadi Unstitched", price: "3500PKR", image: require("../assets/khadiunstiched.jpg") },
    { id: 4, name: "Bonanza Unstitched", price: "7900PKR", image: require("../assets/bonanzaunstiched.jpg") },
    { id: 5, name: "Sheen Unstitched", price: "1200PKR", image: require("../assets/sheenunstiched.jpg") },
    { id: 6, name: "Sapphire Unstitched", price: "7000PKR", image: require("../assets/sapphireunstiched.jpg") },
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
        <Text style={styles.title}>🧵 Unstitched Collection</Text>
        
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

      {/* Success Message */}
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
                <Text style={styles.cartText}>🛒 Add to Cart</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        
        {/* Bottom spacing to prevent last row from sticking to bottom */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E3F2FD",
  },
  container: {
    flex: 1,
    backgroundColor: "#E3F2FD",
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 25,
    paddingBottom: 20,
    backgroundColor: "#E3F2FD",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#FF6F61",
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
    color: "#FF6F61",
  },
  title: {
    fontSize: 24,
    color: "#FF6F61",
    marginBottom: 10,
    fontFamily: "Alice",
    textAlign: "center",
    fontWeight: "bold",
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
    backgroundColor: "#FF6F61",
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
    marginTop: 10,
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
    width: "48%",
    marginBottom: 15,
    alignItems: "center",
    padding: 12,
    elevation: 4,
    shadowColor: "#FF6F61",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 4,
    textAlign: "center",
    color: "#333",
  },
  price: {
    fontSize: 12,
    color: "#FF6F61",
    marginVertical: 4,
    fontWeight: "600",
  },
  cartButton: {
    backgroundColor: "#20B2AA",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 4,
    elevation: 2,
    shadowColor: "#20B2AA",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
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

export default UnstitchedScreen;