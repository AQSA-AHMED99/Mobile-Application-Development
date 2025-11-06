// frontend/navigation/AppNavigator.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

// Screens
import HomeScreen from "../screens/HomeScreen";
import MenuScreen from "../screens/MenuScreen";
import DetailsScreen from "../screens/DetailsScreen";
import CartScreen from "../screens/CartScreen";
import ProfileScreen from "../screens/ProfileScreen";
import AsyncStorageScreen from "../screens/AsyncStorageScreen"; 

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// 🧩 Stack Navigator for Menu + Details
function MenuStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Menu"
        component={MenuScreen}
        options={{ title: "Menu 🍕" }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ title: "Details 🥗" }}
      />
    </Stack.Navigator>
  );
}

// 🧠 Stack for Profile + AsyncStorage demonstration
function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "Profile 👤" }}
      />
      <Stack.Screen
        name="AsyncStorageDemo"
        component={AsyncStorageScreen}
        options={{ title: "Save Data (AsyncStorage)" }}
      />
    </Stack.Navigator>
  );
}

// 🧭 Main App Navigation
export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#1E90FF",
        tabBarInactiveTintColor: "#999",
        tabBarStyle: {
          backgroundColor: "#fff",
          height: 60,
          paddingBottom: 5,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") iconName = "home-outline";
          else if (route.name === "Menu") iconName = "restaurant-outline";
          else if (route.name === "Cart") iconName = "cart-outline";
          else if (route.name === "ProfileTab") iconName = "person-outline";
          else if (route.name === "Storage") iconName = "storage-outline";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Menu" component={MenuStack} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen
  name="Storage"
  component={AsyncStorageScreen}
  options={{
    tabBarIcon: ({ color, size }) => (
      <Ionicons name="save-outline" size={size} color={color} />
    ),
  }}
/>
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStack}
        options={{ title: "Profile" }}
      />
    </Tab.Navigator>
  );
}
