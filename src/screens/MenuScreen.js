import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { COLORS, SIZES } from '../theme';
import { Feather } from '@expo/vector-icons';
import { useCartStore } from '../store/useCartStore'; // Проверьте правильность пути!

const COFFEE_DATA = [
  { id: '1', name: 'Латте', desc: 'Мягкий · 300 мл', price: 290, image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?q=80&w=500&auto=format&fit=crop' },
  { id: '2', name: 'Капучино', desc: 'Бархатный · 250 мл', price: 260, image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=500&auto=format&fit=crop' },
  { id: '3', name: 'Американо', desc: 'Насыщенный · 250 мл', price: 210, image: 'https://images.unsplash.com/photo-1551030173-122aabc4489c?q=80&w=500&auto=format&fit=crop' },
  { id: '4', name: 'Матча-латте', desc: 'Нежный · 300 мл', price: 320, image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?q=80&w=500&auto=format&fit=crop' },
];

export default function MenuScreen({ navigation }) {
  // Достаем функцию добавления и список товаров из Zustand
  const addToCart = useCartStore((state) => state.addToCart);
  const cartItems = useCartStore((state) => state.items); 
  
  // Считаем общее количество товаров для бейджа
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAdd = (item) => {
    addToCart(item);
    Alert.alert("Добавлено", `${item.name} теперь в корзине!`);
  };

  const renderItem = ({ item }) => (
    // Оборачиваем всю карточку в TouchableOpacity, чтобы нажималась целиком
    <TouchableOpacity 
      style={styles.card} 
      activeOpacity={0.8}
      onPress={() => handleAdd(item)} 
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardDesc}>{item.desc}</Text>
        <View style={styles.cardBottom}>
          <Text style={styles.price}>{item.price} ₽</Text>
          <View style={styles.addButton}>
            <Feather name="plus" size={20} color={COLORS.primary} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Шапка с иконками */}
      <View style={styles.header}>
        <View style={styles.logoRow}>
          <Feather name="coffee" size={24} color={COLORS.primary} />
          <Text style={styles.logoText}>тихо не спеша</Text>
        </View>
        
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {/* Кнопка КОРЗИНЫ с переходом и счетчиком */}
          <TouchableOpacity 
            onPress={() => navigation.navigate('Cart')} 
            style={styles.cartButton}
          >
            <Feather name="shopping-bag" size={24} color={COLORS.text} />
            {/* Если в корзине есть товары, показываем красный кружок с цифрой */}
            {cartCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{cartCount}</Text>
              </View>
            )}
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => Alert.alert('Поиск', 'Тут будет поиск')}>
            <Feather name="search" size={24} color={COLORS.text} />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.title}>Меню</Text>
      <Text style={styles.subtitle}>Знакомый вкус. Каждый день по-новому.</Text>

      <FlatList
        data={COFFEE_DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg, paddingHorizontal: SIZES.padding, paddingTop: 60 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 },
  logoRow: { flexDirection: 'row', alignItems: 'center' },
  logoText: { fontSize: 20, fontWeight: '300', color: COLORS.primary, marginLeft: 8 },
  title: { fontSize: 28, fontWeight: 'bold', color: COLORS.text, marginBottom: 5 },
  subtitle: { fontSize: 14, color: COLORS.textMuted, marginBottom: 20 },
  row: { justifyContent: 'space-between', marginBottom: 15 },
  
  card: { width: '48%', backgroundColor: COLORS.white, borderRadius: SIZES.radius, overflow: 'hidden' },
  image: { width: '100%', height: 140, backgroundColor: COLORS.surface },
  cardContent: { padding: 12 },
  cardTitle: { fontSize: 16, fontWeight: '600', color: COLORS.text, marginBottom: 4 },
  cardDesc: { fontSize: 12, color: COLORS.textMuted, marginBottom: 10 },
  cardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  price: { fontSize: 16, fontWeight: 'bold', color: COLORS.text },
  addButton: { width: 32, height: 32, borderRadius: 16, backgroundColor: COLORS.surface, justifyContent: 'center', alignItems: 'center' },
  
  // Стили для корзины
  cartButton: { marginRight: 15, padding: 4 },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#D9534F', // Красный цвет
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: { color: 'white', fontSize: 10, fontWeight: 'bold' }
});