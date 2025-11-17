// frontend/screens/ProfileScreen.js

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import GlobalStyles, {
  Colors,
  Spacing,
  BorderRadius,
  Shadows,
} from "../styles/GlobalStyles";

const ProfileScreen = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🧠 Async/Await + Promise to simulate profile data fetch
  const fetchProfileData = async () => {
    try {
      console.log("Fetching profile data...");
      await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate delay
      const data = {
        name: "Eman Idress",
        email: "filinta@gmail.com",
        totalOrders: 12,
        favoriteCuisine: "Italian 🍝",
        memberSince: "2024",
      };
      setProfile(data);
      console.log("Profile data loaded successfully");
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      Alert.alert("Error", "Failed to load profile info");
    } finally {
      setLoading(false);
    }
  };

  // ⏱️ Load data once
  useEffect(() => {
    fetchProfileData();
  }, []);

  // 💾 Simulate Save/Edit with a Promise
  const handleEditProfile = () => {
    const updateProfile = new Promise((resolve) => {
      setTimeout(() => resolve("Profile updated successfully ✅"), 1500);
    });

    updateProfile.then((msg) => Alert.alert("Success", msg));
  };

  const handleLogout = () => {
    Alert.alert("Logged Out", "You have been successfully logged out.");
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loaderContainer]}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Loading your profile...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 🌈 Gradient Header */}
      <LinearGradient colors={["#4facfe", "#00f2fe"]} style={styles.header}>
        <Image
          source={require("../../assets/profile.jpg")} // 👤 your image
          style={styles.avatar}
        />
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.email}>{profile.email}</Text>
      </LinearGradient>

      {/* 📊 Info Section */}
      <View style={styles.infoContainer}>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Total Orders</Text>
          <Text style={styles.infoValue}>{profile.totalOrders}</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Favorite Cuisine</Text>
          <Text style={styles.infoValue}>{profile.favoriteCuisine}</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Member Since</Text>
          <Text style={styles.infoValue}>{profile.memberSince}</Text>
        </View>
      </View>

      {/* 🧩 Buttons */}
      <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.logoutButton]}
        onPress={handleLogout}
      >
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light,
  },
  loaderContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: Spacing.md,
    color: Colors.textMuted,
    fontSize: 16,
  },
  header: {
    height: 200,
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
    fontFamily: "Poppins-Bold",
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
