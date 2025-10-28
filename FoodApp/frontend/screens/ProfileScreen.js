// frontend/screens/ProfileScreen.js

import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import GlobalStyles, { Colors, Spacing, BorderRadius, Shadows } from "../styles/GlobalStyles";

const ProfileScreen = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Gradient Header */}
      <LinearGradient colors={["#4facfe", "#00f2fe"]} style={styles.header}>
        <Image
          source={require("../../assets/profile.jpg")} // 👤 Add your own image
          style={styles.avatar}
        />
        <Text style={styles.name}>Filinta Aqsa</Text>
        <Text style={styles.email}>filinta@example.com</Text>
      </LinearGradient>

      {/* Info Section */}
      <View style={styles.infoContainer}>
        {[
          { title: "Total Orders", value: "12" },
          { title: "Favorite Cuisine", value: "Italian 🍝" },
          { title: "Member Since", value: "2024" },
        ].map((info, index) => (
          <View key={index} style={styles.infoCard}>
            <Text style={styles.infoTitle}>{info.title}</Text>
            <Text style={styles.infoValue}>{info.value}</Text>
          </View>
        ))}
      </View>

      {/* Buttons */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Edit Profile</Text>
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
    backgroundColor: Colors.light 
  },
  header: {
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: BorderRadius.xl,
    borderBottomRightRadius: BorderRadius.xl,
    ...Shadows.medium,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: BorderRadius.circle,
    borderWidth: 3,
    borderColor: Colors.white,
    marginBottom: Spacing.base,
  },
  name: {
    fontSize: 24,
    fontFamily: "Poppins-Bold", // if your custom font is loaded globally
    color: Colors.white,
    marginTop: Spacing.xs,
  },
  email: {
    fontSize: 16,
    color: Colors.light,
    opacity: 0.9,
    fontFamily: "Poppins-Regular",
  },
  infoContainer: {
    marginTop: Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },
  infoCard: {
    backgroundColor: Colors.white,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.base,
    ...Shadows.light,
  },
  infoTitle: {
    ...GlobalStyles.text,
    color: Colors.textMuted,
    fontFamily: "Poppins-Regular",
  },
  infoValue: {
    ...GlobalStyles.textLarge,
    fontWeight: "bold",
    color: Colors.secondaryDark,
    fontFamily: "Poppins-SemiBold",
  },
  button: {
    ...GlobalStyles.buttonSecondary,
    marginHorizontal: Spacing.xxl,
    marginTop: Spacing.lg,
    paddingVertical: Spacing.base,
    borderRadius: BorderRadius.xxl,
  },
  buttonText: {
    ...GlobalStyles.buttonText,
  },
  logoutButton: {
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: Colors.secondary,
  },
  logoutText: {
    color: Colors.secondary,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProfileScreen;
