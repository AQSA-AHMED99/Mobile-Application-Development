// screens/HomeScreen.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";

const HomeScreen = ({ navigation }) => {
  const cards = [
    { id: 1, label: "❄️ Winter", image: require("../assets/winter.jpg"), route: "Winter" },
    { id: 2, label: "🌞 Summer", image: require("../assets/summer.jpg"), route: "Summer" },
    { id: 3, label: "🔥 Sale", image: require("../assets/sale.jpg"), route: "Sale" },
    { id: 4, label: "💐 Perfumes", image: require("../assets/perfume.jpg"), route: "Perfumes" },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#E3F2FD" }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>🛍️ Shopping App</Text>

        {cards.map((card) => (
          <TouchableOpacity
            key={card.id}
            style={styles.card}
            onPress={() => navigation.navigate(card.route)}
          >
            <Image source={card.image} style={styles.cardImage} resizeMode="cover" />
            <Text style={styles.label}>{card.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate("Home")}>
          <Text style={styles.navText}>🏠{"\n"}Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate("Cart")}>
          <Text style={styles.navText}>🛒{"\n"}Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate("Categories")}>
          <Text style={styles.navText}>📂{"\n"}Categories</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate("Profile")}>
          <Text style={styles.navText}>👤{"\n"}Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingVertical: 20, alignItems: "center" },
  header: { fontSize: 32, fontWeight: "bold", color: "#FF6F61", marginBottom: 20 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    width: "85%", // slightly narrower
    marginBottom: 15,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    padding: 8, // smaller padding
  },
  cardImage: {
    width: "100%",
    height: 100, // smaller image
    borderRadius: 10,
    marginBottom: 8,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF6F61",
    textAlign: "center",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  navButton: { alignItems: "center" },
  navText: { textAlign: "center", fontSize: 14, fontWeight: "bold", color: "#FF6F61" },
});

export default HomeScreen;
