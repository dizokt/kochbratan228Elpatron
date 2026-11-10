import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
// Обратите внимание на путь: '../theme' означает "выйти из папки screens и зайти в theme.js"
import { COLORS, SIZES } from '../theme'; 
import { AppButton } from '../components/AppButton';

export default function SuccessScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Feather name="coffee" size={60} color={COLORS.primary} style={{ marginBottom: 20 }} />
        <Text style={styles.title}>Заказ оплачен,{'\n'}ждем вас</Text>
      </View>
      <AppButton 
        title="На главную" 
        onPress={() => navigation.navigate('Menu')} 
        style={{ position: 'absolute', bottom: 50, width: '90%' }} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg, justifyContent: 'center', alignItems: 'center' },
  content: { alignItems: 'center' },
  title: { fontSize: 20, fontWeight: '500', color: COLORS.textMuted, textAlign: 'center', lineHeight: 30, letterSpacing: 1 },
});