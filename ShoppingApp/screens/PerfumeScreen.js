// screens/PerfumeScreen.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";

const PerfumeScreen = ({ navigation }) => {
  const cards = [
    { id: 1, label: "👔 Men", image: require("../assets/men_perfume.jpg"), route: "Men Perfume" },
    { id: 2, label: "🌸 Women", image: require("../assets/women_perfume.jpeg"), route: "Women Perfume" },
  ];

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>⬅️ Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>💐 Perfume Collection</Text>
      </View>

      {/* Content Area */}
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.grid}>
          {cards.map((card) => (
            <TouchableOpacity
              key={card.id}
              style={styles.card}
              onPress={() => navigation.navigate(card.route)}
            >
              <Image source={card.image} style={styles.image} resizeMode="cover" />
              <Text style={styles.label}>{card.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Bottom spacing adjustment */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#F3E8FF",
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "#F3E8FF",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backButton: { 
    alignSelf: "flex-start", 
    marginBottom: 15 
  },
  backText: { 
    fontSize: 16, 
    fontWeight: "600", 
    color: "#6A0DAD" 
  },
  title: { 
    fontSize: 28, 
    fontWeight: "bold", 
    color: "#6A0DAD", 
    textAlign: "center",
    marginBottom: 10,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 25,
  },
  grid: { 
    width: "100%", 
    alignItems: "center",
    paddingTop: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    width: "100%",
    maxWidth: 320,
    alignItems: "center",
    paddingVertical: 25,
    paddingHorizontal: 20,
    marginBottom: 20,
    elevation: 8,
    shadowColor: "#6A0DAD",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
  },
  image: { 
    width: 150, 
    height: 150, 
    borderRadius: 12, 
    marginBottom: 15 
  },
  label: { 
    fontSize: 20, 
    fontWeight: "700", 
    color: "#6A0DAD",
    textAlign: "center",
  },
  bottomSpacing: {
    height: 20, // Prevents last card from sticking to bottom
  },
});

export default PerfumeScreen;