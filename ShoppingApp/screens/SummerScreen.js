// screens/SummerScreen.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

const SummerScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>⬅️ Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>🌞 Summer Collection</Text>
      </View>

      {/* Content Area */}
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Added spacing between title and cards */}
        <View style={styles.spacing} />
        
        <View style={styles.cardsContainer}>
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("Pret")}>
            <View style={styles.cardContent}>
              <Text style={styles.cardIcon}>👗</Text>
              <Text style={styles.cardText}>Pret Collection</Text>
              <Text style={styles.cardArrow}>→</Text>
            </View>
            <Text style={styles.cardSubtitle}>Light & breezy ready-to-wear</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("Unstitched")}>
            <View style={styles.cardContent}>
              <Text style={styles.cardIcon}>🧵</Text>
              <Text style={styles.cardText}>Unstitched Collection</Text>
              <Text style={styles.cardArrow}>→</Text>
            </View>
            <Text style={styles.cardSubtitle}>Breathable summer fabrics</Text>
          </TouchableOpacity>
        </View>
        
        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF9E6",
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 25,
    paddingBottom: 25,
    backgroundColor: "#FFF9E6",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: "#FFA500",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 15,
  },
  backText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FF8C00",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FF8C00",
    textAlign: "center",
    textShadowColor: "rgba(255, 140, 0, 0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 25,
  },
  // Added spacing between title and cards
  spacing: {
    height: 30,
  },
  cardsContainer: {
    width: "100%",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    width: "100%",
    padding: 25,
    marginBottom: 20,
    elevation: 6,
    shadowColor: "#FFA500",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#FFA500",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  cardIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  cardText: {
    color: "#B45309",
    fontSize: 20,
    fontWeight: "700",
    flex: 1,
  },
  cardArrow: {
    fontSize: 20,
    color: "#FF8C00",
    fontWeight: "bold",
  },
  cardSubtitle: {
    color: "#92400E",
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 36, // Align with text (icon width + margin)
  },
  bottomSpacing: {
    height: 20,
  },
});

export default SummerScreen;