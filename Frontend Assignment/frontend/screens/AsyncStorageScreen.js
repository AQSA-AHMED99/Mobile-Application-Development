import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AsyncStorageScreen() {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [fetched, setFetched] = useState(null);
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [showAll, setShowAll] = useState(false); // 👈 toggle visibility

  useEffect(() => {
    fetchAllData();
  }, []);

  useEffect(() => {
    if (!key.trim()) {
      setFilteredData(allData);
    } else {
      const lower = key.toLowerCase();
      const filtered = allData.filter(([k]) =>
        k.toLowerCase().startsWith(lower)
      );
      setFilteredData(filtered);
    }
  }, [key, allData]);

  // ✅ Store Data (with duplicate check)
  const storeData = async () => {
    try {
      if (!key || !value) {
        Alert.alert("Missing Fields", "Please enter both key and value.");
        return;
      }

      const existingValue = await AsyncStorage.getItem(key);

      if (existingValue === value) {
        Alert.alert("⚠️ Duplicate", "Same key and value already exist.");
        return;
      }

      if (existingValue && existingValue !== value) {
        await AsyncStorage.setItem(key, value);
        Alert.alert("🔁 Updated", `Value for "${key}" updated successfully!`);
      } else {
        await AsyncStorage.setItem(key, value);
        Alert.alert("✅ Stored", `Stored "${key}" successfully!`);
      }

      setKey("");
      setValue("");
      fetchAllData();
    } catch (e) {
      Alert.alert("❌ Error", "Failed to store data.");
      console.log("Store error:", e);
    }
  };

  // ✅ Fetch Data
  const fetchData = async () => {
    try {
      if (!key) {
        Alert.alert("Missing Key", "Please enter a key to fetch.");
        return;
      }
      const result = await AsyncStorage.getItem(key);
      setFetched(result !== null ? result : "⚠️ No value found for this key.");
    } catch (e) {
      Alert.alert("❌ Error", "Failed to fetch data.");
      console.log("Fetch error:", e);
    }
  };

  // ✅ Remove Data
  const removeData = async () => {
    try {
      if (!key) {
        Alert.alert("Missing Key", "Please enter a key to remove.");
        return;
      }
      await AsyncStorage.removeItem(key);
      Alert.alert("🗑️ Removed", `Deleted key "${key}" successfully.`);
      setFetched(null);
      fetchAllData();
    } catch (e) {
      Alert.alert("❌ Error", "Failed to remove data.");
      console.log("Remove error:", e);
    }
  };

  // ✅ Fetch All Data
  const fetchAllData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      if (keys.length === 0) {
        setAllData([]);
        return;
      }
      const result = await AsyncStorage.multiGet(keys);
      setAllData(result);
      setFilteredData(result);
    } catch (e) {
      Alert.alert("❌ Error", "Failed to fetch all data.");
      console.log("Fetch all error:", e);
    }
  };

  // ✅ Toggle All Data Display
  const toggleAllData = async () => {
    if (!showAll) {
      await fetchAllData();
    }
    setShowAll((prev) => !prev);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>💾 AsyncStorage Manager</Text>

      {/* Key Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter Key (e.g., userToken)"
        value={key}
        onChangeText={setKey}
      />

      {/* Value Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter Value"
        value={value}
        onChangeText={setValue}
      />

      {/* Buttons */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#4CAF50" }]}
        onPress={storeData}
      >
        <Text style={styles.buttonText}>Store Data</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#2196F3" }]}
        onPress={fetchData}
      >
        <Text style={styles.buttonText}>Fetch Data</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#E53935" }]}
        onPress={removeData}
      >
        <Text style={styles.buttonText}>Remove Data</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: showAll ? "#999" : "#FF8C00" },
        ]}
        onPress={toggleAllData}
      >
        <Text style={styles.buttonText}>
          {showAll ? "Hide All Data" : "View All Stored Data"}
        </Text>
      </TouchableOpacity>

      {/* Fetched value display */}
      {fetched !== null && (
        <View style={styles.resultBox}>
          <Text style={styles.resultText}>Fetched Value: {fetched}</Text>
        </View>
      )}

      {/* Conditional display for All Data */}
      {showAll && (
        <>
          {filteredData.length > 0 ? (
            <View style={styles.allDataBox}>
              <Text style={styles.allDataTitle}>
                📦 Stored Data Matching: "{key || "All"}"
              </Text>
              {filteredData.map(([k, v], index) => (
                <View key={index} style={styles.dataRow}>
                  <Text style={styles.dataKey}>{k}</Text>
                  <Text style={styles.dataValue}>{v}</Text>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.noMatch}>
              ❌ No data found or no match for "{key}"
            </Text>
          )}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F8F9FA",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 25,
    color: "#333",
  },
  input: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  button: {
    width: "90%",
    paddingVertical: 12,
    borderRadius: 8,
    marginVertical: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  resultBox: {
    marginTop: 20,
    backgroundColor: "#E3F2FD",
    padding: 10,
    borderRadius: 8,
    width: "90%",
  },
  resultText: {
    fontSize: 16,
    color: "#333",
  },
  allDataBox: {
    marginTop: 25,
    width: "90%",
    backgroundColor: "#FFF8E1",
    padding: 10,
    borderRadius: 10,
  },
  allDataTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dataRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 6,
  },
  dataKey: {
    fontWeight: "bold",
    color: "#333",
  },
  dataValue: {
    color: "#555",
  },
  noMatch: {
    marginTop: 15,
    fontSize: 16,
    color: "#888",
  },
});
