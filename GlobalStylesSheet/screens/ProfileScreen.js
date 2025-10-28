// screens/ProfileScreen.js
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";

const ProfileScreen = ({ navigation }) => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: "center", paddingBottom: 30 }}
    >
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>⬅️ Back</Text>
      </TouchableOpacity>

      {/* Profile Header */}
      <View style={styles.header}>
        <Image
          source={require("../assets/profile.jpg")}
          style={styles.avatar}
        />
        <Text style={styles.name}>Filinta Aqsa</Text>
        <Text style={styles.email}>filinta@example.com</Text>
      </View>

      {/* Info Section */}
      <View style={styles.infoContainer}>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Total Orders</Text>
          <Text style={styles.infoValue}>12</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Cart Items</Text>
          <Text style={styles.infoValue}>3</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Wishlist</Text>
          <Text style={styles.infoValue}>5</Text>
        </View>
      </View>

      {/* Buttons */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Cart")}
      >
        <Text style={styles.buttonText}>🛒 View Cart</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.logoutButton]}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF5E6",
  },
  backButton: {
    alignSelf: "flex-start",
    marginLeft: 15,
    marginTop: 15,
    marginBottom: 10,
  },
  backText: {
    fontSize: 16,
    color: "#FF6F61",
    fontWeight: "bold",
  },
  header: {
    marginTop: 10,
    alignItems: "center",
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FF6F61",
  },
  email: {
    fontSize: 16,
    color: "#555",
  },
  infoContainer: {
    width: "90%",
    marginBottom: 30,
  },
  infoCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    elevation: 2,
    alignItems: "center",
  },
  infoTitle: {
    fontSize: 16,
    color: "#7a8ca0",
  },
  infoValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF6F61",
    marginTop: 5,
  },
  button: {
    backgroundColor: "#FF6F61",
    width: "80%",
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: "#FF6F61",
  },
  logoutText: {
    color: "#FF6F61",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProfileScreen;
