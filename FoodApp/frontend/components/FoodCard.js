import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import GlobalStyles, { Colors } from '../styles/GlobalStyles';

const FoodCard = ({ food }) => {
  return (
    <View style={GlobalStyles.card}>
      <Text style={[GlobalStyles.textLarge, { fontWeight: '600' }]}>{food.name}</Text>
      <Text style={[GlobalStyles.text, { color: Colors.textLight, marginVertical: 4 }]}>{food.price}</Text>
      <TouchableOpacity style={[GlobalStyles.button, { paddingVertical: 8 }]}>
        <Text style={GlobalStyles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FoodCard;