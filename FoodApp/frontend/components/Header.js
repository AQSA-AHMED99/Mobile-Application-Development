import React from 'react';
import { View, Text } from 'react-native';
import GlobalStyles, { Colors } from '../styles/GlobalStyles';

const Header = ({ title }) => {
  return (
    <View style={{
      padding: 20,
      backgroundColor: Colors.primary,
      alignItems: 'center',
    }}>
      <Text style={[GlobalStyles.heading, { color: Colors.white, marginBottom: 0 }]}>{title}</Text>
    </View>
  );
};

export default Header;