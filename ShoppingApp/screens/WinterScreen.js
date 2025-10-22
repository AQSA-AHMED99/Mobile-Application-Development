// screens/WinterScreen.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

const WinterScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>⬅️ Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>❄️ Winter Collection</Text>
      </View>

      {/* Content Area */}
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Added spacing container */}
        <View style={styles.spacing} />
        
        <View style={styles.cardsContainer}>
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("Pret")}>
            <View style={styles.cardContent}>
              <Text style={styles.cardIcon}>👗</Text>
              <Text style={styles.cardText}>Pret Collection</Text>
              <Text style={styles.cardArrow}>→</Text>
            </View>
            <Text style={styles.cardSubtitle}>Ready-to-wear winter outfits</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("Unstitched")}>
            <View style={styles.cardContent}>
              <Text style={styles.cardIcon}>🧵</Text>
              <Text style={styles.cardText}>Unstitched Collection</Text>
              <Text style={styles.cardArrow}>→</Text>
            </View>
            <Text style={styles.cardSubtitle}>Customizable winter fabrics</Text>
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
    backgroundColor: "#F0F8FF",
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 25,
    paddingBottom: 25,
    backgroundColor: "#F0F8FF",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: "#1E90FF",
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
    color: "#1E90FF",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1E90FF",
    textAlign: "center",
    textShadowColor: "rgba(30, 144, 255, 0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 25,
  },
  // Added spacing between title and cards
  spacing: {
    height: 30, // Increased space between title and cards
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
    shadowColor: "#1E90FF",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#1E90FF",
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
    color: "#1E3A8A",
    fontSize: 20,
    fontWeight: "700",
    flex: 1,
  },
  cardArrow: {
    fontSize: 20,
    color: "#1E90FF",
    fontWeight: "bold",
  },
  cardSubtitle: {
    color: "#64748B",
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 36, // Align with text (icon width + margin)
  },
  bottomSpacing: {
    height: 20,
  },
});

export default WinterScreen;