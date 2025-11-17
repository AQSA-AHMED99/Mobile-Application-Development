import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StatusBar,
  RefreshControl,
  Animated,
} from 'react-native';
import { GlobalStyles, COLORS } from '../styles/GlobalStyles';

const MovieScreen = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Use useRef so it doesn't reset on each render
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fetchMovies = async () => {
    try {
      if (!refreshing) setLoading(true);
      const response = await fetch('https://reactnative.dev/movies.json');
      const json = await response.json();
      setMovies(json.movies); // Check console.log(json.movies)
      console.log('Fetched movies:', json.movies); // Debug
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start();
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  if (loading) {
    return (
      <View style={[GlobalStyles.container, { alignItems: 'center', justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={{ marginTop: 12, color: COLORS.primary, fontSize: 16, fontWeight: '500' }}>
          Fetching movies for you...
        </Text>
      </View>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <View style={[GlobalStyles.container, { alignItems: 'center', justifyContent: 'center' }]}>
        <Text style={{ fontSize: 18, color: COLORS.textDark }}>No movies found.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />

      <View style={GlobalStyles.header}>
        <Text style={GlobalStyles.headerTitle}>🎬 Movie Explorer</Text>
        <Text style={GlobalStyles.headerSubtitle}>Find your favorite classics</Text>
      </View>

      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 32 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchMovies(); }} />}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [
                {
                  translateY: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0],
                  }),
                },
              ],
              marginBottom: 14,
            }}
          >
            <View style={GlobalStyles.movieCard}>
              <Text style={GlobalStyles.movieTitle}>{item.title}</Text>
              <Text style={GlobalStyles.movieYear}>Release Year: {item.releaseYear}</Text>
            </View>
          </Animated.View>
        )}
      />
    </SafeAreaView>
  );
};

export default MovieScreen;
