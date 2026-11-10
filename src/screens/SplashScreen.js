import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../theme';
import { Feather } from '@expo/vector-icons';

export default function SplashScreen({ navigation }) {
  return (
    <TouchableOpacity 
      style={styles.container} 
      activeOpacity={1} 
      onPress={() => navigation.replace('Auth')}
    >
      <View style={styles.logoRow}>
        <Feather name="coffee" size={32} color={COLORS.primary} />
        <Text style={styles.logoText}>тихо не спеша</Text>
      </View>
      <Text style={styles.subtitle}>КОФЕ БЕЗ СПЕШКИ</Text>
      <Text style={styles.hint}>Нажмите на экран</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg, justifyContent: 'center', alignItems: 'center' },
  logoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  logoText: { fontSize: 32, fontWeight: '300', color: COLORS.primary, marginLeft: 10 },
  subtitle: { fontSize: 12, letterSpacing: 2, color: COLORS.primary, marginBottom: 40 },
  hint: { fontSize: 14, color: COLORS.textMuted, position: 'absolute', bottom: 50 },
});