import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import GlobalStyles, {
  Colors,
  Spacing,
  BorderRadius,
  Shadows,
} from "../styles/GlobalStyles";

// ✅ Callback concept (Higher-Order Function)
const showWelcomeMessage = (callback) => {
  console.log("Preparing welcome message...");
  setTimeout(() => {
    callback("👋 Welcome to the Menu! Your food is loading...");
  }, 500);
};

const foodItems = [
  { id: "1", name: "Cheese Pizza", price: "Rs.2500", image: require("../../assets/cheesepza.jpg") },
  { id: "2", name: "Veggie Burger", price: "Rs.640", image: require("../../assets/vegieburger.jpg") },
  { id: "3", name: "Pasta Alfredo", price: "Rs.560", image: require("../../assets/alfradopasta.jpg") },
  { id: "4", name: "Grilled Sandwich", price: "Rs.400", image: require("../../assets/grilledsandwitch.jpg") },
  { id: "5", name: "Chicken Biryani", price: "Rs.850", image: require("../../assets/chickenbiryani.jpg") },
  { id: "6", name: "Beef Burger", price: "Rs.720", image: require("../../assets/beefburger.webp") },
  { id: "7", name: "Crispy Fries", price: "Rs.280", image: require("../../assets/fries.webp") },
  { id: "8", name: "Fried Chicken", price: "Rs.950", image: require("../../assets/friedchicken.avif") },
  { id: "9", name: "Chocolate Shake", price: "Rs.450", image: require("../../assets/chocolateshake.jpg") },
  { id: "10", name: "Cold Coffee", price: "Rs.380", image: require("../../assets/coldcoffee.avif") },
  { id: "11", name: "Chicken Pasta", price: "Rs.600", image: require("../../assets/chickenpasta.webp") },
  { id: "12", name: "Club Sandwich", price: "Rs.550", image: require("../../assets/clubsandwich.jpg") },
  { id: "13", name: "Chicken Wrap", price: "Rs.520", image: require("../../assets/chickenwrap.jpg") },
  { id: "14", name: "Tandoori Pizza", price: "Rs.2300", image: require("../../assets/tandooripizza.jpg") },
  { id: "15", name: "Ice Cream Sundae", price: "Rs.460", image: require("../../assets/icecreamsundae.jpg") },
  { id: "16", name: "Garlic Bread", price: "Rs.300", image: require("../../assets/garlicbread.webp") },
  { id: "17", name: "Chicken Nuggets", price: "Rs.420", image: require("../../assets/chickennuggets.jpg") },
  { id: "18", name: "Caesar Salad", price: "Rs.480", image: require("../../assets/caesarsalad.jpg") },
  { id: "19", name: "Mango Smoothie", price: "Rs.390", image: require("../../assets/mangosmoothie.jpg") },
  { id: "20", name: "Brownie with Ice Cream", price: "Rs.550", image: require("../../assets/brownieicecream.webp") },
];

const MenuScreen = ({ navigation }) => {
  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Simulate Asynchronous Data Loading
  useEffect(() => {
    showWelcomeMessage((msg) => Alert.alert("Welcome", msg)); // Callback concept
    console.log("Loading menu items...");
    const timer = setTimeout(() => {
      setMenuData(foodItems);
      setLoading(false);
      console.log("Menu loaded successfully!");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // ✅ Render a single food card
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={() => navigation.navigate("Details", { item })}
    >
      <Image
        source={item.image}
        style={styles.image}
        onError={() => console.log(`Image failed to load for ${item.name}`)}
      />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  // ✅ Show loading spinner while data loads
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Loading delicious items...</Text>
      </View>
    );
  }

  // ✅ After loading, show menu
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🍽️ Menu</Text>
      <FlatList
        data={menuData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: Spacing.lg }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grayLight,
    paddingHorizontal: Spacing.sm,
    paddingTop: Spacing.base,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.light,
  },
  loadingText: {
    ...GlobalStyles.textLarge,
    color: Colors.textMuted,
    marginTop: Spacing.md,
  },
  title: {
    ...GlobalStyles.heading,
    textAlign: "center",
    marginBottom: Spacing.sm,
    color: Colors.primary,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: Spacing.sm,
  },
  card: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    marginHorizontal: Spacing.xs,
    padding: Spacing.sm,
    alignItems: "center",
    ...Shadows.light,
  },
  image: {
    width: 130,
    height: 110,
    borderRadius: BorderRadius.base,
    marginBottom: Spacing.sm,
    backgroundColor: Colors.light,
  },
  textContainer: {
    alignItems: "center",
  },
  name: {
    ...GlobalStyles.textLarge,
    textAlign: "center",
    fontWeight: "700",
    color: Colors.text,
  },
  price: {
    ...GlobalStyles.text,
    color: Colors.secondary,
    fontWeight: "600",
    marginTop: Spacing.xs,
  },
});

export default MenuScreen;
