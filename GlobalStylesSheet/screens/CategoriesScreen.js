// screens/CategoriesScreen.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

const CategoriesScreen = ({ navigation }) => {
  const categories = [
    { id: 1, name: "Winter Collection", route: "Winter" },
    { id: 2, name: "Summer Collection", route: "Summer" },
    { id: 3, name: "Sale Items", route: "Sale" },
    { id: 4, name: "Perfumes", route: "Perfumes" },
  ];

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>⬅️ Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>📂 Categories</Text>
      </View>

      {/* Categories List */}
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={styles.categoryCard}
            onPress={() => navigation.navigate(cat.route)}
          >
            <Text style={styles.categoryText}>{cat.name}</Text>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>
        ))}
        
        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3F2FD",
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "#E3F2FD",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  backText: {
    fontSize: 16,
    color: "#1565C0",
    fontWeight: "600",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1565C0",
    textAlign: "center",
    marginBottom: 10,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 25,
    paddingTop: 10,
  },
  categoryCard: {
    backgroundColor: "#fff",
    padding: 22,
    borderRadius: 16,
    width: "100%",
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#1565C0",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
  },
  categoryText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    flex: 1,
  },
  arrow: {
    fontSize: 20,
    color: "#1565C0",
    fontWeight: "bold",
  },
  bottomSpacing: {
    height: 20,
  },
});

export default CategoriesScreen;