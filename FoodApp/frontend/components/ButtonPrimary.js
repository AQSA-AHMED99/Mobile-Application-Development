import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import GlobalStyles, { Colors } from '../styles/GlobalStyles';

const ButtonPrimary = ({ title, onPress, style, textStyle }) => {
  return (
    <TouchableOpacity 
      style={[GlobalStyles.button, style]} 
      onPress={onPress}
    >
      <Text style={[GlobalStyles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonPrimary;