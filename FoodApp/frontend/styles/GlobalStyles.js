// frontend/styles/GlobalStyles.js

import { StyleSheet } from 'react-native';

// Colors - Simplified version
export const Colors = {
  primary: '#ff6600',
  primaryDark: '#e55a00',
  secondary: '#1E90FF',
  secondaryDark: '#0078e0',
  success: '#28a745',
  danger: '#FF6347',
  warning: '#ffc107',
  info: '#17a2b8',
  light: '#f8f9fa',
  dark: '#343a40',
  white: '#ffffff',
  black: '#000000',
  gray: '#6c757d',
  grayLight: '#f9f9f9',
  grayDark: '#495057',
  background: '#ffffff',
  text: '#333333',
  textLight: '#555555',
  textMuted: '#6c757d',
  overlay: 'rgba(0,0,0,0.6)',
};

// Font Sizes - Simplified
export const Sizes = {
  xs: 10,
  sm: 12,
  base: 14,
  lg: 16,
  xl: 18,
  xxl: 20,
  xxxl: 24,
  heading: 26,
  large: 32,
  xlarge: 38,
};

// Spacing - Simplified
export const Spacing = {
  xs: 4,
  sm: 8,
  base: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
};

// Border Radius - Simplified
export const BorderRadius = {
  sm: 8,
  base: 10,
  md: 12,
  lg: 15,
  xl: 20,
  xxl: 25,
  round: 30,
  circle: 50,
};

// Shadows - Simplified
export const Shadows = {
  light: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
  },
};

// Main Global Styles - Only essential styles
const GlobalStyles = StyleSheet.create({
  // Container Styles
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  containerPadding: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.base,
  },
  containerCenter: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.base,
  },

  // Text Styles
  text: {
    fontSize: Sizes.base,
    color: Colors.text,
  },
  textBold: {
    fontSize: Sizes.base,
    color: Colors.text,
    fontWeight: '600',
  },
  textSmall: {
    fontSize: Sizes.sm,
    color: Colors.textLight,
  },
  textLarge: {
    fontSize: Sizes.lg,
    color: Colors.text,
    fontWeight: '600',
  },
  textXLarge: {
    fontSize: Sizes.xl,
    color: Colors.text,
    fontWeight: '600',
  },
  heading: {
    fontSize: Sizes.heading,
    color: Colors.text,
    fontWeight: '700',
    marginBottom: Spacing.base,
  },
  subheading: {
    fontSize: Sizes.xl,
    color: Colors.textLight,
    marginBottom: Spacing.sm,
  },

  // Button Styles
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.base,
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.base,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Spacing.sm,
  },
  buttonSecondary: {
    backgroundColor: Colors.secondary,
    paddingVertical: Spacing.base,
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.base,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Spacing.sm,
  },
  buttonText: {
    color: Colors.white,
    fontSize: Sizes.lg,
    fontWeight: '600',
  },

  // Card Styles
  card: {
    backgroundColor: Colors.white,
    padding: Spacing.base,
    borderRadius: BorderRadius.base,
    marginVertical: Spacing.sm,
    ...Shadows.light,
  },

  // Loading State
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },

  // Layout Helpers
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GlobalStyles;