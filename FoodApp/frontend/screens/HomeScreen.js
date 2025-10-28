import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
  ActivityIndicator,
} from "react-native";
import * as Font from "expo-font";
import GlobalStyles, { Colors, Spacing, BorderRadius } from "../styles/GlobalStyles";

const HomeScreen = ({ navigation }) => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [fontError, setFontError] = useState(false);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  // Load custom fonts
  const loadFonts = async () => {
    try {
      await Font.loadAsync({
        Alice: require("../../assets/fonts/Alice.ttf"),
        Darling: require("../../assets/fonts/Darling.ttf"),
      });
    } catch (error) {
      console.warn("Font loading error:", error);
      setFontError(true);
    } finally {
      setFontLoaded(true);
    }
  };

  useEffect(() => {
    loadFonts();
  }, []);

  // Start animation once fonts are loaded
  useEffect(() => {
    if (fontLoaded) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [fontLoaded]);

  // Show loader while fonts load
  if (!fontLoaded) {
    return (
      <View style={GlobalStyles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.secondary} />
        <Text style={{ color: Colors.textLight, marginTop: Spacing.base }}>Loading...</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("../../assets/bgfood.jpg")}
      style={[styles.background, { backgroundColor: Colors.dark }]} // fallback bg
      blurRadius={2}
    >
      <View style={styles.overlay}>
        <Animated.View
          style={{
            alignItems: "center",
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          {/* App Logo */}
          <Image
            source={require("../../assets/llogo.png")}
            style={styles.logo}
          />

          {/* Title */}
          <Text style={styles.title}>TastyTrails</Text>

          {/* Subtitle */}
          <Text style={styles.subtitle}>
            Fresh, Fast, and Delicious — Delivered to You!
          </Text>

          {/* Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Menu")}
          >
            <Text style={styles.buttonText}>Browse Menu</Text>
          </TouchableOpacity>

          {/* Font Warning */}
          {fontError && (
            <Text style={styles.warningText}>
              Note: Custom fonts not loaded. Using system fonts.
            </Text>
          )}
        </Animated.View>
      </View>
    </ImageBackground>
  );
};

// 🧭 Styles
const styles = StyleSheet.create({
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
    width: 110,
    height: 110,
    borderRadius: BorderRadius.circle,
    marginBottom: Spacing.lg,
    borderWidth: 2,
    borderColor: Colors.white,
  },
  title: {
    fontSize: 40,
    color: Colors.white,
    marginBottom: Spacing.sm,
    textAlign: "center",
    textShadowColor: "rgba(0,0,0,0.4)",
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 6,
    fontFamily: "Darling",
  },
  subtitle: {
    fontSize: 18,
    color: Colors.light,
    textAlign: "center",
    marginBottom: Spacing.xxl,
    paddingHorizontal: Spacing.lg,
    fontFamily: "Alice",
  },
  button: {
    ...GlobalStyles.buttonSecondary,
    backgroundColor: Colors.secondary,
    paddingVertical: Spacing.base,
    paddingHorizontal: Spacing.xxl,
    borderRadius: BorderRadius.round,
    elevation: 5,
  },
  buttonText: {
    ...GlobalStyles.buttonText,
    fontSize: 20,
    fontFamily: "Alice",
    textTransform: "uppercase",
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
