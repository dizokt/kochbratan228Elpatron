import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS, SIZES } from '../theme';

export const AppButton = ({ title, onPress, variant = 'primary', loading, style }) => {
  const isPrimary = variant === 'primary';
  
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading}
      activeOpacity={0.8}
      style={[
        styles.button,
        isPrimary ? styles.primary : styles.secondary,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary ? COLORS.white : COLORS.primary} />
      ) : (
        <Text style={[styles.text, isPrimary ? styles.textPrimary : styles.textSecondary]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: SIZES.radius,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  primary: { backgroundColor: COLORS.primary },
  secondary: { backgroundColor: 'transparent' },
  text: { fontSize: 16, fontWeight: '600' },
  textPrimary: { color: COLORS.white },
  textSecondary: { color: COLORS.primary },
});