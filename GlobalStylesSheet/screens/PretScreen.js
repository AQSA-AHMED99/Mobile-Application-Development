// screens/PretScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Animated,
} from "react-native";
import * as Font from "expo-font";

const PretScreen = ({ navigation }) => {
  const [loaded, setLoaded] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const fadeAnim = useState(new Animated.Value(0))[0];

  // Load Alice font
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
    { id: 1, name: "Embroidered Pret Shirt", price: "5000PKR", image: require("../assets/EmbroideredPretShirt.jpg") },
    { id: 2, name: "Formal Pret Suit", price: "6500PKR", image: require("../assets/FormalPretSuit.jpg") },
    { id: 3, name: "Casual Printed Pret", price: "4500PKR", image: require("../assets/CasualPrintedPret.jpg") },
    { id: 4, name: "Luxury Pret Gown", price: "8900PKR", image: require("../assets/LuxuryPretGown.jpg") },
    { id: 5, name: "Party Pret Kurta", price: "6000PKR", image: require("../assets/PartyPretKurta.jpg") },
    { id: 6, name: "Simple Everyday Pret", price: "2900PKR", image: require("../assets/SimpleEverydayPret.jpg") },
    { id: 7, name: "Cotton Pret Frock", price: "9000PKR", image: require("../assets/CottonPretFrock.jpg") },
    { id: 8, name: "Lawn Pret 2-Piece", price: "8988PKR", image: require("../assets/LawnPret2Piece.jpg") },
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

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} resizeMode="cover" />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>{item.price}</Text>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => addToCart(item)}
      >
        <Text style={styles.buttonText}>🛒 Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>⬅️ Back</Text>
        </TouchableOpacity>
        <Text style={styles.heading}>✨ Pret Collection</Text>
        
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
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.flatListContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff8f0",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff8f0",
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 25,
    paddingBottom: 20,
    backgroundColor: "#fff8f0",
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
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FF6F61",
    fontFamily: "Alice",
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
  flatListContent: {
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 20,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 15,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    width: "48%",
    padding: 12,
    elevation: 4,
    shadowColor: "#FF6F61",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    alignItems: "center",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginBottom: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    color: "#333",
    marginBottom: 4,
  },
  price: {
    fontSize: 13,
    color: "#FF6F61",
    fontWeight: "600",
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#FF6F61",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    elevation: 3,
    shadowColor: "#FF6F61",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
});

export default PretScreen;