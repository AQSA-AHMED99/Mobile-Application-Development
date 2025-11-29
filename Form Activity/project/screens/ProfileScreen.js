import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function ProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={{ uri: "https://cdn-icons-png.flaticon.com/512/2922/2922510.png" }}
          style={styles.profileImage}
        />

        <Text style={styles.name}>User Profile</Text>
        <Text style={styles.subText}>Welcome to your Profile Screen! 🙂</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>⬅ Go Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f4f7",
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    width: "90%",
    padding: 25,
    alignItems: "center",
    borderRadius: 20,
    elevation: 10, // shadow for android
    shadowColor: "#000", // shadow for iOS
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 10 },
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 60,
    marginBottom: 15,
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 5,
  },
  subText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#0096FF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});
