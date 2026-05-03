import React from 'react';
import {
  View, Text, FlatList, Image,
  TouchableOpacity, StyleSheet,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeFavorite, clearFavorites } from '../redux/favoritesSlice';
import CustomButton from '../components/CustomButton';
import { COLORS, FONT_SIZE, SPACING } from '../constants/colors';
import { useTheme } from '../context/ThemeContext';

export default function FavoritesScreen() {
  // Завдання 3: отримуємо список збережених з Redux store
  const favorites = useSelector(state => state.favorites);
  const dispatch  = useDispatch();

  // Завдання 2: кольори залежно від поточної теми
  const { colors } = useTheme();

  return (
    <View style={[styles.root, { backgroundColor: colors.bg }]}>
      {favorites.length > 0 && (
        // в) Оновлення: очищення всього списку через clearFavorites
        <CustomButton
          title="Clear all"
          variant="outline"
          onPress={() => dispatch(clearFavorites())}
          style={styles.clearBtn}
        />
      )}

      <FlatList
        data={favorites}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={[styles.item, { borderBottomColor: colors.border }]}>
            <Image source={{ uri: item.imageUrl }} style={styles.thumb} resizeMode="cover" />
            <View style={styles.info}>
              <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={[styles.sub, { color: colors.subText }]} numberOfLines={1}>
                {item.date ?? item.location ?? ''}
              </Text>
            </View>
            {/* б) Видалення елемента — id передається через проп dispatch */}
            <TouchableOpacity
              onPress={() => dispatch(removeFavorite(item.id))}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Text style={styles.remove}>✕</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyWrap}>
            <Text style={[styles.emptyText, { color: colors.subText }]}>
              No saved dogs yet.{'\n'}Tap ♥ on any dog to save it.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  clearBtn: { margin: SPACING.lg },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
  },
  thumb: {
    width: 56, height: 56,
    borderRadius: 10,
    backgroundColor: COLORS.grayLight,
    marginRight: SPACING.md,
  },
  info: { flex: 1 },
  title: { fontSize: FONT_SIZE.md, fontWeight: '600', marginBottom: 2 },
  sub:   { fontSize: FONT_SIZE.sm },
  remove: { fontSize: FONT_SIZE.lg, color: COLORS.danger, paddingLeft: SPACING.sm },
  emptyWrap: { flex: 1, alignItems: 'center', marginTop: 80 },
  emptyText: { fontSize: FONT_SIZE.md, textAlign: 'center', lineHeight: 24 },
});
