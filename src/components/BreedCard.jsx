import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONT_SIZE, SPACING } from '../constants/colors';

// Кольори для значків — визначаються за першою літерою породи
const BADGE_COLORS = [
  '#3D8BFF', '#10B981', '#F59E0B', '#EF4444',
  '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16',
];

function BreedCard({ breedFolder, onPress }) {
  const name  = breedFolder.replace(/-/g, ' ');
  const color = BADGE_COLORS[name.charCodeAt(0) % BADGE_COLORS.length];

  return (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.badge, { backgroundColor: color }]}>
        <Text style={styles.initial}>{name[0].toUpperCase()}</Text>
      </View>
      <Text style={styles.name} numberOfLines={1}>{name}</Text>
      <Text style={styles.chevron}>›</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: SPACING.lg, paddingVertical: SPACING.md,
    borderBottomWidth: 1, borderBottomColor: COLORS.grayBorder,
    backgroundColor: COLORS.white,
  },
  badge: {
    width: 40, height: 40, borderRadius: 20,
    alignItems: 'center', justifyContent: 'center',
    marginRight: SPACING.md,
  },
  initial: { color: COLORS.white, fontSize: FONT_SIZE.md, fontWeight: '700' },
  name: { flex: 1, fontSize: FONT_SIZE.md, color: COLORS.black, textTransform: 'capitalize' },
  chevron: { fontSize: FONT_SIZE.xl, color: COLORS.textSecondary },
});

export default React.memo(BreedCard);
