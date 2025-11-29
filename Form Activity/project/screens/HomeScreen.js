import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  ImageBackground
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // icons added

export default function HomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={{ uri: "https://i.ibb.co/SfyRR3H/bg.jpg" }}
      style={styles.bg}
      blurRadius={2}
    >
      <StatusBar barStyle="light-content" />

      <View style={styles.card}>
        <Text style={styles.title}>Welcome 👋</Text>
        <Text style={styles.subTitle}>Explore the App</Text>
      </View>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("Profile")}
      >
        <Ionicons name="person-circle-outline" size={28} color="#fff" />
        <Text style={styles.btnText}>Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("Form")}
      >
        <Ionicons name="create-outline" size={28} color="#fff" />
        <Text style={styles.btnText}>Fill Form</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 20,
    borderRadius: 15,
    marginBottom: 40,
    alignItems: "center",
    width: "80%"
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff"
  },
  subTitle: {
    fontSize: 18,
    color: "#ddd",
    marginTop: 5
  },
  btn: {
    flexDirection: "row",
    backgroundColor: "#0096FF",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginTop: 20,
    alignItems: "center",
    width: "70%",
    justifyContent: "center",
    gap: 10
  },
  btnText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600"
  }
});
