import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { COLORS, SIZES } from '../theme';
import { Feather } from '@expo/vector-icons';
import { useCartStore } from '../store/useCartStore';
import { AppButton } from '../components/AppButton';

export default function CartScreen({ navigation }) {
  const { items, removeFromCart, updateQuantity, getTotal, clearCart } = useCartStore();
  const total = getTotal();

  const handleCheckout = () => {
    if (items.length === 0) return Alert.alert('Корзина пуста', 'Добавьте кофе, чтобы продолжить');
    navigation.navigate('Checkout');
  };

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemContent}>
        <View style={styles.itemHeader}>
          <Text style={styles.itemName}>{item.name}</Text>
          <TouchableOpacity onPress={() => removeFromCart(item.id)}>
            <Feather name="x" size={18} color={COLORS.textMuted} />
          </TouchableOpacity>
        </View>
        <Text style={styles.itemDesc}>S · 250 мл · обычное молоко</Text>
        
        <View style={styles.itemBottom}>
          <View style={styles.quantityRow}>
            <TouchableOpacity onPress={() => updateQuantity(item.id, -1)} style={styles.qtyBtn}>
              <Feather name="minus" size={16} color={COLORS.primary} />
            </TouchableOpacity>
            <Text style={styles.qtyText}>{item.quantity}</Text>
            <TouchableOpacity onPress={() => updateQuantity(item.id, 1)} style={styles.qtyBtn}>
              <Feather name="plus" size={16} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
          <Text style={styles.itemPrice}>{item.price * item.quantity} ₽</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Feather name="arrow-left" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Корзина</Text>
        <View style={{ width: 24 }} />
      </View>

      <Text style={styles.title}>Ваша пауза на кофе</Text>

      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text style={{ textAlign: 'center', color: COLORS.textMuted, marginTop: 20 }}>Корзина пуста</Text>}
      />

      <TouchableOpacity style={styles.addMoreBtn} onPress={() => navigation.navigate('Menu')}>
        <Feather name="plus" size={16} color={COLORS.primary} />
        <Text style={styles.addMoreText}>Добавить что-нибудь ещё</Text>
      </TouchableOpacity>

      {items.length > 0 && (
        <View style={styles.footer}>
          <View style={styles.timeNote}>
            <Feather name="clock" size={16} color={COLORS.textMuted} />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.timeTitle}>Будет готово через пару минут</Text>
              <Text style={styles.timeSub}>Начнём готовить после оплаты.</Text>
            </View>
          </View>
          
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Итого</Text>
            <Text style={styles.totalPrice}>{total}₽</Text>
          </View>

          <AppButton title="К оплате" onPress={handleCheckout} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg, paddingHorizontal: SIZES.padding, paddingTop: 60 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 },
  backBtn: { padding: 5, marginLeft: -5 },
  headerTitle: { fontSize: 16, fontWeight: '600', color: COLORS.text },
  title: { fontSize: 28, fontWeight: 'bold', color: COLORS.text, marginBottom: 20 },
  cartItem: { flexDirection: 'row', backgroundColor: COLORS.white, borderRadius: SIZES.radius, padding: 12, marginBottom: 15, borderWidth: 1, borderColor: COLORS.surface },
  itemImage: { width: 70, height: 70, borderRadius: 12, marginRight: 15, backgroundColor: COLORS.surface },
  itemContent: { flex: 1, justifyContent: 'space-between' },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  itemName: { fontSize: 16, fontWeight: '600', color: COLORS.text },
  itemDesc: { fontSize: 12, color: COLORS.textMuted, marginTop: 2 },
  itemBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  quantityRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface, borderRadius: 8, padding: 4 },
  qtyBtn: { padding: 6 },
  qtyText: { fontSize: 14, fontWeight: '600', width: 20, textAlign: 'center', color: COLORS.text },
  itemPrice: { fontSize: 16, fontWeight: 'bold', color: COLORS.text },
  addMoreBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 20 },
  addMoreText: { fontSize: 14, color: COLORS.primary, marginLeft: 8 },
  footer: { marginTop: 'auto', paddingBottom: 30 },
  timeNote: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface, padding: 15, borderRadius: 12, marginBottom: 20 },
  timeTitle: { fontSize: 14, fontWeight: '500', color: COLORS.text },
  timeSub: { fontSize: 12, color: COLORS.textMuted },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  totalLabel: { fontSize: 20, fontWeight: 'bold', color: COLORS.text },
  totalPrice: { fontSize: 24, fontWeight: 'bold', color: COLORS.text },
});