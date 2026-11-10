import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS, SIZES } from '../theme';
import { AppInput } from '../components/AppInput';
import { AppButton } from '../components/AppButton';
import { Feather } from '@expo/vector-icons';

export default function AuthScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Здесь должна быть логика авторизации. Пока просто переходим на главную.
    navigation.replace('Menu');
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.logoRow}>
          <Feather name="coffee" size={24} color={COLORS.primary} />
          <Text style={styles.logoText}>тихо не спеша</Text>
        </View>

        <Text style={styles.title}>Рады вас видеть</Text>
        <Text style={styles.subtitle}>Войдите, чтобы ваш любимый кофе ждал вас к нужному времени.</Text>

        <AppInput 
          label="Электронная почта" 
          value={email} 
          onChangeText={setEmail} 
          placeholder="anna@mail.ru"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <AppInput 
          label="Пароль" 
          value={password} 
          onChangeText={setPassword} 
          secureTextEntry 
          placeholder="••••••••"
        />

        <TouchableOpacity style={{ alignSelf: 'flex-end', marginBottom: 20 }}>
          <Text style={styles.forgotPass}>Забыли пароль?</Text>
        </TouchableOpacity>

        <View style={styles.securityNote}>
          <Feather name="shield" size={16} color={COLORS.textMuted} />
          <Text style={styles.securityText}>Только вы и ваш кофе.{'\n'}Никаких лишних писем.</Text>
        </View>

        <AppButton title="Войти" onPress={handleLogin} style={{ marginTop: 'auto' }} />
        
        <TouchableOpacity style={styles.registerLink}>
          <Text style={styles.registerText}>Впервые у нас? <Text style={{ fontWeight: 'bold', color: COLORS.primary }}>Создать аккаунт</Text></Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: SIZES.padding, backgroundColor: COLORS.bg, paddingTop: 60 },
  logoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 40 },
  logoText: { fontSize: 24, fontWeight: '300', color: COLORS.primary, marginLeft: 8 },
  title: { fontSize: 28, fontWeight: 'bold', color: COLORS.text, marginBottom: 8 },
  subtitle: { fontSize: 14, color: COLORS.textMuted, marginBottom: 30, lineHeight: 20 },
  forgotPass: { color: COLORS.primary, fontSize: 14 },
  securityNote: { flexDirection: 'row', alignItems: 'center', marginBottom: 30 },
  securityText: { marginLeft: 10, fontSize: 12, color: COLORS.textMuted, lineHeight: 18 },
  registerLink: { marginTop: 20, alignItems: 'center', marginBottom: 20 },
  registerText: { fontSize: 14, color: COLORS.textMuted },
});