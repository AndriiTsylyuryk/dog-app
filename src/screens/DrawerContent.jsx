import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useSelector } from 'react-redux';
import { COLORS, FONT_SIZE, SPACING } from '../constants/colors';
import { useAuth } from '../context/AuthContext';
import { SCREENS } from '../constants/screens';

const DRAWER_ITEMS = [
  { label: '🏠  Home',      screen: SCREENS.MAIN_TABS  },
  { label: '♥  Saved Dogs', screen: SCREENS.FAVORITES  },
  { label: '❓  Help',      screen: null               },
  { label: '📞  Contacts',  screen: null               },
];

export default function DrawerContent({ navigation }) {
  const { logout } = useAuth();
  // Показуємо кількість збережених елементів поруч із пунктом меню
  const favCount = useSelector(state => state.favorites.length);

  const navigate = screen => {
    navigation.closeDrawer();
    if (screen) navigation.navigate(screen);
  };

  return (
    <DrawerContentScrollView contentContainerStyle={styles.container}>
      <Text style={styles.brand}>DogApp 🐾</Text>

      {DRAWER_ITEMS.map(item => (
        <TouchableOpacity key={item.label} style={styles.item} onPress={() => navigate(item.screen)}>
          <Text style={styles.itemText}>{item.label}</Text>
          {/* Бейдж із кількістю збережених — відображається тільки для пункту Favorites */}
          {item.screen === SCREENS.FAVORITES && favCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{favCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      ))}

      <View style={styles.divider} />

      <TouchableOpacity style={styles.item} onPress={logout}>
        <Text style={[styles.itemText, styles.logoutText]}>🚪  Log Out</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: SPACING.xl },
  brand: { fontSize: FONT_SIZE.xl, fontWeight: '700', color: COLORS.primary, paddingHorizontal: SPACING.lg, marginBottom: SPACING.xl },
  item: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: SPACING.lg, paddingVertical: SPACING.md },
  itemText: { flex: 1, fontSize: FONT_SIZE.md, color: COLORS.black },
  badge: {
    backgroundColor: COLORS.primary, borderRadius: 10,
    minWidth: 20, height: 20,
    paddingHorizontal: SPACING.xs,
    alignItems: 'center', justifyContent: 'center',
  },
  badgeText: { color: COLORS.white, fontSize: FONT_SIZE.xs, fontWeight: '700' },
  divider: { height: 1, backgroundColor: COLORS.grayBorder, marginVertical: SPACING.md, marginHorizontal: SPACING.lg },
  logoutText: { color: COLORS.danger },
});
