import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import * as Font from "expo-font";
import GlobalStyles, { Colors, Spacing, BorderRadius } from "../styles/GlobalStyles";

const HomeScreen = ({ navigation }) => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [fontError, setFontError] = useState(false);

  // Load custom fonts safely
  const loadFonts = async () => {
    try {
      await Font.loadAsync({
        Alice: require("../../assets/fonts/Alice.ttf"),
        Darling: require("../../assets/fonts/Darling.ttf"),
      });
      setFontLoaded(true);
    } catch (error) {
      console.log("Font loading error:", error);
      setFontError(true);
      setFontLoaded(true);
    }
  };

  useEffect(() => {
    loadFonts();
  }, []);

  // Show loader while fonts are loading
  if (!fontLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.secondary} />
        <Text style={{ color: Colors.textLight, marginTop: Spacing.base }}>
          Loading...
        </Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("../../assets/bgfood.jpg")}
      style={styles.background}
      blurRadius={2}
    >
      <View style={styles.overlay}>
        {/* Logo */}
        <Image
          source={require("../../assets/llogo.png")}
          style={styles.logo}
        />

        {/* App Title */}
        <Text style={styles.title}>TastyTrails</Text>
        <Text style={styles.subtitle}>
          Fresh, Fast, and Delicious — Delivered to You!
        </Text>

        {/* Browse Menu Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Menu")}
        >
          <Text style={styles.buttonText}>Browse Menu</Text>
        </TouchableOpacity>

        {/* Warning for fallback fonts */}
        {fontError && (
          <Text style={styles.warningText}>
            ⚠️ Custom fonts not loaded — using system fonts
          </Text>
        )}
      </View>
    </ImageBackground>
  );
};

// Styles
const styles = StyleSheet.create({
  loadingContainer: {
    ...GlobalStyles.loadingContainer,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    backgroundColor: Colors.overlay,
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.xl,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: BorderRadius.circle,
    marginBottom: Spacing.lg,
    borderWidth: 2,
    borderColor: Colors.white,
  },
  title: {
    fontSize: 38,
    color: Colors.white,
    marginBottom: Spacing.base,
    textAlign: "center",
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    fontFamily: "Darling",
  },
  subtitle: {
    fontSize: 18,
    color: Colors.light,
    textAlign: "center",
    marginBottom: Spacing.xxl,
    paddingHorizontal: Spacing.lg,
  },
  button: {
    ...GlobalStyles.buttonSecondary,
    paddingVertical: Spacing.base,
    paddingHorizontal: Spacing.xxl,
    borderRadius: BorderRadius.round,
  },
  buttonText: {
    ...GlobalStyles.buttonText,
    fontSize: 20,
    fontFamily: "Alice",
  },
  warningText: {
    position: "absolute",
    bottom: 20,
    fontSize: 12,
    color: Colors.warning,
    textAlign: "center",
    paddingHorizontal: Spacing.base,
  },
});

export default HomeScreen;
