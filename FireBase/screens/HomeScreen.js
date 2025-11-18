// screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import { ref, set, onValue, off } from 'firebase/database';

const HomeScreen = ({ navigation }) => {
  const [note, setNote] = useState('');
  const [savedNote, setSavedNote] = useState('');
  const [loading, setLoading] = useState(false);
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const userNoteRef = ref(db, `users/${user.uid}/note`);
      
      const unsubscribe = onValue(userNoteRef, (snapshot) => {
        if (snapshot.exists()) {
          setSavedNote(snapshot.val());
        } else {
          setSavedNote('');
        }
      });

      return () => off(userNoteRef);
    }
  }, [user]);

  const handleSaveNote = async () => {
    if (!note.trim()) {
      Alert.alert('Error', 'Please enter a note');
      return;
    }

    setLoading(true);
    try {
      const userNoteRef = ref(db, `users/${user.uid}`);
      await set(userNoteRef, {
        note: note,
        email: user.email,
        lastUpdated: new Date().toISOString(),
      });

      setNote('');
      Alert.alert('Success', 'Note saved successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to save note: ' + error.message);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace("Login");   // 🔥 Fix added here
    } catch (error) {
      Alert.alert('Logout Error', error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcome}>Welcome!</Text>
        <Text style={styles.email}>Logged in as: {user?.email}</Text>
      </View>

      <View style={styles.noteSection}>
        <Text style={styles.sectionTitle}>Save Your Note</Text>
        
        <TextInput
          style={styles.textInput}
          placeholder="Enter your note here..."
          value={note}
          onChangeText={setNote}
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity 
          style={styles.saveButton} 
          onPress={handleSaveNote}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Save to Firebase</Text>
          )}
        </TouchableOpacity>
      </View>

      {savedNote ? (
        <View style={styles.savedNoteSection}>
          <Text style={styles.sectionTitle}>Saved Note:</Text>
          <View style={styles.noteContainer}>
            <Text style={styles.savedNoteText}>{savedNote}</Text>
          </View>
        </View>
      ) : (
        <View style={styles.savedNoteSection}>
          <Text style={styles.noNoteText}>No saved note yet</Text>
        </View>
      )}

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  header: { alignItems: 'center', marginBottom: 30 },
  welcome: { fontSize: 22, fontWeight: 'bold', marginBottom: 5 },
  email: { fontSize: 16, color: '#666' },
  noteSection: { marginBottom: 30 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  textInput: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  savedNoteSection: { marginBottom: 30 },
  noteContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  savedNoteText: { fontSize: 16, lineHeight: 22 },
  noNoteText: {
    textAlign: 'center', color: '#666', fontStyle: 'italic'
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});

export default HomeScreen;
