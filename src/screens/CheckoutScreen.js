import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import { COLORS, SIZES } from '../theme';
import { Feather } from '@expo/vector-icons';
import { useCartStore } from '../store/useCartStore';
import { AppButton } from '../components/AppButton';

export default function CheckoutScreen({ navigation }) {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const { getTotal, clearCart } = useCartStore();
  const total = getTotal();

  const handleConfirm = () => {
    clearCart();
    navigation.replace('Success');
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Feather name="arrow-left" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Оформление</Text>
          <View style={{ width: 24 }} />
        </View>

        <Text style={styles.title}>Почти готово</Text>
        
        <View style={styles.orderSummary}>
          <Text style={styles.summaryText}>Ваш заказ</Text>
          <Text style={styles.summaryPrice}>{total} ₽</Text>
        </View>

        <Text style={styles.sectionTitle}>Способ оплаты</Text>
        
        {/* Карта */}
        <TouchableOpacity 
          style={[styles.paymentMethod, paymentMethod === 'card' && styles.paymentActive]} 
          onPress={() => setPaymentMethod('card')}
        >
          <View style={styles.paymentLeft}>
            <Feather name="credit-card" size={24} color={COLORS.text} />
            <View style={{ marginLeft: 15 }}>
              <Text style={styles.paymentTitle}>Банковская карта</Text>
              <Text style={styles.paymentDesc}>Мир ·· 4821</Text>
            </View>
          </View>
          <View style={[styles.radio, paymentMethod === 'card' && styles.radioActive]}>
            {paymentMethod === 'card' && <View style={styles.radioInner} />}
          </View>
        </TouchableOpacity>

        {/* СБП */}
        <TouchableOpacity 
          style={[styles.paymentMethod, paymentMethod === 'sbp' && styles.paymentActive]} 
          onPress={() => setPaymentMethod('sbp')}
        >
          <View style={styles.paymentLeft}>
            <Feather name="grid" size={24} color={COLORS.text} />
            <View style={{ marginLeft: 15 }}>
              <Text style={styles.paymentTitle}>СБП</Text>
              <Text style={styles.paymentDesc}>Через приложение вашего банка</Text>
            </View>
          </View>
          <View style={[styles.radio, paymentMethod === 'sbp' && styles.radioActive]}>
            {paymentMethod === 'sbp' && <View style={styles.radioInner} />}
          </View>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Комментарий <Text style={{ color: COLORS.textMuted, fontSize: 12 }}>Необязательно</Text></Text>
        <View style={styles.commentInput}>
          <TextInput placeholder="Например, не очень горячий" placeholderTextColor={COLORS.textMuted} style={{ fontSize: 16 }} />
        </View>

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>К оплате</Text>
          <Text style={styles.totalPrice}>{total} ₽</Text>
        </View>

        <AppButton title="Подтвердить заказ" onPress={handleConfirm} />
        
        <Text style={styles.footerText}>Безопасная оплата · самовывоз бесплатно</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: COLORS.bg, paddingHorizontal: SIZES.padding, paddingTop: 60, paddingBottom: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 },
  backBtn: { padding: 5, marginLeft: -5 },
  headerTitle: { fontSize: 16, fontWeight: '600', color: COLORS.text },
  title: { fontSize: 28, fontWeight: 'bold', color: COLORS.text, marginBottom: 20 },
  orderSummary: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
  summaryText: { fontSize: 14, color: COLORS.textMuted },
  summaryPrice: { fontSize: 16, fontWeight: '600', color: COLORS.text },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: COLORS.text, marginBottom: 15 },
  paymentMethod: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: COLORS.border, borderRadius: SIZES.radius, padding: 15, marginBottom: 10 },
  paymentActive: { borderColor: COLORS.primary },
  paymentLeft: { flexDirection: 'row', alignItems: 'center' },
  paymentTitle: { fontSize: 16, fontWeight: '500', color: COLORS.text },
  paymentDesc: { fontSize: 12, color: COLORS.textMuted, marginTop: 2 },
  radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: COLORS.border, justifyContent: 'center', alignItems: 'center' },
  radioActive: { borderColor: COLORS.primary },
  radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: COLORS.primary },
  commentInput: { borderWidth: 1, borderColor: COLORS.border, borderRadius: SIZES.radius, paddingHorizontal: 15, height: 50, justifyContent: 'center', marginBottom: 30 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  totalLabel: { fontSize: 18, fontWeight: 'bold', color: COLORS.text },
  totalPrice: { fontSize: 22, fontWeight: 'bold', color: COLORS.text },
  footerText: { textAlign: 'center', fontSize: 12, color: COLORS.textMuted, marginTop: 15 },
});