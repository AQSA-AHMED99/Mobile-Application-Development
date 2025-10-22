import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./screens/HomeScreen";
import WinterScreen from "./screens/WinterScreen";
import SummerScreen from "./screens/SummerScreen";
import SaleScreen from "./screens/SaleScreen";
import PerfumeScreen from "./screens/PerfumeScreen";
import PretScreen from "./screens/PretScreen";
import UnstitchedScreen from "./screens/UnstitchedScreen";
import MenPerfumeScreen from "./screens/MenPerfumeScreen";
import WomenPerfumeScreen from "./screens/WomenPerfumeScreen";
import CartScreen from "./screens/CartScreen";
import ProfileScreen from "./screens/ProfileScreen";
import CategoriesScreen from "./screens/CategoriesScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Winter" component={WinterScreen} />
        <Stack.Screen name="Summer" component={SummerScreen} />
        <Stack.Screen name="Sale" component={SaleScreen} />
        <Stack.Screen name="Perfumes" component={PerfumeScreen} />
        <Stack.Screen name="Pret" component={PretScreen} />
        <Stack.Screen name="Unstitched" component={UnstitchedScreen} />
        <Stack.Screen name="Men Perfume" component={MenPerfumeScreen} />
        <Stack.Screen name="Women Perfume" component={WomenPerfumeScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Categories" component={CategoriesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
